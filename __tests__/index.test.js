const nakedshort = require('..')

// During high load hours, the site may take a long time to open, which may affect the test result. 
jest.setTimeout(10000)

test('Should get correct data from nakedshort', async () => {
    const stock = await nakedshort('AAPL')

    // Assert that response is not null at least
    expect(stock).not.toBeNull()

    // Assert that String data from the response is correct
    expect(stock.ticker).toBe('AAPL')
    expect(stock.historicalShortVol[0].date).toEqual(expect.any(Date))

    // Assert that Number data from the response is a number or null
    expect(stock.nakedShortPercent).toEqual(expect.any(Number))
})

test('Should get { Error } object if the ticker is incorrect', async () => {
    const stock = await nakedshort('Shorting is dangerous')

    // Assert that object is empty
    expect(stock).toEqual({})
})