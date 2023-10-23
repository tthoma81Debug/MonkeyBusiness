import yfinance as yf
import json
import urllib

def stockSearchList(query, startRange, endRange):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={query}')
    content = response.read()
    output=[]
    for i in range(startRange, endRange):
        data = json.loads(content.decode('utf8'))['quotes'][i]['symbol']
        output.append(data)
    return output