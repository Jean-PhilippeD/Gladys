const logger = require('../../../../utils/logger');
const { ServiceNotConfiguredError } = require('../../../../utils/coreErrors');

/**
 * @description Getting Enocean informations.
 * @returns {Object} Return Object of informations.
 * @example
 * enocean.getInfos();
 */
function getInfos() {
  logger.debug(this.connected)
  if (!this.connected) {
    throw new ServiceNotConfiguredError('ENOCEAN_DRIVER_NOT_RUNNING');
  }
  logger.debug(`Enocean : Getting informations...`);
  const info = {
    baseId: this.baseId
  };

  return info;
}

module.exports = {
  getInfos,
};
