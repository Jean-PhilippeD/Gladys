const Promise = require('bluebird');

const logger = require('../../../../utils/logger');
const { NotFoundError } = require('../../../../utils/coreErrors');

const { TIMERS } = require('../utils/bluetooth.constants');

/**
 * @description Scan Bluetooth peripherals.
 * @param {boolean} state - Set _true_ to start scanning, default _false_.
 * @param {string} peripheralUuid - Peripheral UUID to look for.
 * @returns {Promise<Object>} Found peripherals by uuid, or single requested peripheral.
 * @example
 * bluetooth.scan(true);
 */
async function scan(state, peripheralUuid = undefined) {
  if (state) {
    if (peripheralUuid) {
      logger.trace(`Bluetooth: scanning for ${peripheralUuid} peripheral`);
    } else {
      logger.trace(`Bluetooth: scanning for all peripherals`);
      this.discoveredDevices = {};
    }

    this.scanCounter += 1;

    if (this.scanPromise && this.scanPromise.isPending()) {
      this.scanPromise.cancel();
    }

    return new Promise((resolve, reject) => {
      const peripherals = {};
      const onDiscover = (peripheral) => {
        peripherals[peripheral.uuid] = peripheral;

        if (peripheralUuid === peripheral.uuid) {
          this.scanCounter -= 1;

          if (this.scanCounter === 0) {
            this.bluetooth.stopScanning();
          }
        }
      };

      const scanStop = () => {
        this.bluetooth.removeListener('discover', onDiscover);

        if (peripheralUuid) {
          if (peripherals[peripheralUuid]) {
            resolve(peripherals[peripheralUuid]);
          } else {
            reject(new NotFoundError(`Bluetooth: peripheral ${peripheralUuid} not found`));
          }
        } else {
          resolve(peripherals);
        }
      };

      this.bluetooth.on('discover', onDiscover);
      this.bluetooth.once('scanStop', scanStop);

      if (!this.scanning) {
        this.bluetooth.startScanning([], true);
      }

      this.scanTimer = Promise.delay(TIMERS.SCAN).then(() => this.bluetooth.stopScanning());
    });
  }

  return this.bluetooth.stopScanningAsync();
}

module.exports = {
  scan,
};
