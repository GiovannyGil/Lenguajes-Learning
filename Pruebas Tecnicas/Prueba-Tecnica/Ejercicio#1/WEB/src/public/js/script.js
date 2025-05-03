import axios from 'axios';


async function getTopStarredRepos() {
    const username = document.getElementById('githubUsername').value;
    const repoList = document.getElementById('repoList');

    try {
      // Limpia la lista anterior
      repoList.innerHTML = "";

      // Buscar repositorios públicos del usuario en GitHub ordenados por estrellas
      const searchResponse = await axios.get(`https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc`);

      // Obtener los primeros 10 resultados
      const topRepos = searchResponse.data.items.slice(0, 10);

      // Mostrar los nombres y estrellas de los repositorios en la lista
      topRepos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = `${repo.name}: ${repo.stargazers_count} estrellas`;
        repoList.appendChild(listItem);
      });

    } catch (error) {
      // Si hay un error, imprimirlo
      console.error(`Error al obtener repositorios: ${error.message}`);
    }
  }