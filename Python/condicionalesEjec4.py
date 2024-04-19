Num1=int(input("ingrese el primer numero: "))
op=str(input("ingrese el caracter de la operacion: "))
Num2=int(input("ingrese el segundo numero: "))
resultado=0

if op=="+":
    resultado=Num1+Num2
elif op=="-":
    resultado=Num1-Num2
elif op=="*":
    resultado=Num1*Num2
elif op=="/":
    resultado=Num1/Num2
else:
    print("elija un operador correcto")


print(f"el resultado es: {resultado}")