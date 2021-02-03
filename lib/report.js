const got = require('got')

const parseJson = (json = {}) => {
    // Keys for Object.
    // Original data mostly N/A. Therefore, I will be only use the data that is accessible.
    let parsedJson = {
        name: json.namets,
        nakedShortPercent: json.historicalShortVol[0]['8'],
        historicalShortVol: []
    }
    const historicalShortVol = json.historicalShortVol
    
    historicalShortVol.forEach(key => {
        parsedJson.historicalShortVol.push({
            'date': key['0'],
            'volume': Number.parseInt(key['5'].replace(/,/gm,'')),
            'shortVolume': Number.parseInt(key['7'].replace(/,/gm,'')),
            'percentOfVolShorted': Number.parseFloat(key['8'])
        })
    })
    return parsedJson
}

const getNakedShortReport = async (ticker = '') => {
    if(ticker === '') {
        throw new Error()
    }

    try {
        const response = await got(`https://nakedshortreport.com/ajax.php?action=getcompanyinfo&company=${ticker}`)
        const result = parseJson(JSON.parse(response.body))
        return result
    } catch (error) {
        return {}
    }
}

module.exports = getNakedShortReport