
const logger = require('../../../../utils/logger');

/**
 * @description Dispatch message
 * @example
 * enocean.onMessage();
 */
function onMessage(data) {
  if (data && data.constructor.name === 'RadioERP1') {
    const teachInInfo = data.teachInInfo || {}
    if (!(teachInInfo.senderId in this.devices)) {
      if (data.teachIn) {
        //this.devices[teachInInfo.senderId] = teachInInfo;
        this.teachIn(data)
      } else {
        // unknwon sensor
        logger.debug('Enocean : Received unknown telegram from unknown device')
      }
    } else {
      let senderId = data.senderId;
      let eep = this.devices[data.senderId].eep;
      data = data.decode(eep.toString());
      switch (eep) {
        case 'f6-02-01':
          this.newRockerSwitchStatus(senderId, data);
          break;
        case 'a5-02-05':
          this.newTemperatureValue(senderId, data);
          break;
        case 'a5-07-01':
            this.newMotionValue(senderId, data);
            break;
        case 'd5-00-01':
          this.newContactValue(senderId, data);
          break;
        default:
          logger.info(`Enocean device "${eep}" not handled yet!`);
          break;
      }
    }
  } else {
    logger.debug('Enocean :: Non RadioERP1 data: ' + data.toString())
  }


}

module.exports = {
  onMessage,
};
