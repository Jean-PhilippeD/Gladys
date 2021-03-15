const logger = require('../../../../utils/logger');
const { EEP } = require('../utils/deviceFeatures');

/**
 * @description Return all manually teachable devices
 * @example
 * enocean.getManuallyTeachableDevices();
 */
async function getManuallyTeachableDevices() {
  let devices = [];
  for (let eep in EEP) {
    if (EEP[eep].teachable) {
      let device = {
        name: EEP[eep].name,
        model: EEP[eep].model,
        eep: eep,
        features: [],
        service_id: this.serviceId,
      }
      for (let key in EEP[eep].features) {
        EEP[eep].features[key].shortcut = key;
        device.features.push(EEP[eep].features[key])
      }
      devices.push(device)
    }
  }
  return devices
}

module.exports = {
  getManuallyTeachableDevices,
};
