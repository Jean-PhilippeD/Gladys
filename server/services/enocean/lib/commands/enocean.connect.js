const SerialPort = require('serialport');
const os = require('os');
const SerialportSender = require('@enocean-js/serialport-sender').SerialportSender;
const Commander = require('@enocean-js/common-command').Commander
const logger = require('../../../../utils/logger');

/**
 * @description Connect to Enocean USB device
 * @param {string} driverPath - Path to the USB device.
 * @example
 * enocean.connect(driverPath);
 */
async function connect(driverPath) {
  logger.debug(`Enocean : Connecting to USB = ${driverPath}`);
  // special case for macOS
  if (os.platform() === 'darwin') {
    this.driverPath = driverPath.replace('/dev/tty.', '/dev/cu.');
  } else {
    this.driverPath = driverPath;
  }
  this.ready = false;
  try{
    this.port = new SerialPort(this.driverPath, { baudRate: 57600 });
    this.sender = SerialportSender({ port: this.port, parser: this.parser })
    this.port.pipe(this.parser).pipe(this.transformer)

    this.commander = new Commander(this.sender)
    this.connected = true;
    this.commander.getIdBase()
    .then((res) => {
      this.baseId = parseInt(res.baseId.toString(), 16)
    })
    // setup all events listener
    this.port.on('open', this.driverReady.bind(this));
    this.port.on('error', this.driverFailed.bind(this));
    this.port.on('disconnect', this.connect.bind(this));
    this.transformer.on('data', this.onMessage.bind(this)) //this.onMessage.bind(this));

  }catch(err) {
    return this.driverFailed();
  }
}

module.exports = {
  connect,
};
