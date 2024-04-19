# PILAS
# las pilas no existen en python, pero se pueden simular con las listas

# Los ultimos en llegar, son los primeros en salir


pila=[1,2,3]
print(pila)

pila.append(4) # agrega elemento al final
pila.append(5) # agrega elemento al final
print(pila)
N=pila.pop() # retorna el elemento del final para trabajar con el si es necesario
print(f"el elemento retornado es: {N} ")
# pila.pop() # solo elimina el ultimo valor
# print(pila)