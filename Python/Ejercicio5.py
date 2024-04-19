# tienda ofrece descuento de 15%, mostrar el valor final a pagar


ValorInicial = float(input("ingrese el valor inicial a pagar: "))

decuento=ValorInicial*0.15

valorFinal=ValorInicial-decuento

print(f"el valor final a pagar es ${valorFinal:.2f}")