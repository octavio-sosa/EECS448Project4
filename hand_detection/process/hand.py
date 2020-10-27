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
