
const { f6_02_01 } = require('./eep/f6-02');
const { a5_02_05 } = require('./eep/a5-02');
const { a5_07_01 } = require('./eep/a5-07');
const { d5_00_01 } = require('./eep/d5-00');
const { d2_01_0f } = require('./eep/d2-01');

const EEP = {
  "f6-02-01": f6_02_01,
  "a5-02-05": a5_02_05,
  "a5-07-01": a5_07_01,
  "d5-00-01": d5_00_01,
  "d2-01-0f": d2_01_0f
}

module.exports.EEP = EEP;
