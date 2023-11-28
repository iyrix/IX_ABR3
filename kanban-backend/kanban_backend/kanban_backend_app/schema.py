import graphene
from .graphene_view.create_ticket import CreateKanbanTicket
from .graphene_view.delete_ticket import DeleteKanbanTicket
from .graphene_view.update_ticket import UpdateKanbanTicket
from .graphene_view.show_ticket import Query


class Mutation(graphene.ObjectType):
    createTicket = CreateKanbanTicket.Field()
    updateTicket = UpdateKanbanTicket.Field()
    deleteTicket = DeleteKanbanTicket.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
