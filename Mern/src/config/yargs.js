import parseArgs from 'yargs'

const yargs = parseArgs(process.argv.slice(2))

const { PORT, MODO } = yargs
    .alias({
        p:'PORT',
        m:'MODO'
    })
    .default({
        PORT:8080,
        MODO:'fork'
    })
    .argv

    export {PORT, MODO}
