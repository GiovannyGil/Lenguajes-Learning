# ingresar el radio de un circulo y calcular el area y la longitud.

import math

r=float(input("ingrese el valor del radio del circulo: "))


area = math.pi * r**2
longitud = 2 * math.pi * r

print(f"el valor del area es {area:.2f}")
print(f"la longitud es {longitud:.2f}")