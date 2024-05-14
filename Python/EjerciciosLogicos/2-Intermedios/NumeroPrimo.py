'''
 * Escribe un programa que se encargue de comprobar si un número es o no primo.
 * Hecho esto, imprime los números primos entre 1 y 100.
'''

numero = int(input('Ingrese un numero: '))

# FUNCION PARA DETERMINAR SI ES PRIMO
def EsPrimo(numero):
    num = numero

    if num < 2:
        print(f'El numero {num} no es primo')
        return False
    elif num == 2:
        print(f'El numero {num} es primo')
        return True
    else:
        for i in range(2, num):
            if num % i == 0:
                print(f'El numero {num} no es primo')
                return False
        print(f'El numero {num} es primo')
        return True


ver = EsPrimo(numero)
