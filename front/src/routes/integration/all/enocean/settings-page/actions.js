  import { RequestStatus } from '../../../../../utils/consts';

const actions = store => {
  const actions = {
    async getUsbPorts(state) {
      store.setState({
        getEnoceanUsbPortStatus: RequestStatus.Getting
      });
      try {
        const usbPorts = await state.httpClient.get('/api/v1/service/usb/port');
        store.setState({
          usbPorts,
          getEnoceanUsbPortStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          getEnoceanUsbPortStatus: RequestStatus.Error
        });
      }
    },
    async getCurrentEnoceanDriverPath(state) {
      store.setState({
        getCurrentEnoceanDriverPathStatus: RequestStatus.Getting
      });
      try {
        const enoceanDriverPath = await state.httpClient.get('/api/v1/service/enocean/variable/ENOCEAN_DRIVER_PATH');
        store.setState({
          enoceanDriverPath: enoceanDriverPath.value,
          getCurrentEnoceanDriverPathStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          getCurrentEnoceanDriverPathStatus: RequestStatus.Error
        });
      }
    },
    updateEnoceanDriverPath(state, e) {
      store.setState({
        enoceanDriverPath: e.target.value
      });
    },
    async saveDriverPathAndConnect(state) {
      store.setState({
        connectEnoceanStatus: RequestStatus.Getting,
        enoceanDriverFailed: false
      });
      try {
        await state.httpClient.post('/api/v1/service/enocean/variable/ENOCEAN_DRIVER_PATH', {
          value: state.enoceanDriverPath
        });
        await state.httpClient.post('/api/v1/service/enocean/connect');
        store.setState({
          connectEnoceanStatus: RequestStatus.Success,
          enoceanConnectionInProgress: true
        });
      } catch (e) {
        store.setState({
          connectEnoceanStatus: RequestStatus.Error
        });
      }
    },
    async getInfos(state) {
      store.setState({
        getEnoceanInfos: RequestStatus.Getting
      });
      try {
        const enoceanInfos = await state.httpClient.get('/api/v1/service/enocean/info');
        store.setState({
          enoceanInfos,
          getEnoceanInfos: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          getEnoceanInfos: RequestStatus.Error
        });
      }
    },
    async disconnect(state) {
      store.setState({
        enoceanDisconnectStatus: RequestStatus.Getting
      });
      try {
        await state.httpClient.post('/api/v1/service/enocean/disconnect');
        await actions.getStatus(store.getState());
        store.setState({
          enoceanDisconnectStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          enoceanDisconnectStatus: RequestStatus.Error
        });
      }
    },
    async getStatus(state) {
      store.setState({
        enoceanGetStatusStatus: RequestStatus.Getting
      });
      try {
        const enoceanStatus = await state.httpClient.get('/api/v1/service/enocean/status');
        store.setState({
          enoceanStatus,
          enoceanConnectionInProgress: false,
          enoceanGetStatusStatus: RequestStatus.Success
        });
      } catch (e) {
        store.setState({
          enoceanGetStatusStatus: RequestStatus.Error,
          enoceanConnectionInProgress: false
        });
      }
    },
    driverFailed(state) {
      store.setState({
        enoceanDriverFailed: true,
        enoceanConnectionInProgress: false
      });
    }
  };

  return actions;
};

export default actions;
