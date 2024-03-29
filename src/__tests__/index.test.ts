import nakedshort from '../index';

// During high load hours, the site may take a long time to open, which may affect the test result.
jest.setTimeout(10000);

test('Should get correct data from nakedshort', async () => {
  const stock = await nakedshort.getShortData('AAPL');

  expect(stock).toBeDefined();

  // Assert that String data from the response is correct
  expect(stock!.ticker).toBe('AAPL');
  expect(stock!.historicalShortVol[0].date).toEqual(expect.any(Date));

  // Assert that Number data from the response is a number or null
  expect(stock!.nakedShortPercent).toEqual(expect.any(Number));
});

test('Should get undefined object if the ticker is incorrect', async () => {
  const stock = await nakedshort.getShortData('Shorting is dangerous');

  // Assert that object is undefined
  expect(stock).toBeUndefined();
});

test('Should get chart data', async () => {
  const stock = await nakedshort.getChart('AAPL');
  expect(stock).toBeDefined();

  expect(stock!.regularVolArr.length).not.toBeNull();
  expect(stock!.shortVolArr.length).not.toBeNull();
  expect(stock!.xAxisArr.length).not.toBeNull();
});
