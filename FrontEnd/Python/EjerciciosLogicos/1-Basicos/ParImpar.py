# numero pares/impares

def ImparPar(numero):
    num = numero
    
    if(num % 2 != 0):
        print('el numero es impar')
    elif(numero % 2 == 0):
        print('el numero es par')
    else:
        print('algo salió mal')
    
    

numero = int(input('ingrese un numero: '))
ver=ImparPar(numero)