const userAgent = (navigator && navigator.userAgent || ``).toLowerCase();

function compareVersion(version, range) {
  const string = (range + ``);
  const n = +(string.match(/\d+/) || NaN);
  const op = string.match(/^[<>]=?|/)[0];
  return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
}

const comparator = {
  '<': function (a, b) {
    return a < b;
  },
  '<=': function (a, b) {
    return a <= b;
  },
  '>': function (a, b) {
    return a > b;
  },
  '>=': function (a, b) {
    return a >= b;
  }
};

const isIe = function (range) {
  const match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
  return match !== null && compareVersion(match[1], range);
};

const isSafari = function (range) {
  const match = userAgent.match(/version\/(\d+).+?safari/);
  return match !== null && compareVersion(match[1], range);
};

export {
  isIe,
  isSafari
};
