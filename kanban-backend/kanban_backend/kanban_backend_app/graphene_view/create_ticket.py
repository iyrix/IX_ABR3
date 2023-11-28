import graphene
import boto3
import uuid
from botocore.exceptions import ClientError
from ..models import KanbanTicketType
from django.conf import settings

class CreateKanbanTicket(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        status = graphene.String(required=True)
        assigned_to = graphene.String(required=True)
        date = graphene.Date(required=True)

    kanban_ticket = graphene.Field(KanbanTicketType)
    error = graphene.String()

    def mutate(self, info, title, description, status, assigned_to=None, date=None):
        dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL
        dynamodb = boto3.resource('dynamodb', endpoint_url=dynamodb_endpoint)
        table_name = 'KanbanTicket'


        try:
            existing_tables = dynamodb.meta.client.list_tables()['TableNames']

            if table_name not in existing_tables:
                table = dynamodb.create_table(
                    TableName=table_name,
                   KeySchema=[
                        {
                            'AttributeName': 'id',
                            'KeyType': 'HASH'
                        },
                    ],
                    AttributeDefinitions=[
                        {
                            'AttributeName': 'id',
                            'AttributeType': 'S'
                        },
                    ],
                    ProvisionedThroughput={
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                )
                table.wait_until_exists()


        except ClientError as e:
            return CreateKanbanTicket(kanban_ticket=None, error=f"Table creation error: {str(e)}")


        try:
            ticket_id = str(uuid.uuid4())
            date_str = date.isoformat() if date else None




            table = dynamodb.Table(table_name)
            response = table.put_item(Item={
                'id': ticket_id,
                'title': title,
                'description': description,
                'status': status,
                'assigned_to': assigned_to,
                'date': date_str,
            })

            response = table.get_item(Key={'id': ticket_id})

            return CreateKanbanTicket(kanban_ticket=response.get('Item'))


        except ClientError as e:
            return CreateKanbanTicket(kanban_ticket=None, error=f"Item creation error: {str(e)}")

    def __init__(self, kanban_ticket=None, error=None):
        self.kanban_ticket = kanban_ticket
        self.error = error
