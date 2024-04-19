def suma(num1, num2):
    resultado = num1 + num2
    return resultado


def resta(num1, num2):
    resultado = num1 - num2
    return resultado


def division(num1, num2):
    resultado = num1 / num2
    return resultado


def multiplicacion(num1, num2):
    resultado = num1 * num2
    return resultado


def reciduo(num1, num2):
    resultado = num1 % num2
    return resultado


print('agrega el numero 1:')
num1 = int(input())
print('agrega el numero 2:')
num2 = int(input())


print('Suma: ', suma(num1, num2))
print('Resta: ', resta(num1, num2))
print('Multiplicacion: ', multiplicacion(num1, num2))
print('Division: ', division(num1, num2))
print('Reciduo: ', reciduo(num1, num2))
