import PropTypes from 'prop-types' // importar tipos de datos y parametros

export function  Button({text, name}) {
    return <button>{text} - {name}</button>
}

Button.protoTypes={ // definir la propiedades y tipos de datos!!!
    text: PropTypes.string.isRequired
}
Button.defaultProps={ // dar un valor por defecto, si no se le pasa la propiedad nombre
    name:'Some User'
}