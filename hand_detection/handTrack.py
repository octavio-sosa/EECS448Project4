import cv2
import numpy as np
import process.hand as hp
import json

def main():
    capture = cv2.VideoCapture(0)
    handHist = np.loadtxt('handHist.txt')
    ret, frame = capture.read()

    data = hp.getPOI(frame, handHist)
    data['frame_x'] = frame.shape[1]
    data['frame_y'] = frame.shape[0]
    data = json.dumps(data)

    capture.release()
    cv2.destroyAllWindows()

    print(data)

if __name__ == '__main__':
    main()
