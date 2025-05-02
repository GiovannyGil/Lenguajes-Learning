'''
Ejercicio FizzBuzz
escribir un script, al cual le paso un numero por consola/argumento
e imprimir si este es multiplo de 3, 5, ambos o ninguno

validar que si sea un nuemro, y que sea positivo y entero
'''


def FizzBuzz(ingresarNumero):
    num = ingresarNumero
    try:
        if (num % 3 == 0 and num % 5 == 0):
            print('FizzBuzz')
        elif (num % 3 == 0):
            print('Fizz')
        elif (num % 5 == 0):
            print('Buzz')
        else:
            print('Ninguno')
    except ValueError:
        print('Algo Salió Mal')


ingresarNumero = int(input('Ingrese el numero: '))


mostrar = FizzBuzz(ingresarNumero)
