from graphql.error import GraphQLError
import graphene
import boto3
from botocore.exceptions import ClientError
from django.conf import settings


class DeleteKanbanTicket(graphene.Mutation):
    class Arguments:
       id = graphene.String(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        dynamodb_endpoint = settings.DYNAMODB_ENDPOINT_URL
        dynamodb = boto3.resource('dynamodb', endpoint_url=dynamodb_endpoint)
        table = dynamodb.Table('KanbanTicket')

        try:
            existing_item = table.get_item(Key={'id': str(id)}).get('Item')
            if existing_item:
                table.delete_item(Key={'id': str(id)})
                success = True
            else:
                raise GraphQLError(f"Item with id {id} does not exist.")
        except ClientError as e:
            raise GraphQLError(str(e))

        return DeleteKanbanTicket(success=success)
