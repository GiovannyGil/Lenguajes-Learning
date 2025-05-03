import { Router } from "express"

const router = Router()


 // cuando visite la página principal devuleva esta funcion
router.get('/', (req, res) => res.render('index.ejs', {title: 'API GITHUB'}))

export default router