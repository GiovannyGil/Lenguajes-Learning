#Diccionarios
'''
son otro tipo de coleccion que se guarda de manera desordenada
tiene dos elementos por posicion
calve:valor la clave no puede ser duplicada
'''

diccionario={"Azul":"Blue","Rojo":"Red","Verde":"Green"}
print(diccionario)
print(diccionario["Azul"]) # muetsra por clave

diccionario["Amarillo"]="Yellow" # añade un nuevo elemento al diccionario
print(diccionario)
diccionario["Azul"]="BLUE" # Modificar un elemento
print(diccionario)
del(diccionario["Verde"]) # elimina un elemento
print(diccionario)

# en los diccionarios se puede guardar todo tipo de valores, incluso listas, tuplas y otros diccionarios etc
diccionario2={"Giovanny":{"Edad":20,"Estatura":1.75},"Jose":[22,1.65],"Sofia":[19,1.70]}
print(diccionario)

print(diccionario2.get("Giovanny","No existe este elemento en el diccionario")) #en caso que no esté, manda un mensaje
print("Giovanny" in diccionario2) # busca en el diccionario
print(diccionario.keys()) # solo muestra las claves
print(diccionario.values()) # solo los valores
print(diccionario.items()) # todos los valores
print(len(diccionario)) # cantidad de elementos
diccionario.clear() # limpia el diccionario o elimina los elementos