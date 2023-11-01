import yfinance as yf
import sys  # added after

name = sys.argv[1]  # added after
timeframe = sys.argv[2] # added after

def getClosingPriceList(name, timeframe):
    timeframe=str(timeframe)+"mo"
    #duration=convertTimeFrame(timeframe)
    stock=yf.Ticker(name)
    hist = stock.history(timeframe)
    #print(hist)
    return hist
print(getClosingPriceList(name,timeframe))  # added after
