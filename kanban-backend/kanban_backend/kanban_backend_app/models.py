import graphene

class KanbanTicketType(graphene.ObjectType):
    id = graphene.String()
    title = graphene.String()
    description = graphene.String()
    status = graphene.String()
    assigned_to = graphene.String()
    date = graphene.String()



    def __str__(self):
        return self.title
