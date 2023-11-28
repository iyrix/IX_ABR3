from django.urls import path
from graphene_django.views import GraphQLView
from .schema import schema  # Assuming your GraphQL schema is in a file named schema.py

urlpatterns = [
    # path('', ),
    path('', GraphQLView.as_view(graphiql=True, schema=schema), name='graphql'),
]
