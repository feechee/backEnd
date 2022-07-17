const infoCtrl = {};
const args = process.argv.slice(2)
const plataforma = process.platform
const version = process.version
const memoria = process.memoryUsage().rss
const ejecutable = process.execPath.split('/').pop()
const pid = process.pid
const carpeta = process.argv[1]



infoCtrl.renderInfo = (req, res) => {
    res.render('info',{ argumentos: args, plataforma: plataforma, version: version, memoria: memoria, id: pid, carpeta: carpeta, ejecutable: ejecutable })
  } 
    


export default infoCtrl;