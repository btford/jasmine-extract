# jasmine-extract [![Build Status](https://travis-ci.org/btford/jasmine-extract.svg?branch=master)](https://travis-ci.org/btford/jasmine-extract) [![Code Climate](https://codeclimate.com/github/btford/jasmine-extract.png)](https://codeclimate.com/github/btford/jasmine-extract)

extract jasmine specs so you can add them to your docs

## Install

```shell
npm install jasmine-extract
```

### Usage

Requires [esprima](http://esprima.org/).

Takes an AST, returns an object corresponding to the test structure:

```javascript
var esprima = require('esprima');
var fs      = require('fs');
var extract = require('extract');


var contents = fs.readFileSync(__dirname + '/input.spec.js', 'utf8');
var ast = esprima.parse(contents);
console.log(extract(ast));

// logs this:
//
// { before: [],
//   beforeEach: [],
//   its: {},
//   describes:
//    { foo:
//       { before: [Object],
//         beforeEach: [Object],
//         its: [Object],
//         describes: {} } } }
```


## License
MIT
