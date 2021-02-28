# nakedshort

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/samgozman/nakedshort/Nakedshort%20Node.js)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/652681ae222f4ea8b0cbae3116c3e973)](https://www.codacy.com/gh/samgozman/nakedshort/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=samgozman/nakedshort&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/nakedshort)](https://www.npmjs.com/package/nakedshort)
![npm bundle size](https://img.shields.io/bundlephobia/min/nakedshort)
![NPM](https://img.shields.io/npm/l/nakedshort)

Get detailed naked short stock data history from nakedshortreport.com

> *Warning! This is unofficial API.*

## Installation

Install package from NPM

```bash
npm install nakedshort
```

## Features

* Current naked short percent
* Naked short percent history for the last mounth
* Volume change history for the last mounth
* Short volume change history for the last mounth
* Short volume and regular volume as chart data

## Usage

Use **nakedshort** in async functions

### .getShortData(ticker)

```javascript
const nakedshort = require('nakedshort')

const main = async () => {
  const stock = await nakedshort.getShortData('GME')
  console.log(stock)
}

main()
```

#### Returns from getShortData()

> await nakedshort.getShortData('GME')

```javascript
{
      ticker: 'GME',
      nakedShortPercent: 57.34,
      historicalShortVol: [
        {
          date: 2020-02-01T21:00:00.000Z,
          volume: 22190631,
          shortVolume: 12724612,
          percentOfVolShorted: 57.34
        },
        ...
      ]
}
```

### .parsedChartData(ticker)

```javascript
const nakedshort = require('nakedshort')

const main = async () => {
  const stock = await nakedshort.parsedChartData('GME')
  console.log(stock)
}

main()
```

#### Returns from parsedChartData()

> await nakedshort.parsedChartData('GME')

```javascript
    {
      regularVolArr: [
        13588159, 24069273, 69838143,
        52127978, 56923379, 21125354,
        15436078, 12285609,  9626981,
        22190631, 12738799, 19725076,
        24478070,  7921924,  8521585,
        12958191,  4330922,  4787656,
         2581870,  2668697,  8118086
      ],
      shortVolArr: [
         4502240,  7270860, 24371588,
        21229726, 19847959, 11737395,
         8102481,  6830398,  5504023,
        12724612,  7203742, 10640122,
        14052965,  4689372,  4844033,
         4491996,  1464916,  1458869,
         1646869,  1630025,  3229478
      ],
      xAxisArr: [
        2021-01-20T00:00:00.000Z,
        2021-01-21T00:00:00.000Z,
        2021-01-22T00:00:00.000Z,
        2021-01-25T00:00:00.000Z,
        2021-01-26T00:00:00.000Z,
        2021-01-27T00:00:00.000Z,
        2021-01-28T00:00:00.000Z,
        2021-01-29T00:00:00.000Z,
        2021-02-01T00:00:00.000Z,
        2021-02-02T00:00:00.000Z,
        2021-02-03T00:00:00.000Z,
        2021-02-04T00:00:00.000Z,
        2021-02-05T00:00:00.000Z,
        2021-02-08T00:00:00.000Z,
        2021-02-09T00:00:00.000Z,
        2021-02-10T00:00:00.000Z,
        2021-02-11T00:00:00.000Z,
        2021-02-12T00:00:00.000Z,
        2021-02-16T00:00:00.000Z,
        2021-02-17T00:00:00.000Z,
        2021-02-18T00:00:00.000Z
      ]
    }
```
