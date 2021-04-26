# Dumb-DB

The dumbest db you'll ever see

## Installation

```sh
npm install --save dumb-db
```

## Usage

```js
const DumbDB = require('dumb-db');

const db = new DumbDB('dumb-database'); // can be set to any filename/path (even none)

db.save('my money', 0);     // based on a true story
db.save('my money', 20);    // got money (somehow)
db.get('my money');         // 20
```

## Documentation

### DumbDB Class

#### save

Saves JSON data to a specific key

```js
db.save(key, data); // key:string, data:any (has to be stringifyable with JSON)
// returns boolean (successful or not)
```

#### get

Gets the data of a key

```js
db.get(key); // key:string
// returns any (undefined if not available)
```

#### has

Checks if key exists

```js
db.has(key); // key:string
// returns boolean (if it exists or not)
```

#### fetch

Fetches the entire database

```js
db.fetch();
// returns Object ({key1: data, key2: data})
```

#### clean

Cleans up the database (less storage usage)

```js
db.clean();
```

#### path

Gives the path to the database file

```js
db.path();
// returns string (path of file)
```

#### filename (static)

Helper function for generating a path to file (not required)

```js
DumbDB.filename(file); // file:string (relative (to cwd) or absolute path to file)
// returns string (path to file)
// default: "{cwd}/db.dumb"
```

#### parseSingle (static)

Parses a dumb string into usable data (not required)

```js
DumbDB.parseSingle(data, parse) // data:string, parse:boolean (if true, JSON.parse-s the data)
```
