
const ESP3Parser = require('@enocean-js/serialport-parser').ESP3Parser;
const ESP3Transformer = require('@enocean-js/esp3-transformer').ESP3Transformer;

// EVENTS
const { driverReady } = require('./events/enocean.driverReady');
const { driverFailed } = require('./events/enocean.driverFailed');
const { onMessage } = require('./events/enocean.onMessage');

// COMMANDS
const { disconnect } = require('./commands/enocean.disconnect');
const { connect } = require('./commands/enocean.connect');
const { teachIn } = require('./commands/enocean.teachIn');
const { manualTeachIn } = require('./commands/enocean.manualTeachIn');
const { taughtIn } = require('./commands/enocean.taughtIn');
const { getInfos } = require('./commands/enocean.getInfos');
const { getDevices } = require('./commands/enocean.getDevices');
const { getManuallyTeachableDevices } = require('./commands/enocean.getManuallyTeachableDevices');
const { setValue } = require('./commands/enocean.setValue');


const { newRockerSwitchStatus } = require('./events/eep/f6-02');
const { newTemperatureValue } = require('./events/eep/a5-02');
const { newMotionValue } = require('./events/eep/a5-07');
const { newContactValue } = require('./events/eep/d5-00');


const EnoceanManager = function EnoceanManager(gladys, eventManager, serviceId) {
  this.gladys = gladys;
  this.eventManager = eventManager;
  this.serviceId = serviceId;
  this.devices = {};
  this.connected = false;
  this.port = null;
  this.sender = null;
  this.commander = null;
  this.transformer = new ESP3Transformer();
  this.parser = new ESP3Parser();
  this.learning = false;
  this.baseId = false;
};

// EVENTS
EnoceanManager.prototype.driverReady = driverReady;
EnoceanManager.prototype.driverFailed = driverFailed;
EnoceanManager.prototype.onMessage = onMessage;
EnoceanManager.prototype.newRockerSwitchStatus = newRockerSwitchStatus;
EnoceanManager.prototype.newTemperatureValue = newTemperatureValue;
EnoceanManager.prototype.newMotionValue = newMotionValue;
EnoceanManager.prototype.newContactValue = newContactValue;

// COMMANDS
EnoceanManager.prototype.connect = connect;
EnoceanManager.prototype.disconnect = disconnect;
EnoceanManager.prototype.manualTeachIn = manualTeachIn;
EnoceanManager.prototype.teachIn = teachIn;
EnoceanManager.prototype.taughtIn = taughtIn;
EnoceanManager.prototype.getInfos = getInfos;
EnoceanManager.prototype.getDevices = getDevices;
EnoceanManager.prototype.getManuallyTeachableDevices = getManuallyTeachableDevices;
EnoceanManager.prototype.setValue = setValue;

module.exports = EnoceanManager;
