describe("add", function() {

  it("returns 0 if argument is empty string", function() {
    assert.equal(add(''), 0);
  });

  it("returns number itself if argument is one number", function() {
    assert.equal(add('2'), 2);
  });

  it("returns sum if there are lots of arguments", function() {
    assert.equal(add('2,3,4,3'), 12);
  });

  it("returns sum if there are lots of arguments, works with newline", function() {
    assert.equal(add('2\n3,4,3'), 12);
  });

  it("returns sum if there are lots of arguments, but not with both newline and comma in a row", function() {
    assert.equal(add('1,\n'), 'invalid input');
  });

  it("returns sum, with string having non comma delimiter", function() {
    assert.equal(add('//;\n1;2'), 3);
  });

  it("throws error when there are negative numbers", function() {
    assert.equal(add('12, 14, -8, -17, -33'), 'negatives not allowed -8 -17 -33');
  });
});