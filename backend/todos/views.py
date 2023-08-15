from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer


class TodoListView(APIView):
    def get(self, request):
        completed = request.GET.get("completed_type")
        if completed is not None:
            if completed.lower() == "true":
                todos = Todo.objects.filter(completed=True)
            elif completed.lower() == 'false':
                todos = Todo.objects.filter(completed=False)
            elif completed.lower() == "both":
                todos = Todo.objects.all()
            else:
                return Response({"error": "Invalid completed parameter"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            todos = Todo.objects.all()

        todos = todos.order_by("-created_at")  # Sorting by created_at in descending order

        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetailView(APIView):
    def get_object(self, pk):
        return Todo.objects.get(pk=pk)

    def get(self, request, todo_id):
        try:
            todo = self.get_object(todo_id)
        except Todo.DoesNotExist:
            return Response({"todo": [f"Todo with Id of {todo_id} doesn't exist"]})
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, todo_id):
        try:
            todo = self.get_object(todo_id)
        except Todo.DoesNotExist:
            return Response({"todo": [f"Todo with Id of {todo_id} doesn't exist"]})
        serializer = TodoSerializer(instance=todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, todo_id):
        try:
            todo = self.get_object(todo_id)
        except Todo.DoesNotExist:
            return Response({"todo": [f"Todo with Id of {todo_id} doesn't exist"]})
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
