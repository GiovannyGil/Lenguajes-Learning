# intercambiar valores de a y b

a = int(input("Ingrese el valor de a: "))
b = int(input("Ingrese el valor de b: "))


a, b = b, a

print(f"el nuevo valor de a es: {a}")
print(f"el nuevo valor de b es: {b}")
