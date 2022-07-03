import express from 'express'
class VistasRouter extends express.Router {
    constructor(app) {
        super()
        
        this.get('/'), (req, res) =>{
            res.render( 'login', {layout : 'index'})
        }

        this.get('/login', (req, res) => {
            res.render( 'login', {layout : 'index'});
            });

        this.post('/login',async (req, res) =>{
            req.session.nombre = await req.body.nombre || "Anónimo"
            console.log(req.body.nombre)
            res.redirect('/')
            })

        this.get('/log', async(req, res) =>{
            const nombre = {nombre: req.session.nombre} 
            res.json(nombre)
        })

        this.get('/logout', async(req, res) =>{
            const nombre = req.session.nombre 
            req.session.destroy( err => {
                if (err) {
                  res.json({error: 'logout', descripcion: err})
                } else {
                  res.render('logout', {layout : 'index'})
                }
              })
        })

    }


}

export default VistasRouter;