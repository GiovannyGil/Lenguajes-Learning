import  Express  from "express" // improtar express para crear un servidor
// import ejs from 'ejs'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'


import router from "./routes/index.js"

const app = Express() // inicializar express

const __dirname = dirname(fileURLToPath(import.meta.url)) // establecer ruta absoluta de la carpeta de las vistas

app.set('views', join(__dirname, 'views')) // ubicacion/ ruta de las vistas
app.use(Express.static('public')); // establecer ruta de los archivos estaticos
app.set('view engine', 'ejs') // establecer con que motor de plantillas html se va a trabajar

app.use(router) // usar enrutador

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000')) // iniciar servidor en el puerto 3000

