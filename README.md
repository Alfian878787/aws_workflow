# Workflow for face-detection social network
Video-process -> S3 -> lambda -> Google ML -> S3 -> lambda(Social-Graph) -> Dynamo <br>

Cloud infrastructure list:
    AWS S3
    AWS lambda
    AWS dynamo
    Google ML engine

Todos:
1. Front-end API design (X)
2. Distributed ML Engine
3. End-to-end test 
4. Demo page - d3 social networking graph
5. Load Test

Notes:
1. Video-processing happens in front-end sensor
2. No Final back-end requirement.