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
 * newRockerSwitchStatus('0029cdd5', {
        R1: {
            name: 'Rocker 1st action',
            unit: '',
            rawValue: 1,
            value: '1',
            description: 'Button A0: "Switch light off" or "Dim light up" or "Move blind open"'
        }
    });
 */
function newRockerSwitchStatus(senderId, data) {
    logger.debug(`Enocean : New rocker switch data received eep = f6-02-01, senderId = ${senderId}`);

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
    newRockerSwitchStatus,
};
