const RadioERP1 = require('@enocean-js/radio-erp1').RadioERP1
const getEEP = require('@enocean-js/eep-transcoder').getEEP
const logger = require('../../../../utils/logger');
const { EEP } = require('../utils/deviceFeatures');
const { EVENTS, WEBSOCKET_MESSAGE_TYPES } = require('../../../../utils/constants');
const { slugify } = require('../../../../utils/slugify');

/**
 * @description Teach In device when discovered
 * @param {object} data - Data telegram
 * @example
 * enocean.teachIn(data);
 */
async function teachIn(data) {
  logger.debug(`Enocean : Teach in new device ${data.senderId}`)
  const teachInInfo = data.teachInInfo;
  const senderId = data.senderId;
  let ret = RadioERP1.from({ rorg: 0xd4, payload: data.payload })
  ret.senderId = this.baseId + 1;
  ret.destinationId = senderId; // the response needs to be sent directy to the device (no broadcast)
  ret.payload = ret.payload.setValue(1, 0, 1); // bidi
  ret.payload = ret.payload.setValue(1, 2, 2); // teach in successful
  ret.payload = ret.payload.setValue(1, 4, 4); // this is a teach in response
  logger.debug('Enocean : Response: ' + ret.toString());
  await this.sender.send(ret.toString());

  data = data.decode(teachInInfo.eep.toString())
  data = getEEP(teachInInfo.eep.toString())

  
  const device = {
    name: data.title,
    service_id: this.serviceId,
    external_id: senderId,
    selector: `enocean-${senderId}-${teachInInfo.eep.toString()}`,
    model: data.func_title,
    features: []
  };
  
  const deviceFeatures = EEP[teachInInfo.eep.toString()].features;
  if (deviceFeatures === undefined) {
    // device not supported yet
    let description = {eep: teachInInfo.eep.toString(), body: []}
    logger.warn(`Enocean :: Device profile not supported yet, eep = ${teachInInfo.eep.toString()}`)
    data['case'].forEach((c) => {
      c.datafield.forEach((field) => {
        description.body.push(field)
      })
    })
    this.eventManager.emit(EVENTS.WEBSOCKET.SEND_ALL, {
      type: WEBSOCKET_MESSAGE_TYPES.ENOCEAN.UNSUPPORTED_BODY_DEVICE,
      payload: description,
    })
    return
  }
  
  data['case'].forEach((c) => {
    c.datafield.forEach((field) => {
      logger.debug(field)
      const deviceFeature = deviceFeatures[field.shortcut];
      if (!(field.reserved || field.shortcut === 'LRN' || field.shortcut === 'LRNB')) {
        const slugifiedFieldData = slugify(field.data)
        let feature = {
          name: field.data,
          selector: `enocean:${senderId}:${field.shortcut}:${slugifiedFieldData}`,
          external_id: `${senderId}:${field.shortcut}:${slugifiedFieldData}`,
          keep_history: deviceFeature.keep_history,
          has_feedback: deviceFeature.has_feedback,
          category: deviceFeature.category,
          type: deviceFeature.type,
          read_only: deviceFeature.read_only,
          min: 0,
          max: 1
        }
        if (field.scale) {
          feature.min = field.scale.min;
          feature.max = field.scale.max;
        } else if (deviceFeature.min && deviceFeature.max) {
          feature.min = deviceFeature.min;
          feature.max = deviceFeature.max;
        } else if (Array.isArray(field.enum)) {
          feature.min = field.enum.item[0].value;
          feature.max = field.enum.item[field.enum.item.length-1].value;
        }
        if (deviceFeature.unit) feature.unit = deviceFeature.unit;
        const exist = device.features.filter((f) => {
          if (f.selector === feature.selector) return f;
        })
        if (!exist.length) device.features.push(feature)
      }
    })
  })
  console.log(device)
  this.eventManager.emit(EVENTS.WEBSOCKET.SEND_ALL, {
    type: WEBSOCKET_MESSAGE_TYPES.ENOCEAN.NEW_DEVICE,
    payload: device,
  })
}

module.exports = {
  teachIn,
};
