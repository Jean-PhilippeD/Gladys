const logger = require('../../../../utils/logger');

/**
 * @description Disconnect the Enocean USB device
 * @example
 * enocean.disconnect();
 */
async function disconnect() {
  logger.debug(`Enocean : Disconnecting USB device`);
  this.port.close((err) => logger.debug(`Enocean: Port closed`))
  this.ready = false;
}

module.exports = {
  disconnect,
};
