# LISTAS
'''
LAS LISTAS SE DEBEN PONER ENTRE CORCHETES
'''
lista = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']

print(lista) # muestra toda la lista
print(lista[2]) # solo muestra el elemento de la lista que está en el indice especificado
print(lista[-2]) # muestra el elemento de la lista segun el indice de atras hacia adelante con el signo -
print(lista[0:3]) # imprimes desde el indice hasta":" el indice,menos uno, a eso se le dice sublista
# es decur, si coloco 0:3 son 4, pero solo mostrara los 0,1,2, "uno menos"
print(len(lista)) # arroja la cantidad de elementos en la lista

'''
lista.append("elemento a agregar")  agrega elementos al final de la lista
lista.insert("indice donde quiere agregar","elemento a agregar") agrega un elemento en la ubicacion que se elija
lista.extend(["elementos a agregar"]) agregra varios elementos al final de la lista

lista3=lista1+lista2   concatena varias listas en una

print(3 in lista) sirve para buscar un elemento en la lista "preguntado con IN" si ese valor está
print(lista.index(5)) busca el elemento insertado y devuelve el indice en el que se encuentra
print(lista.count("valr a buscar")) indica cuantas veces esta el elemento buscado en la lista

lista.pop() elimina el ultimo elemento de la lista
lista.pop("indice del elemento") elimina el elemento que se encuentra en el indice ingresado
lista.remove("elemento a eliminar") elimina el elemento ingresado,
lista.clear() elimina todos los elementos de la lista

lista.reverse voltea los elementos de la lista al contrario

lista.sort() oderna la lista "con nuemros" orden ascendente
lista.sort(reversed=true) ordena la lista "con nuemros" orden descendente

'''
