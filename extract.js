module.exports = function (block) {
  return extractBlocksFromBody(block.body);
};

var getDescribeBlocks   = getTypeofBlock('describe');
var getItBlocks         = getTypeofBlock('it');
var getAfterEachBlocks  = getTypeofBlock('afterEach');
var getBeforeEachBlocks = getTypeofBlock('beforeEach');

function extractBlocksFromBody (body) {
  body = body instanceof Array ? body : [body];
  return {
    before     : extractBeforeBlocks(body),
    beforeEach : extractBeforeEachBlocks(body),
    afterEach  : getAfterEachBlocks(body),
    its        : extractItBlocks(body),
    describes  : extractDescribeBlocks(body)
  };
}

function extractDescribeBlocks (body) {
  var blocks = getDescribeBlocks(body);

  return blocks.reduce(function (acc, block) {
    acc[getBlockName(block)] = extractBlocksFromBody(getBlockBody(block));
    return acc;
  }, {});
}

function extractItBlocks (body) {
  return getItBlocks(body).
      reduce(function (acc, block) {
        acc[getBlockName(block)] = extractItBlock(block);
        return acc;
      }, {});
}

function extractItBlock (block) {
  return {
    name: getBlockName(block),
    body: getBlockBody(block)
  };
}

function extractBeforeBlocks (body) {
  var blocks = [];
  body.some(function (block) {
    return isTypeofBlock('it')(block) ||
        isTypeofBlock('describe')(block) ||
        (blocks.push(block), false);
  });
  return blocks;
}

function extractBeforeEachBlocks (body) {
  return getBeforeEachBlocks(body);
}

function getTypeofBlock (type) {
  var proposition = isTypeofBlock(type);
  return function (body) {
    return body ? body.filter(proposition) : [];
  };
}

function getBlockName (block) {
  return block.expression.arguments[0].value;
}

function getBlockBody (block) {
  var body = block.expression.arguments[1].body;
  return body.body || body;
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
