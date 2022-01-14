# Student Result Management

## Installation

Use the npm package manager to install all dependencies.

```bash
npm install
```

## Usage

```
    $ node --version
    v8.11.3

    $ npm --version
    6.1.0
```

## APIs

```
 $ /upload - Upload a CSV file and insert into students table

 $ /students/:id/result - Get the result of the student by passing id

 $ /students?resultStatus=passed/failed - get all the students passed/failed by
passing the resultStatus querystring
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
