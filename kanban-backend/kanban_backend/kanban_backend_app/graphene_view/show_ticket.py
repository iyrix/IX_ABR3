import graphene
import boto3
from boto3.dynamodb.conditions import Attr
from django.conf import settings
from ..models import KanbanTicketType


class Query(graphene.ObjectType):
    all_tickets = graphene.List(KanbanTicketType)
    ticket = graphene.Field(KanbanTicketType, id=graphene.Int(required=True))
    tickets_by_status = graphene.List(KanbanTicketType, status=graphene.String(required=True))
    dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL

    def resolve_all_tickets(self, info):
        dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL
        dynamodb = boto3.resource('dynamodb', endpoint_url= dynamodb_endpoint )
        table = dynamodb.Table('KanbanTicket')
        response = table.scan()
        return response.get('Items', [])

    def resolve_ticket(self, info, id):
        dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL
        dynamodb = boto3.resource('dynamodb', endpoint_url=dynamodb_endpoint)
        table = dynamodb.Table('KanbanTicket')
        response = table.get_item(Key={'id': id})
        return response.get('Item')


    def resolve_tickets_by_status(self, info, status):
        valid_status_values = ["in progress", "backlog", "pending", "done"]

        if status.lower() not in valid_status_values:
            raise ValueError(f"Invalid status. Allowed values are: {', '.join(valid_status_values)}")

        dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL
        dynamodb = boto3.resource('dynamodb', endpoint_url=dynamodb_endpoint)
        table = dynamodb.Table('KanbanTicket')
        response = table.scan(FilterExpression=Attr('status').eq(status.lower()))
        return response.get('Items', [])
