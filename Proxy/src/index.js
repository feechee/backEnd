import { app, io } from './server.js'
import connection from './db/MDBconnection.js'
import cluster from 'cluster'
import os from 'os'
import { MODO } from './config/yargs.js'

//MongoDB connection
const mongo = connection()

//Server
const numCpus = os.cpus().length


if(MODO == 'cluster' && cluster.isPrimary) {
    const numCpus = os.cpus().length

    console.log('Numero de procesadores: ' + numCpus)
    console.log('PID:' + process.pid)

    for(let i=0; i<numCpus; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker ' + process.pid + ' murio')
        cluster.fork()
    })
} else {

    app.listen(app.get('port'), ()=>{
        console.log(`Server on port ${app.get('port')}`);
    })
}



