''' de la lista elimine los elementos repetidos, y queden siendo unicos '''
lista=[1,2,3,3,4,5,6,6,7,8,1]
print(lista)
conjunto=set(lista)
lista=list(conjunto)
print(lista)