# BUCLE WHILE
# Se puede repetir de forma indefinida, como limitada, como puede que no entre al bucle
import math

numero = int(input("Ingrese un numero positivo: "))

while numero < 0:
    print("Error -> ingrese un numero valido")
    numero = int(input("Ingrese un numero positivo: "))
print(f"\n Su raiz cuadrada es {(math.sqrt(numero)):.2f} : ")
