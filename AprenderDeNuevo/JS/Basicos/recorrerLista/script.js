
const lista = [1,2,3,4,5]

const recorrerLista = () => {
    const contenedor = document.getElementById('contenedor');
    let htmlTemporal = '<ul>';
    lista.forEach((element) => {
        htmlTemporal += `<li>Elemento ${element}</li>`;
    });
    htmlTemporal += '</ul>';
    contenedor.innerHTML = htmlTemporal;
};






