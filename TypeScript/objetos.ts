// tipado de objetos
// type alias
/*type Hero ={
    name:string,
    age:number
}

let hero: Hero = {
    name:'thor',
    age:1500
}

function createHero(hero:Hero):Hero
{
    const {name,age} = hero
    return {name,age}
}


const thor = createHero({name:'Thor', age:1500})
*/

/**
 * template union types
 * type HexadecimalColor = `#${string}`
    const color : HexadecimalColor = '0033ff' // color en hexadecimal - X
    const color2 : HexadecimalColor = '0033ff' // color en hexadecimal - V

 */


type HeroId = `${string}-${string}-${string}-${string}-${string}`

// union type
type HeroPowerScale = 'local' | 'planetario' | 'galactico' | 'universal' | 'multiversal' | 'omnipresente'

type Hero ={
    readonly id?: HeroId, // es opcional, poreso el "?", y es solo de lectura si usa el readobly
    name:string,
    age:number,
    isActive?:boolean, // es opcional, poreso el "?"
    powerScale?: HeroPowerScale,
}

// optional propierties => propiedades opcionales

let hero: Hero = {
    name:'thor',
    age:1500
}

function createHero(hero:Hero):Hero
{
    const {name,age} = hero
    return {
        id: crypto.randomUUID(),
        name,
        age, 
        isActive:true,
        //powerScale
    }
}



//const thor = Object.freeze(createHero({name:'Thor', age:1500})) // el Onj.free lo hae de solo lectura 
const thor = createHero({name:'Thor', age:1500})

thor.powerScale = "planetario" // asignar