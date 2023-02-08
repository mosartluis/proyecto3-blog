//? Dependences
const express = require('express')
const postsRouter = require('./posts/posts.router')
const db = require('./utils/database')

//?Initial configs
const app = express()
app.use(express.json())

db.authenticate() //? Mostrar en consola de manera informativa si la conexion se hizo de manera correcta
    .then(() => {
        console.log('Database credentials are correct')
    })
    .catch((err) => {
        console.log(err) //! Errores de autenticacion (contraseña, usuario o hosts)
    })

db.sync() //? Sincronizar nuestra base de datos con los modelos que tenemos definidos
    .then(() => {
        console.log('The database has been synchronized')
    })
    .catch(err => {
        console.log(err) //! error en las tablas, propiedades, etc
    })

//* Se recibe info o data del cliente

app.get('/', (req, res) => {
    res.json({
        message: 'Server Ok!',
        routes: {
            posts: 'http://localhost:9000/api/v1/posts'
        }
    })
})

//? rutas de posts
app.use('/api/v1', postsRouter)

app.listen(9000, () => {
    console.log('Server started at port 9000')
})



module.exports = app
