import numpy as np
import cv2

def draw_rect(frame):
    rectangles = get_rectangles(frame)
    color = (0, 255, 0)
    thickness = 2

    for i in range(4):
        for j in range(3):
            start_point = tuple(rectangles[i][j][0])
            end_point = tuple(rectangles[i][j][1])
            frame = cv2.rectangle(frame, start_point, end_point, color, thickness)
    return frame

def get_rectangles(frame):
    rows, cols, chans = frame.shape
    center_frame = (int(round(cols/2)), int(round(rows/2)))
    offset = (int(round(cols*0.01)), int(round(rows*0.01)))
    
    start_point = (0,0)
    end_point = (0,0)
    rectangle = [start_point, end_point]

    rectangles = np.array([[rectangle, rectangle, rectangle],
                           [rectangle, rectangle, rectangle],
                           [rectangle, rectangle, rectangle],
                           [rectangle, rectangle, rectangle]])
    r = -12
    for i in range(4):
        c = -8
        for j in range(3):
            center = (center_frame[0] + c*offset[0], center_frame[1] + r*offset[1])
            start_point = (center[0] - offset[0], center[1] - offset[1])
            end_point = (center[0] + offset[0], center[1] + offset[1])
            rectangles[i][j][0] = start_point
            rectangles[i][j][1] = end_point
            c = c+8
        r = r+8

    return rectangles

def get_regionsOfInterest(frame, rectangles):
    hsvFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    width, height = get_rectShape(rectangles)
    rows = rectangles.shape[0]
    cols = rectangles.shape[1]
    channels = 3 

    roi = np.zeros((rows*height, cols*width, channels), dtype=hsvFrame.dtype)

    for r in range(rows):
        rowPix = rectangles[r][0][0][1] #row_r, col_0, start_point, y_coord
        for c in range(cols):
            colPix = rectangles[0][c][0][0] #row_0, col_c, start_point, x_coord

            hsvRect = hsvFrame[rowPix:rowPix+height, colPix:colPix+width]
            roi[r*height:(r+1)*height, c*width:(c+1)*width] = hsvRect

    return roi


def get_rectShape(rectangles):

    one_rectangle = rectangles[0][0]
    startCoord = one_rectangle[0]
    endCoord = one_rectangle[1]
    width = endCoord[0] - startCoord[0]
    height = endCoord[1] - startCoord[1]

    return width, height

def get_handHist(frame, rectangles):
    roi = get_regionsOfInterest(frame, rectangles)

    channels = [0, 1]
    mask = None
    histSize = [180, 256]
    ranges = [0, 180, 0, 256]

    handHist = cv2.calcHist([roi], channels, mask, histSize, ranges)
    
    handHistNorm = cv2.normalize(handHist, None, 0, 255, cv2.NORM_MINMAX)

    return handHistNorm

def get_handImg(frame, handHist):
    frame_hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    hand_mask = cv2.calcBackProject([frame_hsv], [0, 1], handHist, [0, 180, 0, 256], 1)

    # convolute mask with disc kernel
    disc = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (51, 51))
    cv2.filter2D(hand_mask, -1, disc, hand_mask)
    
    # set threshold 
    ret, thresh = cv2.threshold(hand_mask, 175, 255, cv2.THRESH_BINARY)
    thresh = cv2.merge((thresh, thresh, thresh))
    
    # get hand img
    hand_img = cv2.bitwise_and(frame, thresh) 

    return hand_img
