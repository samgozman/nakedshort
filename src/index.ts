import got from 'got';

/**
 * Converts string date like 'Jan 04' to Date object with current year
 * @param {string} dateString - String date like 'Feb 21'
 * @returns {Date}
 */
const convertDate = (dateString: string = ''): Date => {
  const currentDate = new Date(),
    date = new Date(dateString);

  // To set proper year for the past date
  if (currentDate.getMonth() - date.getMonth() < 0) {
    date.setFullYear(currentDate.getFullYear() - 1);
  } else {
    date.setFullYear(currentDate.getFullYear());
  }
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
};

/** Original interface of the NakedShorts volumes response */
interface IHistoryNakedshortResponse {
  /** String date */
  '0': string;
  /** Total volume */
  '5': string;
  /** Short Volume */
  '7': string;
  /** Percent of volume shorted */
  '8': string;
}

/** Original interface of the NakedShorts response */
interface INakedshortsResponse {
  /** Stocks ticker */
  namets: string;
  historicalShortVol: IHistoryNakedshortResponse[];
  /** String date array */
  xAxisArr: string[];
  shortVolArr: number[];
  regularVolArr: number[];
}

/** Short volume history */
interface IHistoricalShortVolume {
  date: Date;
  volume: number;
  shortVolume: number;
  percentOfVolShorted: number;
}

interface IChart {
  /** Array of date string in UTC format */
  xAxisArr: Date[];
  /** Array of short volume */
  shortVolArr: number[];
  /** Array of regular trade volume */
  regularVolArr: number[];
}

interface IShortStock {
  ticker: string;
  nakedShortPercent: number;
  historicalShortVol: IHistoricalShortVolume[];
}

/**
 * Grab useful data from original JSON response
 * @param {INakedshortsResponse} json
 * @returns
 */
const parseJson = (
  json: INakedshortsResponse
): {
  parsedJson: IShortStock | undefined;
  parsedChartData: IChart | undefined;
} => {
  // Keys for Object.
  // Original data mostly N/A. Therefore, I will be only use the data that is accessible.
  let parsedJson: IShortStock = {
    ticker: json.namets,
    nakedShortPercent: +json.historicalShortVol[0]['8'],
    historicalShortVol: [],
  };
  const historicalShortVol = json.historicalShortVol;
  const chartDateArray: Date[] = [];

  historicalShortVol.forEach((key) => {
    const date = convertDate(key['0']);
    chartDateArray.push(date);
    parsedJson.historicalShortVol.push({
      date,
      volume: +key['5'].replace(/,/gm, ''),
      shortVolume: +key['7'].replace(/,/gm, ''),
      percentOfVolShorted: +key['8'],
    });
  });

  const parsedChartData: IChart = {
    regularVolArr: json.regularVolArr,
    shortVolArr: json.shortVolArr,
    xAxisArr: chartDateArray.reverse(),
  };

  return {
    parsedJson,
    parsedChartData,
  };
};

const getNakedShortReport = async (ticker = '') => {
  if (ticker === '') {
    throw new Error();
  }

  try {
    const response = await got(
      `https://nakedshortreport.com/ajax.php?action=getcompanyinfo&company=${ticker}`
    );

    return parseJson(JSON.parse(response.body));
  } catch (error) {
    return {
      parsedJson: undefined,
      parsedChartData: undefined,
    };
  }
};

/**
 * Get naked shorts current and historical data from nakedshortreport.com
 *
 * @async
 * @param {string} ticker
 * @return {Promise.<IShortStock | undefined>}
 */
export const getShortData = async function (
  ticker: string
): Promise<IShortStock | undefined> {
  const { parsedJson } = await getNakedShortReport(ticker);
  return parsedJson;
};

/**
 * Get naked shorts historical chart data
 *
 * @async
 * @param {string} ticker
 * @return {Promise.<IChart | undefined>}
 */
export const getChart = async function (
  ticker: string
): Promise<IChart | undefined> {
  const { parsedChartData } = await getNakedShortReport(ticker);
  return parsedChartData;
};

/**
 * Get naked shorts data
 *
 * @example
 * const chart = await nakedshort.getChart('FCFS')
 * @example
 * const shortData = await nakedshort.getShortData('FCFS')
 */
export default {
  getShortData,
  getChart,
};
