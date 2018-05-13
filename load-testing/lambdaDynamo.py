# This test meausre maximum latency and average latency
# import os
import subprocess
import re


concurrent = 0
cmd = "hey -c " + str(concurrent) + " -n " + str(concurrent) + " " + targetURL
repeat = 2
# Asynchronization model

for i in range(20,21):
    concurrent = i * 5
    # concurrent = 1
    cmd = "hey -c " + str(concurrent) + " -n " + str(concurrent) + " " + targetURL
    # Run 10 times very loop
    print("==============")
    resAverage = []
    resLatency = []
    for i in range(repeat):
        Input = subprocess.getoutput(cmd)
        resAverage.append(float(Input[88:95].strip()))
        resLatency.append(float(Input[42:49].strip()))
    print("Concurrent: " + str(concurrent)  +" Slowest: " + str(round(sum(resLatency)/repeat,4)) + " Average: " + str(round(sum(resAverage)/repeat,4)))