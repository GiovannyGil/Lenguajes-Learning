#
# Complete the 'findMaximum' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY arr
#  2. INTEGER m
#

def findMaximum(arr, m):
    # Write your code here
    # obtener el tamaño del arreglo
    n = len(arr)
    # inicializar el máximo
    max = 0
    # iterar sobre el arreglo
    for i in range(n):
        # inicializar la suma
        sum = 0
        # iterar sobre el arreglo
        for j in range(i, n):
            # sumar el elemento
            sum += arr[j]
            # si la suma es mayor al máximo
            if sum % m > max:
                # actualizar el máximo
                max = sum % m
    # retornar el máximo
    return max


if __name__ == '__main__':
    arr_count = int(input().strip())
    arr = list(map(int, input().rstrip().split()))
    m = int(input().strip())

    result = findMaximum(arr, m)

    print(result)
