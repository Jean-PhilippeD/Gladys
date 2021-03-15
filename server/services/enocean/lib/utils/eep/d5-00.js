const {
    DEVICE_FEATURE_CATEGORIES,
    DEVICE_FEATURE_TYPES,
  } = require('../../../../../utils/constants');
  
  
const d5_00_01 = {
    features: {
        CO: {
            "keep_history": true,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.OPENING_SENSOR,
            "type": DEVICE_FEATURE_TYPES.SENSOR.BINARY,
            "read_only": true
        }
    }
}
  
module.exports = {
    d5_00_01,
}