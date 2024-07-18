
def TipoNumero(numero):
    num = numero
    
    if (num > 0):
        print('el numero es positivo')
    elif (numero < 0):
        print('el numero es negativo')
    else:
        print('el numero es igual a cero')
    


numero = int(input('ingrese un numero: '))
ver=TipoNumero(numero)
