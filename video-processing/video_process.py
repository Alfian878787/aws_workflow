# Image processing by sample strategy.
import cv2
vidcap = cv2.VideoCapture('IMG_4944.mp4')
success = True
count = 0
success, image = vidcap.read()
while success:
	vidcap.set(cv2.CAP_PROP_POS_MSEC, count * 1000)
	cv2.imwrite("frame%d.jpg" % count, image)
	success, image = vidcap.read()
	count += 1
	print(success)

