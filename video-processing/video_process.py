# Image processing by sample strategy.
import cv2
import glob
import boto3
import os 

s3 = boto3.client('s3')

def video_transfer(videoname):
	# Transfer video to image.
	vidcap = cv2.VideoCapture(videoname)
	success = True
	count = 0
	success, image = vidcap.read()
	while success:
		# Sample rate: one frame per second.
		vidcap.set(cv2.CAP_PROP_POS_MSEC, count * 1000)
		cv2.imwrite("frame%d.jpg" % count, image)
		success, image = vidcap.read()
		count += 1
		print(success)

def upload_to_s3():
	# Get the name of file 
	filelist = glob.glob("*.jpg")
	bucket_name = 'cs5412'
	for fd in filelist:
		s3.upload_file(fd, bucket_name, fd)
	
	# Delete all middle files 
	os.system("rm frame*")

if __name__ == "__main__":
	video_transfer('IMG_4944.mp4')
	upload_to_s3()