import sqlite3
import pandas as pd


square = lambda n : n*n # lambda function
#print(square(10))


conn = sqlite3.connect('Northwind.db') # connect to the database


conn.create_function("square",1,square) # create a function in the database

cursor = conn.cursor() # create a cursor

cursor.execute('''
            
            SELECT * FROM Products
            
            ''')
results = cursor.fetchall()
results_df = pd.DataFrame(results)
print(results) 