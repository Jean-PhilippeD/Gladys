const RadioERP1 = require('@enocean-js/radio-erp1').RadioERP1
const logger = require('../../../../utils/logger');

/**
 * @description Set value.
 * @param {Object} device - The device to control.
 * @param {Object} deviceFeature - The feature to control.
 * @param {Object} state - The new state.
 * @example
 * enocean.setValue();
 */
 async function setValue(device, deviceFeature, state) {
  const enoceanId = device.external_id.split(':')[0]

  const btn = RadioERP1.from({ rorg: 'f6', payload: [0], id: parseInt(enoceanId, 16) + 1 })

  // Button AI or A0 down
  btn.payload = btn.encode({ R1: state === 0 ? 1 : 0, EB: 1 }, { eep: 'f6-02-01', status: 0x30 })
  await this.sender.send(btn.toString())
  // release
  btn.payload = btn.encode({ R1: 0, EB: 0 }, { eep: 'f6-02-01', status: 0x20 })
  await this.sender.send(btn.toString())


}

module.exports = {
  setValue,
};
