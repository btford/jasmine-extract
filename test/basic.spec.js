var esprima = require('esprima');
var fs = require('fs');

var extract = require('../extract');

var parseAndExtract = function (file, opts) {
  var contents = fs.readFileSync(__dirname + '/input/' + file, 'utf8');
  var ast = esprima.parse(contents, {range: true});
  return extract(ast, opts);
};

describe('extract', function () {
  // it('should work', function () {
  //   var out = parseAndExtract('basic.js');
  //   expect(out).toEqual({ foo: { name: 'foo', describes: {} } });
  // });

  // it('should work', function () {
  //   var out = parseAndExtract('nested-describe.js');
  //   expect(out).
  //       toEqual({ foo: { name: 'foo', describes: { bar: { name: 'bar', describes: {} } } } });
  // });

  it('extract before blocks', function () {
    var out = parseAndExtract('before.js');
    expect(out).toEqual([]);
  });
});
