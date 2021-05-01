const got = require('got')

/**
 * Converts string date like 'Jan 04' to Date object with current year
 * @param {String} dateString - String date like 'Feb 21'
 * @returns {Date} 
 */
const convertDate = (dateString = '') => {
    const currentDate = new Date(),
        date = new Date(dateString)

    // To set proper year for the past date
    if ((currentDate.getMonth() - date.getMonth()) < 0) {
        date.setFullYear(currentDate.getFullYear() - 1)
    } else {
        date.setFullYear(currentDate.getFullYear())
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
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
        nakedShortPercent: +json.historicalShortVol[0]['8'],
        historicalShortVol: []
    }
    const historicalShortVol = json.historicalShortVol
    const chartDateArray = []

    historicalShortVol.forEach( (key) => {
        const date = convertDate(key['0'])
        chartDateArray.push(date)
        parsedJson.historicalShortVol.push({
            date,
            volume: +key['5'].replace(/,/gm, ''),
            shortVolume: +key['7'].replace(/,/gm, ''),
            percentOfVolShorted: +key['8']
        })
    })

    const parsedChartData = {
        regularVolArr: json.regularVolArr,
        shortVolArr: json.shortVolArr,
        xAxisArr: chartDateArray.reverse()
    }

    return {
        parsedJson,
        parsedChartData
    }
}

const getNakedShortReport = async (ticker = '') => {
    if (ticker === '') {
        throw new Error()
    }

    try {
        const response = await got(`https://nakedshortreport.com/ajax.php?action=getcompanyinfo&company=${ticker}`)

        return parseJson(JSON.parse(response.body))
    } catch (error) {
        return {
            parsedJson: {},
            parsedChartData: {}
        }
    }
}

module.exports = getNakedShortReport