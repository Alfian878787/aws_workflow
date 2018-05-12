# This script generates random scocial networking.
from math import floor
from random import random
import json

# Seed data here.
Candidate = ["Abbey", "Mikey", "Randomy", "Closs", "Bob", "Robert", "Ray", "Hash", "Rocky", "Led", "Staler", "Gates", "Grabby", "Flowy"]

links = []
# Result for lambda function
relationship = {}
count = 0

# Init relationship.
for i in range(len(Candidate)):
	relationship[Candidate[i]] = []

for i in range(len(Candidate)):
	while count < 2:
		rand = floor(random()*len(Candidate))
		if rand != i and Candidate[rand] not in relationship[Candidate[i]]:
			count += 1
			relationship[Candidate[i]].append(Candidate[rand])
			relationship[Candidate[rand]].append(Candidate[i])
			links.append([i,rand])
	count = 0

# Result for client data.


print(relationship)
print(links)

jsonRes = {"nodes":[], "links":[]}
for i in range(len(Candidate)):
	jsonRes["nodes"].append({"name":Candidate[i]})

for i in range(len(links)):
	jsonRes["links"].append({"source":links[i][0],"target":links[i][1]})

print(json.dumps(jsonRes))

