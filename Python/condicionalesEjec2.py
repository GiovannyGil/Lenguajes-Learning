Num1=int(input("Ingrese el primer número: "))
Num2=int(input("Ingrese el segundo número: "))
Num3=int(input("Ingrese el tercer número: "))



if Num1>Num2 and Num1>Num3:
    print("el primer número es mayor")
elif Num2>Num1 and Num2>Num3:
    print("el segundo numero es mayor")
elif Num3>Num1 and Num3>Num2:
    print("el tercer número es mayor")
else:
    print("todos los numeros son iguales")