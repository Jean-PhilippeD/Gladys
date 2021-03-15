const {
    DEVICE_FEATURE_CATEGORIES,
    DEVICE_FEATURE_TYPES,
  } = require('../../../../../utils/constants');
  
  
const d2_01_0f = {
    teachable: true,
    name: "Electronic switches and dimmers with Energy Measurement and Local Control·Type",
    eep: 'd2-01-0f',
    model: "VLD Telegram",
    features: {
        CMD: {
            keep_history: false,
            has_feedback: false,
            category: DEVICE_FEATURE_CATEGORIES.SWITCH,
            type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
            read_only: false,
            name: "Actuator Set Output",
            min: 0,
            max: 1
        }
    }
}
  
module.exports = {
    d2_01_0f,
}