import yfinance as yf

#when given  the stock name, returns:
#stock name, current price, the high for the day, the volume, and the percent change for the day
def getStockInfo(name):
    stock=yf.Ticker(name)
    output=[]
    output.append(name)
    output.append(stock.info['currentPrice'])
    output.append(stock.info['regularMarketDayHigh'])
    output.append(stock.info['volume'])
    output.append((1-stock.info['currentPrice']/stock.info['regularMarketPreviousClose'])*100)
    return output