const {
    DEVICE_FEATURE_CATEGORIES,
    DEVICE_FEATURE_TYPES,
    DEVICE_FEATURE_UNITS,
  } = require('../../../../../utils/constants');
  
  
const a5_07_01 = {
    features: {
        PIRS: {
            "keep_history": true,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.MOTION_SENSOR,
            "type": DEVICE_FEATURE_TYPES.SENSOR.BINARY,
            "read_only": true
        },
        SVC: {
            "keep_history": false,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.BATTERY,
            "type": DEVICE_FEATURE_TYPES.BATTERY.INTEGER,
            "read_only": true
        },
        SVA: {
            "keep_history": false,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.SWITCH,
            "type": DEVICE_FEATURE_TYPES.SWITCH.BINARY,
            "read_only": true
        }
    }
}
  
module.exports = {
    a5_07_01,
}