const {
    DEVICE_FEATURE_CATEGORIES,
    DEVICE_FEATURE_TYPES,
    DEVICE_FEATURE_UNITS,
  } = require('../../../../../utils/constants');
  
  
const a5_02_05 = {
    features: {
        TMP: {
            "keep_history": true,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.TEMPERATURE_SENSOR,
            "type": DEVICE_FEATURE_TYPES.SENSOR.DECIMAL,
            "read_only": true,
            "unit": DEVICE_FEATURE_UNITS.CELSIUS
        }
    }
}
  
module.exports = {
    a5_02_05,
}