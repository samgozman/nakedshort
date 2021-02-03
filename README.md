![GitHub Workflow Status](https://img.shields.io/github/workflow/status/samgozman/nakedshort/Nakedshort%20Node.js) 
[![npm](https://img.shields.io/npm/v/nakedshort)](https://www.npmjs.com/package/nakedshort)
![npm bundle size](https://img.shields.io/bundlephobia/min/nakedshort)
![NPM](https://img.shields.io/npm/l/nakedshort)

# nakedshort

Get detailed naked short stock data history from nakedshortreport.com

> *Warning! This is unofficial API.*

## Installation
Install package from NPM

```
npm install nakedshort
```

## Features

* Current naked short percent
* Naked short percent history for the last mounth
* Volume change history for the last mounth
* Short volume change history for the last mounth

## Usage
Use **nakedshort** in async functions

```javascript
const nakedshort = require('nakedshort')

const main = async () => {
	const stock = await nakedshort('GME')
	console.log(stock)
}

main()
```
### Returns
> await nakedshort('GME')

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