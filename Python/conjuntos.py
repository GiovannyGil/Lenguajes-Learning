# son grupos de elementos desordenados y unicos, donde no hay duplicados

conjunto=set() # conjunto vacio
# el SET es lo que lo define como conjunto, de lo contrario seria una biblioteca
conjunto={1,2,3.4,"hola",False} # en estos no pueden haber otro tipo de colecciones como listas o tuplas
conjunto1={1,2,4,5}
conjunto3=frozenset({1,2,3,4,5,6,"hola",False,3.4}) #frozenset=conjunto inmutable
print(conjunto)

conjunto.add("Gio") # agregar elementos a un conjunto, estos se guardan en cualquier indice del conjunto
conjunto.discard(1) # elimina el elemento elegido
conjunto.clear() # vuelve el conjunto vacio

print(3 in conjunto) # busca el elemento seleccionado en el conjunto = valor booleano
print(6 not in conjunto) # busca si el elemento seleccionado no está dentor del conjunto = valor booleano

print(len(conjunto)) # cuenta los elementos
print(conjunto==conjunto1) # igualdad
conjunto2=conjunto|conjunto1 # union de conjuntos
conjunto2=conjunto&conjunto1 # es la interseccion de dos o más conjuntos
conjunto2=conjunto-conjunto1 # es la diferencia entre conjutos // solo los que estan en el primer conjunto y no el otro
conjunto2=conjunto1-conjunto # solo los que estan en el primer conjunto1 y no el otro
conjunto2=conjunto^conjunto1 # es la diferencia simetria // los elementos de ambos, menos los que tienen en común

'''SUBCONJUTNOS & SUPERCONJUNTOS'''
print(conjunto.issubset(conjunto3)) # pregunta si conjunto es subconjunto de conjunto3
print(conjunto3.issuperset(conjunto)) # preunta si conjunto3 es el superconjunto de conjunto
print(conjunto.isdisjoint(conjunto1)) # pregunta si los ocnjunto no tienen un elemento en comun



