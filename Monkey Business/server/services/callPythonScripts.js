import cp from 'child_process'

//function getMonkeyPosition
//Runs the python script to record a live stream for (segments * 5) seconds
//Then runs the movement detection algorithm on the video.t
//INPUT
/************************ */
//url - the URL of the youtube livestream to process
//segments - how many 5 second segments to record 
//OUTPUT
/************************ */
//CoordSpace - the assortment of x and y positions of detected movements.
//temp.ts - a video file of the last recorded livestream. 
export async function getMonkeyPosition (url, segments) {
  const ls = cp.spawn('python', ['./python/MonkeyTracking.py', url, segments])
  var coordSpace = [];
  var result = ''
  ls.stdout.on('data', (data) => {
    result += data
    var char = '\n';
    var i = 0;
    var j = 0;
    var index = 0;
    while ((j = result.indexOf(char, i)) !== -1) {
      var space = result.indexOf(' ', i);
      const coord = {x: result.substring(i, space), y: result.substring(space, j)};
      coordSpace[index] = coord;
      index = index+1;
      i = j + 1;
    }
    //var space = result.indexOf(' ', i);
    //const coord = {x: result.substring(i, space), y: result.substring(space), (result.length - 1)};
    //coordSpace[index] = coord;
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    for (let i = 0; i < coordSpace.length; i++) {
      console.log(`x: ${coordSpace[i].x}, y: ${coordSpace[i].y}`);
    }
  })
}

export async function getStockShort (stockNameArray) {
  const ls = cp.spawn('python', ['./python/GetStockInfo.py', stockNameArray])
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

export function getStockDetails (stockName, timeFrameMonths) {
  const ls = cp.spawn('python', ['./python/GetClosingPriceList.py', stockName, timeFrameMonths])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

export function searchStockAPI (searchQuery, start, end) {
  const ls = cp.spawn('python', ['./python/StockSearchList.py', searchQuery, start, end])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

