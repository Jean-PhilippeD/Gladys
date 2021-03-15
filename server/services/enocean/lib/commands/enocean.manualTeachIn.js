const RadioERP1 = require('@enocean-js/radio-erp1').RadioERP1
const logger = require('../../../../utils/logger');

/**
 * @description Learn manually the device while you set learn state on Enocean USB device, the learn stop itself after a while
 * @param {object} data - Data telegram
 * @example
 * enocean.manualTeachIn(data);
 */
async function manualTeachIn(data) {
  logger.debug(`Enocean : Manual teach in new device ${data.external_id}`)
  // We build a virtual button having the id of the device we wann control + 1 being the buttonId
  const btn = RadioERP1.from({ rorg: 'f6', payload: [0], id: parseInt(data.external_id, 16) + 1 })

  // Button A1 Down: Teach In
  btn.payload = btn.encode({ R1: 1, EB: 1 }, { eep: 'f6-02-01', status: 0x30 })
  await this.sender.send(btn.toString())
  // release
  btn.payload = btn.encode({ R1: 0, EB: 0 }, { eep: 'f6-02-01', status: 0x20 })
  await this.sender.send(btn.toString())
}

module.exports = {
  manualTeachIn,
};
