import update from 'immutability-helper';
import debounce from 'debounce';
import { RequestStatus } from '../../../../utils/consts';
import createActionsIntegration from '../../../../actions/integration';

function createActions(store) {
  const integrationActions = createActionsIntegration(store);
  const actions = {
    async getEnoceanDevices(state) {
      store.setState({
        getEnoceanStatus: RequestStatus.Getting
      });
      try {
        const options = {
          order_dir: state.getEnoceanOrderDir || 'asc'
        };

        const enoceanDevices = await state.httpClient.get('/api/v1/service/enocean/device', options);
        store.setState({
          enoceanDevices,
          getEnoceanStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          getEnoceanStatus: RequestStatus.Error
        });
      }
    },
    async getHouses(state) {
      store.setState({
        housesGetStatus: RequestStatus.Getting
      });
      try {
        const params = {
          expand: 'rooms'
        };
        const housesWithRooms = await state.httpClient.get(`/api/v1/house`, params);
        store.setState({
          housesWithRooms,
          housesGetStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          housesGetStatus: RequestStatus.Error
        });
      }
    },
    updateDeviceField(state, listName, index, field, value) {
      const devices = update(state[listName], {
        [index]: {
          [field]: {
            $set: value
          }
        }
      });
      store.setState({
        [listName]: devices
      });
    },
    updateManualyTeachInDeviceField(state, field, value) {
      const device = update(state.manuallyTeachInDevice, {
        [field]: {
          $set: value
        }
      });
      store.setState({
        manuallyTeachInDevice: device
      });
    },
    updateFeatureProperty(state, listName, deviceIndex, featureIndex, property, value) {
      const devices = update(state[listName], {
        [deviceIndex]: {
          features: {
            [featureIndex]: {
              [property]: {
                $set: value
              }
            }
          }
        }
      });

      store.setState({
        [listName]: devices
      });
    },
    async saveDevice(state, listName, index) {
      const device = state[listName][index];
      const savedDevice = await state.httpClient.post(`/api/v1/device`, device);
      const discoveredDevices = update(state[listName], {
        $splice: [[index, 1]]
      });
      store.setState({
        discoveredDevices: discoveredDevices
      });
      state.httpClient.post(`/api/v1/service/enocean/taughtIn`, savedDevice);
    },
    async saveManuallyTeachInDevice(state) {
      await state.httpClient.post(`/api/v1/device`, state.manuallyTeachInDevice);
      await state.httpClient.post(`/api/v1/service/enocean/manualTeachIn`, state.manuallyTeachInDevice);
      store.setState({
        manuallyTeachInDevice: {},
        manualTeachInDeviceBox: false
      });
    },
    async deleteDevice(state, index) {
      const device = state.enoceanDevices[index];
      if (device.created_at) {
        await state.httpClient.delete(`/api/v1/device/${device.selector}`);
      }
      const enoceanDevices = update(state.enoceanDevices, {
        $splice: [[index, 1]]
      });
      store.setState({
        enoceanDevices
      });
    },
    addDiscoveredDevice(state, newDevice) {
      const existingDevices = state.discoveredDevices || [];
      const newDevices = [];

      let added = false;
      existingDevices.forEach(device => {
        if (device.external_id === newDevice.external_id) {
          newDevices.push(newDevice);
          added = true;
        } else {
          newDevices.push(device);
        }
      });

      if (!added) {
        newDevices.push(newDevice);
      }
      
      store.setState({
        discoveredDevices: newDevices
      });
    },
    addUnsupportedDevice(state, unsupportedDevice) {
      const existingDevices = state.unsupportedDevices || [];
      const unsupportedDevices = [];
      
      let added = false;
      existingDevices.forEach(device => {
        if (device.eep === unsupportedDevice.eep) {
          unsupportedDevices.push(unsupportedDevice);
          added = true;
        } else {
          unsupportedDevices.push(unsupportedDevice);
        }
      });

      if (!added) {
        unsupportedDevices.push(unsupportedDevice);
      }
      store.setState({
        unsupportedDevices: unsupportedDevices
      });
    },
    async showManualTeachInDeviceBox(state) {
      const teachableDevices = await state.httpClient.get(`/api/v1/service/enocean/manuallyTeachableDevices`);
      store.setState({
        manuallyTeachableDevices: teachableDevices,
        manualTeachInDeviceBox: true,
        manuallyTeachInDevice: {}
      });
    },
    hideManualTeachInDeviceBox(state) {
      store.setState({
        manualTeachInDeviceBox: false
      });
    }
  };
  actions.debouncedSearch = debounce(actions.search, 200);

  return Object.assign({}, integrationActions, actions);
}

export default createActions;
