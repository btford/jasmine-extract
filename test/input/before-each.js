// FYI: this is a test jasmine-extract parses

describe('foo', function () {
  var x, y;

  beforeEach(function () {
    x = 1;
    y = 1;
  });

  it('should be great', function () {
    expect(x).toBe(y);
  });
});
