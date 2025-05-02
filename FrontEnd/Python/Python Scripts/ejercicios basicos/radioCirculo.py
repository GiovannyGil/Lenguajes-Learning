from math import pi, pow


def AreaCirculo(radio):
    Area = pi * pow(radio, 2)
    return Area


print('Ingrese el Radio del circulo')
radio = int(input())
print(AreaCirculo(radio))
