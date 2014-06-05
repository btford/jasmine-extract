var esprima = require('esprima');
var fs      = require('fs');
var extract = require('../extract');

describe('extract', function () {
  it('should work with a simple spec', function () {
    var spec = parseAndExtract('basic.js');
    expect(keys(spec.describes)).toEqual(['foo']);
    expect(keys(spec.describes.foo.its)).toEqual(['should have x equal y']);
  });

  it('should work with nested describes', function () {
    var spec = parseAndExtract('nested-describe.js');
    expect(keys(spec.describes)).toEqual(['foo']);
    expect(keys(spec.describes.foo.describes)).toEqual(['bar']);
  });

  it('should work with beforeEach blocks', function () {
    var spec = parseAndExtract('before-each.js');
    expect(keys(spec.describes)).toEqual(['foo']);
    expect(keys(spec.describes.foo.its)).toEqual(['should be great']);
    expect(spec.describes.foo.beforeEach.length).toBe(1);
  });

  it('should work with afterEach blocks', function () {
    var spec = parseAndExtract('after-each.js');
    expect(keys(spec.describes)).toEqual(['foo']);
    expect(spec.describes.foo.afterEach.length).toBe(1);
  });

  it('extract statements before jasmine blocks', function () {
    var spec = parseAndExtract('before.js');
    expect(spec.before.length).toBe(1);
  });
});

function parseAndExtract (file, opts) {
  var contents = fs.readFileSync(__dirname + '/input/' + file, 'utf8');
  var ast = esprima.parse(contents, {range: false});
  return extract(ast, opts);
}

function keys (obj) {
  return Object.keys(obj);
}
