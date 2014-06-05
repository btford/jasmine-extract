var esprima = require('esprima');
var fs = require('fs');

var extract = require('../extract');

var parseAndExtract = function (file, opts) {
  var contents = fs.readFileSync(__dirname + '/input/' + file, 'utf8');
  var ast = esprima.parse(contents, {range: false});
  return extract(ast, opts);
};

describe('extract', function () {
  it('should work', function () {
    var spec = parseAndExtract('basic.js');
    expect(keys(spec.describes)).toEqual(['foo']);
    expect(keys(spec.describes.foo.its)).toEqual(['should have x equal y']);
  });

  // it('should work', function () {
  //   var out = parseAndExtract('basic.js');
  //   console.log(out)
  //   // expect(out).
  //   //     toEqual({ foo: { name: 'foo', describes: { bar: { name: 'bar', describes: {} } } } });
  // });

  // it('extract before blocks', function () {
  //   var out = parseAndExtract('before.js');
  //   console.log(out)
  //   //expect(out).toEqual([]);
  // });
});

function keys (obj) {
  return Object.keys(obj);
}
