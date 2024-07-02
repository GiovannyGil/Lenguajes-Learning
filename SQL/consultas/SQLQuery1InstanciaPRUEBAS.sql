use northwind

-- sintaxys b�sica con operadores de diferencias
SELECT * from Products
where CategoryID = 1 -- igual

SELECT * from Products
where CategoryID >= 1 -- mayor o igual

SELECT * from Products
where CategoryID > 1 -- mayor

SELECT * from Products
where CategoryID <3 -- menor

SELECT * from Products
where CategoryID <=3 -- menor o igual

SELECT * from Products
where CategoryID !=3 -- Diferente



--- los vaores aritmeticos, solo hacen operacione smatematicas con los elementos a llamar
-- + =suma, - =resta, * =multiplicacion, / =division, % =residuo de una divicion


-- Operadores L�gicos

-- AND
SELECT * from Products
where CategoryID > 1 and CategoryID < 3

-- OR
SELECT * from Products
where CategoryID > 1 or CategoryID < 3

-- NOT, NOT AND
SELECT CategoryID from Products
where not(CategoryID > 1) and (CategoryID < 3)

-- UNION
select city from Employees 
union -- une dos selectes, pero los cobina, o sea, no muestra repetidos solo los muestra una sola vez. para que las muestre todas, al union se le suma el all = 'union all
-- siempre conserva el alias de la primera sentencia, estas dos sentencias denen conciir en tipo de dato. y deben tener las mismas condiciones o epresiones
select city from Suppliers

-- intersect
select city from Employees 
intersect -- muestra los elementos en comun entre las sentencias = "Conjuntos"
select city from Suppliers

-- Except
select city from Employees 
except -- muestra los elementos de la primer sentencia, que no esten en la segunda
select city from Suppliers

-- Between
SELECT ProductName, CategoryID from Products -- el between establece un rango entre los cuales va a buscar
where CategoryID between 2 and 4

-- IN
SELECT ProductName, CategoryID from Products -- Busca elmentos 'sueltos' sin ning�n atributo en comun etc
where CategoryID in (1,3,5)



-- LIKE
select ProductID,ProductName,SupplierID -- permite Buscar textos con comodines de posicion
from products 
where ProductName like '%c%'

-- perent

-- Porcentaje de los elelemtos buscados , matematicos

-- top
-- busca los primeros # Buscados

----------- FUNCIONES DE AGRUPAMIENTO
-- Count
Select CategoryID Categor�a, COUNT(CategoryID) Cantidad from products	-- cuenta los elementos en general o por clasificacion
group by CategoryID

Select CategoryID Categor�a, COUNT(ProductID) Cantidad from products	
group by CategoryID

-- AVS
Select avg(UnitPrice) Promedio, CategoryID Categor�a from products	-- Permite sacar un promedio por los elementos buscados y clasificacion asiganda, como en general
group by CategoryID

-- MAX , MIN
Select CategoryID Categor�a, MAX(UnitPrice) Maximo, min(UnitPrice) Minimo -- Permite buscar el valor maximo "Mayor,Grande" y el valor Minimo "bajo,peque�o"
from products
group by CategoryID 
having	MAX(UnitPrice)<200 and min(UnitPrice)>5 -- establece condiciones encapsuladas sobre la selecci�n ---------HAVING---------------

-- Order by
SELECT ProductName, CategoryID from Products -- Ordena los elementos buscados, por el atributo asignado
where CategoryID in (1,3,5) 
order by CategoryID

------ fnciones de cadena--------------------------------

-- UPPER, LOWER
select upper(firstname) 
from Employees -- muestra los nombres en mayuscula con la funcion UPPER
select lower(firstname) 
from Employees -- muestra los nombres en minuscula con la funcion LOWER

-- REPLACE
Select firstname, replace(firstname, 'n', 'p') from employees --- replace cambia las letras, la primera por la segunda elegida
Select firstname, replace(firstname, 'n', 'nn') from employees  -- replace == reemplaza
Select firstname, replace(firstname, 'n', ' ') from employees -- el replace se puede anidar

-- Concatenacion
Select unitsinstock + unitsinstock  from Products
Select unitsinstock + unitsinstock + unitsinstock + unitsinstock from Products -- suma
Select unitsinstock + unitsinstock , str(unitsinstock)+ str(unitsinstock) from Products -- concatenacion

-- LEFT
select left(firstname, 2) from Employees -- muestra las dos primeras (izquierda) letras de cada nombre (cadena)
-- RIGHT
select right(firstname, 2) from Employees -- muestra las dos ultimas (derecha) letras de cada nombre (cadena)


-- Substring
select FirstName, SUBSTRING(FirstName, 1, 2) -- busca por posicion y los que le siguen como segundo parametro
from Employees -- muestra, de la posicion num1, muestre los siguientes num2

select FirstName, SUBSTRING(FirstName, 3, 3) 
from Employees

