def ParImpar(numero):
    if numero % 2 == 0:
        print('el numero es Par')
    else:
        print('el numero es Impar')


print('Ingresa un numero por consola')
numero = int(input())


print(ParImpar(numero))
