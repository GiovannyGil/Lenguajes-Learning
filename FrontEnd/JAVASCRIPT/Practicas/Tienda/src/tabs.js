export default class Tabs {
    // recibir el id de las tabs pasadas en el index al tabs
    constructor (idElemento) {
        console.log('Inicializando TABS');

        // propiedades para guardar, el contenedor y el menu de navegacion
        this.tabs = document.getElementById(idElemento)
        this.nav = this.tabs.querySelector('.tabs')

        // detectar el click en el menu de navegacion
        this.nav.addEventListener('click', (e) => {
            // obtener el elemento que fue clickeado -> si es la clase tabs__button
            if([...e.target.classList].includes('tabs__button')){
                // acceder al atributo personalizado
                const tab = e.target.dataset.tab

                // quitar la clase activa a las tabs que la tengan
                if(this.tabs.querySelector('.tab--active')){
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active')
                }
                // quitar la clase activa de los buttons que la tengan
                if(this.nav.querySelector('.tabs__button--active')){
                    this.nav.querySelector('.tabs__button--active').classList.remove('tabs__button--active')
                }


                // agregar la clase activa al tab
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active')

                // agregar la clase activa al button
                e.target.classList.add('tabs__button--active')


            }
        })
    }
}


