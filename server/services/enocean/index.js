const logger = require('../../utils/logger');
const EnoceanManager = require('./lib');
const EnoceanController = require('./api/enocean.controller');
const { ServiceNotConfiguredError } = require('../../utils/coreErrors');

module.exports = function EnoceanService(gladys, serviceId) {
  const enoceanManager = new EnoceanManager(gladys, gladys.event, serviceId);
  /**
   * @public
   * @description This function starts the service
   * @example
   * gladys.services.enocean.start();
   */
  async function start() {
    logger.info('Starting enocean service');
    const enoceanDriverPath = await gladys.variable.getValue('ENOCEAN_DRIVER_PATH', serviceId);
    if (!enoceanDriverPath) {
      throw new ServiceNotConfiguredError('ENOCEAN_DRIVER_PATH_NOT_FOUND');
    }
    await enoceanManager.getDevices();
    enoceanManager.connect(enoceanDriverPath);
  }

  /**
   * @public
   * @description This function stops the service
   * @example
   * gladys.services.zwave.stop();
   */
  async function stop() {
    logger.log('stopping enocean service');
    //
  }

  return Object.freeze({
    start,
    stop,
    device: enoceanManager,
    controllers: EnoceanController(gladys, enoceanManager, serviceId),
  });
};
