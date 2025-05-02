Saldo = 1000000

print("Bienvenido")
print("elija una opcion entre 1 mostrar saldo, 2 ingresar ,3 retirar")
opcion = str(input("elija una opcion: "))

if opcion == "1":
    print(f"su saldo es {Saldo}")
elif opcion == "2":
    ingresar = int(input("Ingrese la cantidad a ingresar: "))
    Saldo = Saldo + ingresar
    print(f"su saldo es {Saldo}")
elif opcion == "3":
    retirar = int(input("Ingrese la cantidad a retirar: "))
    Saldo = Saldo - retirar
    print(f"su saldo es {Saldo}")
else:
    print("INGRESE UNA OPCION CORRECTA")


print("FIN DEL PROGRAMA")
