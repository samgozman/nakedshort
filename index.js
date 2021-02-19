/**
 * Naked short data from from nakedshortreport.com
 * ! Unofficial API
 */
const nakedshort = require('./lib/report')

module.exports = {
    /**
    * Stock object
    *
    * @typedef {Object} Stock
    * @property {string} ticker Stock ticker
    * @property {number} nakedShortPercent
    * @property {Array.<{date: Date, volume: number, shortVolume: number, percentOfVolShorted: number}>} historicalShortVol
    */

    /**
    * Get naked shorts current and historical data from nakedshortreport.com
    * 
    * @example
    * const naked = await nakedshort.getShortData('FCFS')
    *
    * @async
    * @param {String} ticker 
    * @return {Promise.<Stock>}
    * @reject {Object} - Empty object
    */
    getShortData: async function (ticker) {
        const {
            parsedJson
        } = await nakedshort(ticker)
        return parsedJson
    },

    /**
    * Chart object
    *
    * @typedef {Object} Chart
    * @property {Array} regularVolArr Array of regular trade volume
    * @property {Array} shortVolArr Array of short volume
    * @property {Array} xAxisArr Array of date string in UTC format
    */

    /**
    * Get naked shorts historical chart data
    * 
    * @example
    * const naked = await nakedshort.getChart('FCFS')
    *
    * @async
    * @param {String} ticker 
    * @return {Promise.<Chart>}
    * @reject {Object} - Empty object
    */
    getChart: async function (ticker) {
        const {
            parsedChartData
        } = await nakedshort(ticker)
        return parsedChartData
    },
}