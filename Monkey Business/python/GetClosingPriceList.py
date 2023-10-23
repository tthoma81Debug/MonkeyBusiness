import yfinance as yf

def getClosingPriceList(name,timeframe):
    timeframe=str(timeframe)+"mo"
    #duration=convertTimeFrame(timeframe)
    stock=yf.Ticker(name)
    hist = stock.history(timeframe)
    #print(hist)
    return hist