const nakedshort = require('./lib/report')

nakedshort('SPCE')


const main = async () => {
    console.log( await nakedshort('SPCE'))
}

main()