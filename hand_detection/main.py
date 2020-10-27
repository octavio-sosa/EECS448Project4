import cv2
import numpy as np
import process.hand as hp

def main():
    capture = cv2.VideoCapture(0)

    while capture.isOpened():
        ret, frame = capture.read()
        pressed_key = cv2.waitKey(1) 

        if pressed_key & 0xFF == ord('q'): #quit
            break
        elif pressed_key & 0xFF == ord('s'): #scan hand
            frame = hp.draw_rect(frame)
            frame = cv2.flip(frame, 1)
            cv2.imshow('Hand-scan', frame)
        else:
            frame = hp.draw_rect(frame)
            frame = cv2.flip(frame, 1)
            cv2.imshow('Rectangles-screen', frame)

    capture.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
