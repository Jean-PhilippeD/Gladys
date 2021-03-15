const logger = require('../../../../utils/logger');

/**
 * @description Retreive  Enocean devices known in Gladys
 * @example
 * enocean.getDevices();
 */
async function getDevices() {
  logger.debug(`Enocean : Fetching known devices with service ${this.serviceId}...`)
  const devices = await this.gladys.device.get()
  devices.forEach((device) => {
    const items = device.selector.split('-');
    // remove 2 first items so we keep only the eep
    items.shift(); 
    items.shift(); 
    const eep = items.join('-');
    this.devices[device.external_id] = {eep: eep};
  })
}

module.exports = {
  getDevices,
};
