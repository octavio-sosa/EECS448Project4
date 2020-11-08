def getHandData():
    fileName = r'./hand_detection/handData.txt'
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
