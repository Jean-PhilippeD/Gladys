const logger = require('../../../../../utils/logger');
const {
    EVENTS
  } = require('../../../../../utils/constants');
const { slugify } = require('../../../../../utils/slugify');


/**
 * @description New value received from A5-07-01 motion sensor
 * @param {String} senderId - senderId.
 * @param {Object} data - Data received.
 * @example
 * newMotionValue('0029cdd5', {
        {
            name: 'PIR Status',
            unit: '',
            rawValue: 255,
            min: '128',
            max: '255',
            description: 'PIR on',
            value: 255
        }
    });
 */
function newMotionValue(senderId, data) {
    logger.debug(`Enocean : New motion sensor data received eep = a5-07-01, senderId = ${senderId}`);

    for (let key in data) {
        if (key === 'LRNB') continue;
        const name = slugify(data[key].name)
        const external_id = `${senderId}:${key}:${name}`
        let value = data[key].value
        if (key === 'PIRS') {
            value >= 128 ? value = 1 : value = 0;
        }
        // emit new value
        this.eventManager.emit(EVENTS.DEVICE.NEW_STATE, {
            device_feature_external_id: external_id,
            state: value
        });
  }
}

module.exports = {
    newMotionValue,
};
