import graphene
import boto3
from botocore.exceptions import ClientError
from ..models import KanbanTicketType
from django.conf import settings

class UpdateKanbanTicket(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()
        assigned_to = graphene.String()
        date = graphene.Date()

    kanban_ticket = graphene.Field(KanbanTicketType)
    error = graphene.String()

    def mutate(self, info, id, title=None, description=None, status=None, assigned_to=None, date=None):
        dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL
        dynamodb = boto3.resource('dynamodb', endpoint_url=dynamodb_endpoint)
        table = dynamodb.Table('KanbanTicket')

        try:
            existing_item = table.get_item(Key={'id': id}).get('Item')
        except ClientError as e:
            return UpdateKanbanTicket(kanban_ticket=None, error=str(e))

        if not existing_item:
            return UpdateKanbanTicket(kanban_ticket=None, error=f"Item with id {id} does not exist.")

        update_expression = 'SET '
        expression_attribute_values = {}
        expression_attribute_names = {}

        if title:
            update_expression += '#title = :title, '
            expression_attribute_values[':title'] = title
            expression_attribute_names['#title'] = 'title'
        if description:
            update_expression += '#description = :description, '
            expression_attribute_values[':description'] = description
            expression_attribute_names['#description'] = 'description'
        if status:
            update_expression += '#status = :status, '
            expression_attribute_values[':status'] = status
            expression_attribute_names['#status'] = 'status'
        if assigned_to:
            update_expression += '#assigned_to = :assigned_to, '
            expression_attribute_values[':assigned_to'] = assigned_to
            expression_attribute_names['#assigned_to'] = 'assigned_to'
        if date:
            update_expression += '#date = :date, '
            expression_attribute_values[':date'] = date.isoformat()
            expression_attribute_names['#date'] = 'date'

        if update_expression == 'SET ':
            return UpdateKanbanTicket(kanban_ticket=existing_item)

        try:
            response = table.update_item(
                Key={'id': id},
                UpdateExpression=update_expression.rstrip(', '),
                ExpressionAttributeValues=expression_attribute_values,
                ExpressionAttributeNames=expression_attribute_names,
                ReturnValues='ALL_NEW'
            )
        except ClientError as e:
            return UpdateKanbanTicket(kanban_ticket=None, error=str(e))

        return UpdateKanbanTicket(kanban_ticket=response.get('Attributes'))

    def __init__(self, kanban_ticket=None, error=None):
        self.kanban_ticket = kanban_ticket
        self.error = error
