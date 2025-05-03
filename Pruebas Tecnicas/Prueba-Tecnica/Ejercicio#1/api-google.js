const axios = require('axios');

// funcion asincrona para obtener los 10 repositorios mas estrellados de un usuario
async function getTopStarredRepos(username) {
  try {
    // Buscar repositorios públicos del usuario en GitHub ordenados por estrellas
    const searchResponse = await axios.get(`https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc`);

    // Obtener los primeros 10 resultados
    const topRepos = searchResponse.data.items.slice(0, 10);

    // Imprimir los nombres y estrellas de los repositorios
    console.log(`Los 10 repositorios públicos más estrellados de ${username}:`);
    // Recorrer los repositorios y mostrar su nombre y estrellas
    topRepos.forEach(repo => {
      console.log(`${repo.name}: ${repo.stargazers_count} estrellas`);
    });

  } catch (error) {
    // Si hay un error, imprimirlo
    console.error(`Error al obtener repositorios: ${error.message}`);
  }
}

// Ejemplo de uso con el nombre de usuario "google"
getTopStarredRepos('google');
