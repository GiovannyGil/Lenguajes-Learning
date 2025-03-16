<?php 
/**
 * Como declarar clases
 * 
 * -> las clases son bloques de codigo que permiten agrupar propiedades y metodos
 * -> se declaran con la palabra reservada class
 * -> se pueden instanciar
 * -> se pueden heredar
 * -> llevan un constructor
 * -> llevan metodos
 */

 // ejemplo de clase
    class Persona{
        // propiedades -> variables de la clase (solo se pueden acceder desde la clase)
        public $nombre;
        public $edad;
        public $pais;
    
        // constructor -> metodo que se ejecuta al instanciar la clase (inicializa las propiedades)
        public function __construct($nombre, $edad, $pais){
            $this->nombre = $nombre;
            $this->edad = $edad;
            $this->pais = $pais;
        }
    
        // metodos -> funciones de la clase (las funciones pueden ser publicas o privadas, llevar o no parametros dependiendo de la necesidad)
        public function mostrarInformacion(){
            return $this->nombre . ' tiene ' . $this->edad . ' años y es de ' . $this->pais;
        }
    }


declare(strict_types=1);

class SuperHero
{
    // propiedades y metodos
    // promoted properties -> es una forma de declarar las propiedades de la clase en el constructor
    public function __construct(readonly public string $name,  public array $powers, public string $planet) {}

    public function attack()
    {
        return "¡$this->name ha atacado!";
    }

    public function description()
    {
        $powers = implode(", ", $this->powers);
        return "$this->name es un superhéroe que proviene de $this->planet y tiene los siguientes poderes: $powers";
    }


    // metodo estatico -> se puede llamar sin instanciar la clase
    // no se puede acceder a las propiedades de la clase
    // no se puede modificar las propiedades de la clase
    // no se puede acceder a los metodos de la clase
    public static function random()
    {
        $names = ["Superman", "Batman", "Spiderman", "Ironman"];
        $powers = ["volar", "super fuerza", "rayos x", "super velocidad", "telepatía", "invisibilidad", "control mental", "super inteligencia", "super resistencia", "super vista", "super oído, super aliento"];
        $planets = ["Krypton", "Gotham", "Nueva York", "Tierra"];

        $name = $names[array_rand($names)]; // array_rand -> selecciona un valor aleatorio de un array
        $power = array_rand($powers, 3); // selecciona 3 valores aleatorios de un array
        $planet = $planets[array_rand($planets)]; // selecciona un valor aleatorio de un array

        return new self($name, $power, $planet);
    }
}


// instanciar la clase -> crear un objeto(super heroe)
$hero = new SuperHero("Superman", ["volar", "super fuerza", "rayos x"], "Krypton");

// echo $hero->description();

// llamar al metodo estatico
$hero2 = SuperHero::random();
echo $hero2->description();


?>