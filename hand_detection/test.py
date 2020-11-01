import numpy as np
import cv2
import process.hand as hp

def viewArrSizes():
    roi = np.zeros([90,10,3]) #90 matrices of size 10 rows x 3 cols
    print(roi)

def viewROI():
    capture = cv2.VideoCapture(0)

    while capture.isOpened():
        ret, frame = capture.read()
        pressed_key = cv2.waitKey(1)

        if pressed_key & 0xFF == ord('q'):
            break
        elif pressed_key & 0xFF == ord('s'):
            rectangles = hp.get_rectangles(frame)
            roi = hp.get_regionsOfInterest(frame, rectangles)

            handImg = cv2.cvtColor(roi, cv2.COLOR_HSV2BGR)
            cv2.imshow('handPix', handImg) 

            cv2.waitKey()
            break
        else:
            frame = hp.draw_rect(frame)
            cv2.imshow('Rectangles-screen', frame)

    capture.release()
    cv2.destroyAllWindows()
    
def getPixelShape(rectangles):
    one_rectangle = rectangles[0][0]
    startCoord = one_rectangle[0]
    endCoord = one_rectangle[1]

    return (startCoord, endCoord)

def viewHandImg():
    capture = cv2.VideoCapture(0)

    while capture.isOpened():
        ret, frame = capture.read()
        pressed_key = cv2.waitKey(1)

        if pressed_key & 0xFF == ord('q'):
            break
        elif pressed_key & 0xFF == ord('s'):
            rectangles = hp.get_rectangles(frame)
            handHist = hp.get_handHist(frame, rectangles)
            while True:
                handImg = hp.getHandImg(frame, handHist)
                cv2.imshow('Hand', handImg) 
                ret, frame = capture.read()
                pressed_key = cv2.waitKey(1)
                if pressed_key & 0xFF == ord('q'):
                    capture.release()
                    break
        else:
            frame = hp.draw_rect(frame)
            frame = cv2.flip(frame, 1)
            cv2.imshow('Hand-scan', frame)

    capture.release()
    cv2.destroyAllWindows()

def viewContours():
    capture = cv2.VideoCapture(0)

    while capture.isOpened():
        ret, frame = capture.read()
        pressed_key = cv2.waitKey(1)

        if pressed_key & 0xFF == ord('q'):
            break
        elif pressed_key & 0xFF == ord('s'):
            rectangles = hp.get_rectangles(frame)
            handHist = hp.get_handHist(frame, rectangles)
            while True:
                handImg = hp.getHandImg(frame, handHist)
                contours = hp.getContours(handImg)
                largestContour = max(contours, key=cv2.contourArea) #hand outline
                cv2.drawContours(frame, largestContour, -1, [0, 255, 0], 3)
                handCentroid = hp.getCentroid(largestContour)

                #draw handCentroid
                radius = 5
                centroidColor = [255, 0, 0] 
                lineThickness = -1 #fill circle with -1 value
                cv2.circle(frame, handCentroid, radius, centroidColor, lineThickness)
                #cv2.drawContours(frame, contours, -1, [0, 0, 255], 3)
                cv2.imshow('Contours', frame)
                ret, frame = capture.read()
                pressed_key = cv2.waitKey(1)
                if pressed_key & 0xFF == ord('q'):
                    capture.release()
                    break
        else:
            frame = hp.draw_rect(frame)
            frame = cv2.flip(frame, 1)
            cv2.imshow('Hand-scan', frame)

    capture.release()
    cv2.destroyAllWindows()

def viewPOI():
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
        elif isHandHist:
            frame = hp.drawPOI(frame, handHist)
        else:
            frame = hp.draw_rect(frame)
            frame = cv2.flip(frame, 1)

        cv2.imshow('Live', frame)

    capture.release()
    cv2.destroyAllWindows()

def run():
    #viewROI()
    #viewHandImg()
    viewContours()
    #viewPOI()

run()


