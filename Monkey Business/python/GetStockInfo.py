import yfinance as yf
import sys  # added after
names = sys.argv[1]  # added after pass in an array of stock names
#when given  the stock name, returns:
#stock name, current price, the high for the day, the volume, and the percent change for the day
def getStockInfo(names):
  nameArray=[]  # added after
  for name in names:  # added after
    output=[]
    stock=yf.Ticker(name)
    output.append(name)
    output.append(stock.info['currentPrice'])
    output.append(stock.info['regularMarketDayHigh'])
    output.append(stock.info['volume'])
    output.append((1-stock.info['currentPrice']/stock.info['regularMarketPreviousClose'])*100)
    nameArray.append(output)  # added after
    print(output)
  return nameArray


getStockInfo(names)  # added after
#print(getStockInfo(names)) # added after
