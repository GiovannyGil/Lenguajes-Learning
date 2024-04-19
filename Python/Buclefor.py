#BUCLE FOR
# el buble for se repite tantas veces como elementos tengas en una coleccion, "Se repite de forma limitado"

coleccion={"Giovanny":20,"Sofia":20,"Daniela":19}

for i in [1,2,3,4,5]: # llamar un mensale por eleemento "Desordenado"
    print("Hola Mundo")

for I in coleccion: # solo llama la clave en el diccionario
    print(f"El Elemento: {I}")

for I in coleccion: # solo llamar el valor en el diccionario
    print(f"El Valor es: {coleccion[I]}")

for I in coleccion: # llavar los dos elementos del diccionario metodo 1
    print(f"{I} -> {coleccion[I]}")

for clave,valor in coleccion.items(): # llamar los dos elemetos del diccionario metodo 2
    print(f"{clave} -> {valor}")
