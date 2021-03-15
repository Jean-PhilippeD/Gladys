const logger = require('../../../../utils/logger');

/**
 * @description Set the techedIn device in devices list in ram
 * @example
 * enocean.teachedIn(newDevice);
 */
async function taughtIn(newDevice) {
  logger.debug(`Enocean : Puhing device ${newDevice.external_id} to the known devices list...`)
  const items = newDevice.selector.split('-')
  const id = newDevice.external_id;
  items.shift(); 
  items.shift();
  const eep = items.join('-');
  if (id in this.devices) return;
  this.devices[id] = {eep: eep};
}

module.exports = {
  taughtIn,
};
