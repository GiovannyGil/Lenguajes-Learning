use northwind


Select FirstName, LastName, Address, City from employees
where city='London'



Select EmployeeID, FirstName, LastName, Title from employees
where EmployeeID % 2 = 0


Select EmployeeID,  LastName, City from employees
where City not like '%o%' and City not like'%d%' 


Select replace(LastName, 'a', 'A') from employees


select left(FirstName, 3)+ right(lastname, 2) from Employees