------ fnciones de numeros--------------------------------

-- Floor
select UnitPrice, FLOOR(UnitPrice) 
from Products -- floor, la parte entera de un valor == aproxima al entero con tendencia hacia abajo = redondea hacia abajo

-- Ceiling
select UnitPrice, ceiling(UnitPrice) 
from Products -- ceiling, la parte entera de un valor == aproxima al entero con tendencia hacia arriba = redondea hac�a arriba

-- Round
select UnitPrice, round(UnitPrice, 0) 
from Products  -- redondea hacia al m�s cercano, arriba o abajo, el numero es para declarar cual decial aproximar

-- ABS
select UnitPrice, abs(UnitPrice-20) 
from products  -- abs es el vlor absoluto de un elementos, sin importar el signo

-- ABS
select UnitPrice-20, abs(UnitPrice-20),  sign(UnitPrice-20)
from products  -- sign muestra el signo de un numero, con el n�mero 1

------ fnciones de fechas--------------------------------

-- GETDATE, DATEDIFF
select firstname, lastname, hiredate 'Fecha de Contratacion', getdate() 'Fecha Actual', -- trae la fecha de contratacion de los empleados, - getdate trae la fecha y hora actual del sistema
datediff(year,hiredate,getdate()) Diferencia -- establece una diferencia por 'a�o' entre fecha actual y de conratacion // (month,hiredate,getdate()) // (day,hiredate,getdate())
from Employees 

-- DATEADD
select firstname, lastname, hiredate, DATEADD(YEAR, 3, HireDate) 'Fecha Aumentada' 
from Employees -- Adddate = 'agregar fecha' = (agrefar 3 a�os a la fecha de contratacion), puede ser por a�o, mes, dia

------ fnciones de convertir--------------------------------

-- CAST
select ProductName,unitprice, CAST(Unitprice as int) Entero -- conierte un n�mero e decimal a entero, asi mismo puede convertir en 'varchar = cadena'
from Products

-- convert
select ProductName,unitprice, CONVERT(int, UnitPrice) Entero -- conierte un n�mero e decimal a entero
from Products

-- ISNULL
select CompanyName,City, Region,  ISNULL(REGION, 'No tiene' )
from Suppliers -- todo lo que sea 'nulo,NULL' se remplaza por un valor asignado, puede ser una cadena como un numero o que se reita el valor de otro campo como la ciudad

-- Select anidado
Select Productname, unitprice from Products
where UnitPrice BETWEEN
(Select UnitPrice from Products where ProductID = 34)
and 
(Select UnitPrice from Products where ProductID = 7)
	
-- Distinct  == "sin repetir",  -- some == alguno
select productname from Products -- muestra el nombre de prodcuto que empiezza por la letra que termine el nomre de la ciudad de los empleados
where LEFT(ProductName,1)= some ( -- primer letra del nombre de producto
select Distinct RIGHT(city, 1) from Employees) -- muestra la ultima letra de la ciudad de los empleados, sim mostrar repetidas

select CategoryID, unitprice, (select max(unitprice)from Products pt -- muestra el valor maximo de la tabla por cateorias
where pt.CategoryID = px.CategoryID) -- muestra el valor maximo por categorias
from Products px
order by CategoryID


-- JOIN
select P.productid, C.categoryname, P.productname  -- elementos a buscar
from categories C join Products P -- union, de donde vienen
on P.CategoryID=C.CategoryID -- Condicion o comparacion entre elementos de dos tablas
where P.ProductID=77 -- condicion

select P.ProductID, P.ProductName, C.CategoryName
from Products P join Categories C
on P.CategoryID = C.CategoryID and C.CategoryID=8
--where C.CategoryID=8 --where C.Category Name = 'Seafood'

select S.city ciudad, S.Country pais, S.SupplierID proveedor, P.SupplierID producto, P.ProductName
from Suppliers S join  Products P
on P.SupplierID = S.SupplierID

select * from Employees
select * from Customers
select * from Orders
select * from [Order Details]
select  * from Suppliers
select * from Categories
select * from Products

select E.firstname, E.LastName, O.orderid Orden, C.companyName, 
O.orderDate, C.ContactName, O.ShippedDate

from Orders O join Employees E 
on  E.EmployeeID = O.EmployeeID join Customers C 
on O.CustomerID = C.CustomerID




---- AUTOJOIN
-- Mostrar todos los empleados qie viven en la misma ciudad que su jefe
select E.LastName,E.City, R.LastName,R.City 
from Employees E
join Employees R
on E.ReportsTo = R.EmployeeID
where E.City = R.City

-- QUIENES NO TIENEN JEFE Y QUIENES NO TIENEN EMPLEADOS
select E.LastName,E.City, R.LastName,R.City 
from Employees E FULL
join Employees R
on E.ReportsTo = R.EmployeeID
