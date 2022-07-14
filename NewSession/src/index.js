import { app, io } from './server.js'
import connection from './db/MDBconnection.js'

//MongoDB connection
const mongo = connection()

//Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port 8080');
})

