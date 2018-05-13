### Result

|| Testname      | Description   |
| ------------- |:-------------:| 
| bigJson       | 100kb json to clen the effect of caching | 
| clearLocalCache | Small random json to clean effect of caching|
| inOrderTest   | Schedule jobs in parallel and serilize order  |
| nodeBatch | Add proxy to improve serverless performance  | 
| separateCatalogue | Separate serverless into three components | 


|Concurrence | Average | Slowest |
| ------------- |:-------------:|:-------------:| 
|5|0.1765|0.2145|
|10|0.1699|0.2832|
|15|0.169|0.3118|
|20|0.181|0.3144|
|25|0.1768|0.3287|
|30|0.2277|0.4288|
|35|0.2354|0.4387|
|40|0.211|0.404|
|45|0.2368|0.4726|
|50|0.2778|0.5641|
|55|0.3223|0.5535|
|60|0.3128|0.5045|
|65|0.3303|0.6566|
|70|0.3749|0.7206|
|75|0.3893|0.7327|
|80|0.3935|0.7574|
|85|0.4217|0.8341|
|90|0.4982|0.7938|
|95|0.4821|0.7829|
|100|0.5099|0.8021|