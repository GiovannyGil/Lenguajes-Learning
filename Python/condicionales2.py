#condicionales combinados/anidados


edad=int(input("Ingrese su edad: "))

if edad>0 and edad<100:
    if edad>=18:
        print("es mayor de edad")
    else:
        print("No es mayor de edad")
else:
    print("edad incorrecta")