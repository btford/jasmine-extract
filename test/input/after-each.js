// FYI: this is a test jasmine-extract parses

describe('foo', function () {
  var x = { y: [] };

  afterEach(function () {
    delete x.y;
  });

  it('should be great', function () {
    expect(x).toBe(y);
  });
});
