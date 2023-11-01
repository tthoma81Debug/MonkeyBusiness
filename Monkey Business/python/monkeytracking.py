# This file tracks the monkey's positions and returns the x and y coordinates of the detected movement areas.
#INPUT
##########################
# url - the url of the youtube stream to be processed.
# segments - the amount of 5 second stream segements to record.
# OUPUT
##########################
# The x and y coordinates sent to the standard output.
#
# PYTHON INSTALLATION
# You can install a python .venv in visual studio code easily. First, install a Python module from the Windows Store.
# In the parent folder of the project, press ctrl + shift + p and search for Python: Create Environment and click Venv.
# Create a new .venv and use your downloaded python file for the base.
# When asked for dependencies, use the requirements.txt option. 
# That should set it up!

from datetime import datetime, timedelta, timezone
import time
import numpy as np
import cv2
import urllib
import m3u8
import streamlink
import os
import sys

def get_live(url):
    tries = 10
    for i in range(tries):
        try:
            streams = streamlink.streams(url)
        except:
            if i < tries - 1:  # i is zero indexed
                #print(f"Attempt {i + 1} of {tries}")
                time.sleep(0.1)  # Wait half a second, avoid overload
                continue
            else:
                raise
        break

    stream_url = streams["best"]  # Alternate, use '360p'

    m3u8_obj = m3u8.load(stream_url.args['url'])
    return m3u8_obj.segments[0]  # Parsed stream


def dl_stream(url, filename, chunks):
    """
    Download each chunk to file
    input: url, filename, and number of chunks (int)
    output: saves file at filename location
    returns none.
    """
    pre_time_stamp = datetime(1, 1, 1, 0, 0, tzinfo=timezone.utc)

    # Repeat for each chunk
    # Needs to be in chunks because
    #  1) it's live
    #  2) it won't let you leave the stream open forever
    i = 1
    while i <= chunks:

        # Open stream
        stream_segment = get_live(url)

        # Get current time on video
        cur_time_stamp = stream_segment.program_date_time
        # Only get next time step, wait if it's not new yet
        if cur_time_stamp <= pre_time_stamp:
            # Don't increment counter until we have a new chunk
            #print("NO   pre: ", pre_time_stamp, "curr:", cur_time_stamp)
            time.sleep(0.5)  # Wait half a sec
            pass
        else:
            #print("YES: pre: ", pre_time_stamp, "curr:", cur_time_stamp)
            #print(f'#{i} at time {cur_time_stamp}')
            # Open file for writing stream
            file = open(filename, 'ab+')  # ab+ means keep adding to file
            # Write stream to file
            with urllib.request.urlopen(stream_segment.uri) as response:
                html = response.read()
                file.write(html)

            # Update time stamp
            pre_time_stamp = cur_time_stamp
            time.sleep(stream_segment.duration)  # Wait duration time - 1

            i += 1  # only increment if we got a new chunk

    return None


def openCVProcessing(saved_video_file):
    '''View saved video with openCV
    Add your other steps here'''
    capture = cv2.VideoCapture(saved_video_file)

    ret, frame1 = capture.read()
    ret, frame2 = capture.read()
    while capture.isOpened():

        # openCV processes the video feed

        diff = cv2.absdiff(frame1, frame2)
        gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
        dilated = cv2.dilate(thresh, None, iterations=3)
        contours, _ = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        for contour in contours:
            (x, y, w, h) = cv2.boundingRect(contour)

            if cv2.contourArea(contour) < 900:
                continue

            cv2.rectangle(frame1, (x, y), (x + w, y + h), (0, 255, 0), 2)
            print( x, y)
            cv2.putText(frame1, "Status: {}".format('Movement'), (10, 20), cv2.FONT_HERSHEY_SIMPLEX,
                        1, (0, 0, 255), 3)
        #cv2.drawContours(frame1, contours, -1, (0, 255, 0), 2) #Not always desired, but keep available

        cv2.imshow("feed", frame1)
        frame1 = frame2
        grabbed, frame2 = capture.read()
        if grabbed == False:
            break

        # Shown in a new window, To exit, push q on the keyboard
        if cv2.waitKey(20) & 0xFF == ord('q'):
            break

    capture.release()
    cv2.destroyAllWindows()  # close the windows automatically


tempFile = "temp.ts"  #files are format ts, open cv can view them
videoURL = sys.argv[1]
if(os.path.isfile(tempFile)): os.remove(tempFile)
dl_stream(videoURL, tempFile, np.uint8(sys.argv[2]))
openCVProcessing(tempFile)
