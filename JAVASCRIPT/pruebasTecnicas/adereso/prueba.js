const axios = require('axios');
const math = require('mathjs');

const SWAPI_BASE_URL = 'https://swapi.dev/api';
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

async function getStarWarsCharacter(name) {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/people/?search=${name}`);
        return response.data.results[0] || null;
    } catch (error) {
        console.error(`Error obteniendo personaje SW: ${error.message}`);
        return null;
    }
}

async function getStarWarsPlanet(name) {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/planets/?search=${name}`);
        return response.data.results[0] || null;
    } catch (error) {
        console.error(`Error obteniendo planeta SW: ${error.message}`);
        return null;
    }
}

async function getPokemon(name) {
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
        return response.data || null;
    } catch (error) {
        console.error(`Error obteniendo Pokémon: ${error.message}`);
        return null;
    }
}

async function solveProblem(problem) {
    const matches = problem.expression.match(/\"(.*?)\"\.(\w+)/g);
    if (!matches) {
        console.log('No se encontraron entidades en la expresión.');
        return;
    }

    let dataMap = {};
    for (let match of matches) {
        const [_, name, attribute] = match.match(/\"(.*?)\"\.(\w+)/);
        if (!dataMap[name]) {
            let data = await getStarWarsCharacter(name) || await getStarWarsPlanet(name) || await getPokemon(name);
            if (data) dataMap[name] = data;
        }
    }

    let expression = problem.expression;
    for (let name in dataMap) {
        for (let attribute in dataMap[name]) {
            const regex = new RegExp(`\"${name}\"\.${attribute}`, 'g');
            expression = expression.replace(regex, dataMap[name][attribute]);
        }
    }

    try {
        const result = math.evaluate(expression).toFixed(10);
        console.log(`Resultado: ${result}`);
    } catch (error) {
        console.error(`Error evaluando expresión: ${error.message}`);
    }
}

const problemExample = {
    "id": "e1296cba-2244-41b2-a524-7fb4d7d03e52",
    "problem": "En el exuberante bosque de la luna de Endor, Kit Fisto, el valiente Maestro Jedi, se encuentra con un Wobbuffet, un Pokémon conocido por su resistencia. Juntos, deciden embarcarse en una aventura matemática. Primero, multiplican la base de experiencia de Wobbuffet por la masa de Kit Fisto. Intrigados por el resultado, dividen este producto por la masa del tecnócrata Wat Tambor. Pero la curiosidad no se detiene ahí, pues deciden dividir una vez más el resultado obtenido por el periodo de rotación de Endor. ¿Qué fascinante descubrimiento les espera al final de este enigma intergaláctico?",
    "expression": "\"Wobbuffet\".base_experience * \"Kit Fisto\".mass / \"Wat Tambor\".mass / \"Endor\".rotation_period"

};

solveProblem(problemExample);
