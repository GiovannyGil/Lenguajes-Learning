#
# Complete the 'getCapitalCity' function below.
#
# The function is expected to return a STRING.
# The function accepts STRING country as parameter.
# API URL: https://jsonmock.hackerrank.com/api/countries?name=<country>
#

import os
from urllib import request


def getCapitalCity(country):
    # construir la API URL
    url = "https://jsonmock.hackerrank.com/api/countries?name=" + country
    # hacer la consulta
    response = request.get(url)
    # obtener el JSON
    json = response.json()
    # obtener el capital
    capital = json['data'][0]['capital']
    # retornar el capital
    return capital


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    country = input()

    result = getCapitalCity(country)

    fptr.write(result + '\n')

    fptr.close()
