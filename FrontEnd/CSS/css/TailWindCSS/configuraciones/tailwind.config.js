/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    
    

    extend: {

      screens:{

        'lg': '1500px',
        'xlg': '2500px'

      },

      colors: {

        'aprendiendo': '#D4ADFC',
        'azul-muy-fuerte': '#0C134F'
  
      },

      spacing: {

        'noventa': '90%',
        'docientos': '200px'

      }, 

      borderWidth: {
        '1px': '1px',
        '20px': '20px'
      },

      fontFamily: {
        'cursive': 'cursive',
        'roboto': '"Roboto", sans-serif'
      }, 

      backgroundImage: {

        'imagen-bonita': 'url("../assets/img.jpg")'

      }
     

    },
  },
  plugins: [],
}

