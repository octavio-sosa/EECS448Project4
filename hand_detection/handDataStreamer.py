import cv2
import numpy as np
import process.hand as hp
import json

def main():
    capture = cv2.VideoCapture(0)
    isHandHist = False

    while capture.isOpened():
        ret, frame = capture.read()
        pressed_key = cv2.waitKey(1)

        if pressed_key & 0xFF == ord('q'):
            break
        elif pressed_key & 0xFF == ord('s'):
            rectangles = hp.get_rectangles(frame)
            handHist = hp.get_handHist(frame, rectangles)
            isHandHist = True
            cv2.destroyAllWindows()
        elif isHandHist:
            data = hp.getPOI(frame, handHist)
            data['frame_x'] = frame.shape[1]
            data['frame_y'] = frame.shape[0]
            data = json.dumps(data)
            fileName = r'./hand_detection/handData.txt'
            fileData = open(fileName, 'w')
            fileData.write(data)
            fileData.close()

            frame = hp.drawPOI(frame, handHist)
            cv2.imshow('Hand-tracker: END STREAM WITH \'q\'', frame)
        else:
            frame = hp.draw_rect(frame)
            frame = cv2.flip(frame, 1)
            cv2.imshow('Hand-scanner: SCAN HAND WITH \'s\'', frame)

    capture.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
