numero1=int(input("ingrese el primer numero: "))
numero2=int(input("ingrese el segundo nuemro: "))


if numero1%2==0 and numero2%2==0:
    print("ambos numeros son par")
elif numero1%2==0 and numero2%2!=0:
    print("solo el numero 1 es par")
elif numero1%2==1 and numero2%2==0:
    print("solo el numero 2 es par")
else:
    print("ambos nuemros son impar")

