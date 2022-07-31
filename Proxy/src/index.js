import { app, io } from './server.js'
import connection from './db/MDBconnection.js'
import cluster from 'cluster'
import os from 'os'
import { MODO } from './config/yargs.js'
import logger from './utils/logger.js'

//MongoDB connection
const mongo = connection()

//Server
const numCpus = os.cpus().length


if(MODO == 'cluster' && cluster.isPrimary) {
    const numCpus = os.cpus().length

    logger.info('Numero de procesadores: ' + numCpus)
    logger.info('PID:' + process.pid)

    for(let i=0; i<numCpus; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        logger.info('Worker ' + process.pid + ' murio')
        cluster.fork()
    })
} else {

    app.listen(app.get('port'), ()=>{
        logger.info(`Server on port ${app.get('port')}`);
    })
}



