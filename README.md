## Requirements
* Node.js version >= 6.0

## Example
```
node . --url=http://google.se/humans.txt --store=fs
```
> Begins polling http://google.se/humans.txt every 1000 millis.
> Will be stored in fs.
> Requests timeout after 5000 millis.
> 
> count: 1 - [ok]
> count: 2 - [ok]
> count: 3 - [ok]
> count: 4 - [ok]
> ^C
> stored
> /path/to/logs/monitor_YYYY-MM-DDTHH:mm:ss.SSSZ.json

```
node . --url=https://github.com/humans.txt --timeout=300
```
> Begins polling https://github.com/humans.txt every 1000 millis.
> Will be stored in console.
> Requests timeout after 300 millis.
> 
> count: 1 - [fail]
> count: 2 - [fail]
> count: 3 - [fail]
> ^C
> stored
> {
>   "count": 3,
>   "errors": [
>     "Error: ETIMEDOUT",
>     "Error: ETIMEDOUT",
>     "Error: ETIMEDOUT"
>   ]
> }

```
node . --url=invalidurl
```
> Unexpected error occured, see result. Shutting down
> count: 1 - [fail]
> stored
> {
> 	"count": 1,
> 		"errors": [
> 			"Error: Invalid URI \"invalidurl\""
> 		]
> }
