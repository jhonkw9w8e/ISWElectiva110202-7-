from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.Informe import Informe
from ..serializers import InformeSerializer

class InformeAPIView(APIView):
    def get(self,request,pk=None):
        if pk: 
            try: 
                informe = Informe.objects.get(pk=pk)
                return Response(InformeSerializer(informe).data)
            except Informe.DoesNotExist:
                return Response({"error":"Informe no encontrado"},status=status.HTTP_404_NOT_FOUND)
        informes = Informe.objects.all()
        return Response(InformeSerializer(informes,many=True).data)
    
    def post(self,request):
        serializer = InformeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,pk):
        try:
            informe = Informe.objects.get(pk=pk)
        except Informe.DoesNotExist:
            return Response({"error":"Informe no encontrado"},status=status.HTTP_404_NOT_FOUND)
        serializer = InformeSerializer(informe,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        try:
            informe = Informe.objects.get(pk=pk)
            informe.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"error":"Informe no encontrado"},status=status.HTTP_404_NOT_FOUND)