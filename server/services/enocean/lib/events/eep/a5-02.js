const logger = require('../../../../../utils/logger');
const {
    EVENTS
  } = require('../../../../../utils/constants');
const { slugify } = require('../../../../../utils/slugify');


/**
 * @description New value received from F6-02-01 Rocker switch.
 * @param {String} senderId - senderId.
 * @param {Object} data - Data received.
 * @example
 * newTemperatureValue('0029cdd5', {
        TMP: {
            name: 'Temperature',
            rawValue: 70,
            value: 29.019607843137255,
            range: { min: '255', max: '0' },
            scale: { min: '0', max: '+40' },
            unit: '°C'
        }

    });
 */
function newTemperatureValue(senderId, data) {
    logger.debug(`Enocean : New temperature sensor data received eep = a5-02-05, senderId = ${senderId}`);

    for (let key in data) {
        if (key === 'LRNB') continue;
        const name = slugify(data[key].name)
        const external_id = `${senderId}:${key}:${name}`

        // emit new value
        this.eventManager.emit(EVENTS.DEVICE.NEW_STATE, {
            device_feature_external_id: external_id,
            state: data[key].value
        });
  }
}

module.exports = {
    newTemperatureValue,
};
