const logger = require('../../../../utils/logger');
const { EVENTS, WEBSOCKET_MESSAGE_TYPES } = require('../../../../utils/constants');

/**
 * @description When the driver is ready.
 * @example
 * enocean.on('connect', this.driverReady);
 */
function driverReady() {
  logger.debug(`Enocean : Driver is ready.`);
  this.ready = true;
  this.eventManager.emit(EVENTS.WEBSOCKET.SEND_ALL, {
    type: WEBSOCKET_MESSAGE_TYPES.ENOCEAN.DRIVER_READY,
    payload: {},
  });
}

module.exports = {
  driverReady,
};
