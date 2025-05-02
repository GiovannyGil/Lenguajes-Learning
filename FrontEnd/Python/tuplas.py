# se parecen a las listas, pero estas son inmutables
# no se puede agregar, eliminar o modificar
# su puede buscar, por indice o cualquier otro tipo de busqueda

from typing import List


tupla = (1, 2, "Hola", 3.4, 4, 2)

print(tupla[0])  # busqueda por indice
print(3 in tupla)  # busqueda por pregunta
print(tupla.index(1))  # regresa el indice donde esta
print(tupla.count(2))  # cuantas veces está el elemento
print(len(tupla))  # cuantos elementos  tiene la tupla

# se puede transformar tuplas en listas y viceversa

tupla = list(tupla)  # de tupla a lista
# tupla=tuple con este de lista a tupla
print(List)
