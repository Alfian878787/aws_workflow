# Hadoop cluster based on docker

Build the image
```
docker build  -t sequenceiq/hadoop-docker:2.7.1 .
```

Start the image
```
docker run -it sequenceiq/hadoop-docker:2.7.1 /etc/bootstrap.sh -bash
```

Change hosts configuration to map on multiple instances.