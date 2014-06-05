module.exports = function (block) {
  return block.body.reduce(extractBlocks, {});
};

var getDescribeBlocks   = getTypeofBlock('describe');
var getItBlocks         = getTypeofBlock('it');
var getBeforeEachBlocks = getTypeofBlock('beforeEach');

function extractDescribeBlocks (block) {
  return getDescribeBlocks(block.body).
      reduce(extractBlocks, {});
};

function extractBlocks(acc, block) {
  var name = getBlockName(block);
  var body = getBlockBody(block);
  acc[name] = {
    name       : name,
    //block    : block,

    // statements before any other block
    before     : extractBeforeBlocks(body),
    beforeEach : extractBeforeEachBlocks(body),
    its        : extractItBlocks(body),
    describes  : extractDescribeBlocks(body)
  };

  return acc;
}

function extractItBlocks (block) {
  return getDescribeBlocks(block.body).
      reduce(function (acc, block) {
        var name = getBlockName(block);
        acc[name] = {
          name: name,
          body: getBlockBody(block)
        };
        return acc;
      }, {});
}

function extractBeforeBlocks (block) {
  var blocks = [];
  block.body.some(function (block) {
    return isTypeofBlock('it') ||
        isTypeofBlock('describe') ||
        (blocks.push(block), true);
  });
  return blocks;
}

function extractBeforeEachBlocks (block) {
  return getBeforeEachBlocks(block.body);
}

function getTypeofBlock (type) {
  var proposition = isTypeofBlock(type);
  return function (body) {
    return body.filter(proposition);
  };
}

function getBlockName (block) {
  return block.expression.arguments[0].value;
}
function getBlockBody (block) {
  return block.expression.arguments[1].body;
}

function isTypeofBlock (type) {
  return function (line) {
    return isCall(line) && line.expression.callee.name === type;
  };
}

function isCall (line) {
  return line.type === 'ExpressionStatement' &&
         line.expression.type === 'CallExpression'
}
