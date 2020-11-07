def getHandData():
    fileName = r'/Users/sosa/Documents/software_projects/nodeServer/static/py/hand_detection/handData.txt'
    fileData = open(fileName, 'r')
    data = fileData.readline()
    fileData.close()

    print(data)

getHandData()
"""
def main():
    while True:
        getHandData()

if __name__ == '__main__':
    main()
"""
