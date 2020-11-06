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

def getHandImg(frame, handHist):
    """
    hyper-params to tune: 
        - kernel disc size
        - threshold value
        - rectangle matrix shape
        - color of walls in room where image is taken
        - camera position and type
        - image background
        - hand perspective, orientation, and shape during scan
        - multiple hand scans at different positions
        - scan as much of hand as possible
    """
    frame_hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    hand_mask = cv2.calcBackProject([frame_hsv], [0, 1], handHist, [0, 180, 0, 256], 1)

    # convolute mask with disc kernel
    disc = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41))
    cv2.filter2D(hand_mask, -1, disc, hand_mask)
    
    # set threshold 
    ret, thresh = cv2.threshold(hand_mask, 175, 255, cv2.THRESH_BINARY)
    thresh = cv2.merge((thresh, thresh, thresh))
    
    # get hand img
    handImg = cv2.bitwise_and(frame, thresh) 

    return handImg

def getContours(imgMasked):
    grayHist = cv2.cvtColor(imgMasked, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(grayHist, 0, 255, cv2.THRESH_BINARY)
    #contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE) #original line
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    return contours

def getCentroid(contour):
    moments = cv2.moments(contour)

    x_bar = None
    y_bar = None

    if moments['m00']:
        x_bar = int(moments['m10'] / moments['m00'])
        y_bar = int(moments['m01'] / moments['m00'])

    return x_bar, y_bar

def getFurthestPoint(contourDefects, contour, centroid):
    """ get defect point furthest from centroid
    """
    furthestPoint = None

    if contourDefects.any() and all(centroid): #data-structures have values
        defectsIndices = contourDefects[:, 0][:, 0] # [all_defects, defectData][all_defects, contour_index_of_defectStartpoint]
        x_bar, y_bar = centroid

        x = np.array(contour[defectsIndices][:, 0][:, 0], dtype=np.float) 
        y = np.array(contour[defectsIndices][:, 0][:, 0], dtype=np.float)

        x_sqDev = cv2.pow(cv2.subtract(x, x_bar), 2)
        y_sqDev = cv2.pow(cv2.subtract(y, y_bar), 2)

        distance = cv2.sqrt(cv2.add(x_sqDev, y_sqDev))
        maxDistIndex = np.argmax(distance)

        if maxDistIndex < len(defectsIndices):
            furthestDefect = defectsIndices[maxDistIndex]
            furthestPoint = tuple(contour[furthestDefect][0])

    return furthestPoint

def drawPOI(frame, handHist):
    handImg = getHandImg(frame, handHist)
    contours = getContours(handImg)
    #cv2.drawContours(frame, contours, -1, [0, 255, 0], 3)
    largestContour = max(contours, key=cv2.contourArea) #hand outline
    cv2.drawContours(frame, largestContour, -1, [0, 255, 0], 3)
    handCentroid = getCentroid(largestContour)

    #draw handCentroid
    radius = 10
    centroidColor = [255, 0, 0] 
    lineThickness = -1 #fill circle with -1 value
    cv2.circle(frame, handCentroid, radius, centroidColor, lineThickness)

    if largestContour.any(): 
        #get fingerTipPoint
        handHull = cv2.convexHull(largestContour, returnPoints=False)
        #cv2.drawContours(frame, handHull, -1, [255, 255, 255], 3) #TODO draw handHull
        handDefects = cv2.convexityDefects(largestContour, handHull)
        fingerTipPoint = getFurthestPoint(handDefects, largestContour, handCentroid)

        #draw finger-tip
        if all(fingerTipPoint): #there are valid coordinates
            tipColor = [0, 0, 255]
            cv2.circle(frame, fingerTipPoint, radius, tipColor, lineThickness)

    return frame

def getPOI(frame, handHist):
    handImg = getHandImg(frame, handHist)
    contours = getContours(handImg)

    try: 
        #get handCentroid
        largestContour = max(contours, key=cv2.contourArea) #hand outline
        handCentroid = getCentroid(largestContour)

        #get fingerTipPoint
        if largestContour.any(): #error when largestContour = None
            handHull = cv2.convexHull(largestContour, returnPoints=False)
            handDefects = cv2.convexityDefects(largestContour, handHull)
            fingerTipPoint = getFurthestPoint(handDefects, largestContour, handCentroid)

        data = getHandDict(handCentroid, fingerTipPoint)

    except Exception as error:
        data = {'handCentroid_x': None,
                'handCentroid_y': None,
                'fingerTip_x': None,
                'fingerTip_y': None}

    finally:
        return data

def getHandDict(handCentroid, fingerTip):
    data = {'handCentroid_x': int(handCentroid[0]),
            'handCentroid_y': int(handCentroid[1]),
            'fingerTip_x': int(fingerTip[0]),
            'fingerTip_y': int(fingerTip[1])}

    return data
