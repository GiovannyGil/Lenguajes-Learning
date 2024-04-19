#Colas
# los primeros en llegar, son los promeros en salir, los ultimos en llegar, son los ultimos en salir

# from collections import deque "la cola también se puede hacer con esta funcion"

cola=["Maria","Jose","Mario"]

print(cola)

# agrega el elemento al final
cola.append("Carla") 
cola.append("July")
print(cola)


# sacando elementos por el principio de la cola
N= cola.pop(0) # el indice "0" indica que saca el valor del primer "lugar"
print(f"Estan atendiendo a {N} por que fue quien llego primero")
print(cola)