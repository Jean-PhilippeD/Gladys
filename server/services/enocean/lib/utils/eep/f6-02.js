const {
    DEVICE_FEATURE_CATEGORIES,
    DEVICE_FEATURE_TYPES,
    DEVICE_FEATURE_UNITS,
  } = require('../../../../../utils/constants');
  
  
  const f6_02_01 = {
    features : {
        "R1": {
            "keep_history": false,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.SWITCH,
            "type": DEVICE_FEATURE_TYPES.SWITCH.DIMMER,
            "read_only": true
        },
        "R2": {
            "keep_history": false,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.SWITCH,
            "type": DEVICE_FEATURE_TYPES.SWITCH.DIMMER,
            "read_only": true
        },
        "EB": {
            "keep_history": false,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.BUTTON,
            "type": DEVICE_FEATURE_TYPES.BUTTON.CLICK,
            "read_only": true
        },
        "SA": {
            "keep_history": false,
            "has_feedback": false,
            "category": DEVICE_FEATURE_CATEGORIES.SWITCH,
            "type": DEVICE_FEATURE_TYPES.SWITCH.BINARY,
            "read_only": true
        }
    }
}
  
module.exports = {
    f6_02_01,
}