const got = require('got')

/**
 * Converts string date like 'Jan 04' to Date object with current year
 * @param {String} dateString - String date like 'Feb 21'
 * @returns {Date} 
 */
const convertDate = (dateString = '') => {
    const currentDate = new Date()
    const date = new Date(dateString)

    // To set proper year for the past date
    if (date.getMonth() <= 12 && currentDate.getMonth() <= 1) {
        date.setFullYear(currentDate.getFullYear() - 1)
    } else {
        date.setFullYear(currentDate.getFullYear())
    }
    return date
}

/**
 * Grab useful data from original JSON response
 * @param {Object} json 
 * @returns {Object}
 */
const parseJson = (json = {}) => {
    // Keys for Object.
    // Original data mostly N/A. Therefore, I will be only use the data that is accessible.
    let parsedJson = {
        ticker: json.namets,
        nakedShortPercent: Number.parseFloat(json.historicalShortVol[0]['8']),
        historicalShortVol: []
    }
    const historicalShortVol = json.historicalShortVol

    historicalShortVol.forEach(key => {
        parsedJson.historicalShortVol.push({
            date: convertDate(key['0']),
            volume: Number.parseInt(key['5'].replace(/,/gm, '')),
            shortVolume: Number.parseInt(key['7'].replace(/,/gm, '')),
            percentOfVolShorted: Number.parseFloat(key['8'])
        })
    })
    return parsedJson
}

/**
 * Stock object
 *
 * @typedef {Object} Stock
 * @property {string} ticker Stock ticker
 * @property {number} nakedShortPercent
 * @property {Array.<{date: Date, volume: number, percentOfVolShorted: number}>} historicalShortVol
 */

/**
 * Get naked shorts current and historical data from nakedshortreport.com
 * 
 * @example
 * const naked = await nakedshort('FCFS')
 *
 * @async
 * @param {String} ticker 
 * @return {Promise.<Stock>}
 * @reject {Object} - Empty object
 */
const getNakedShortReport = async (ticker = '') => {
    if (ticker === '') {
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