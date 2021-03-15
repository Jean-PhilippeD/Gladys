import { Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from './actions';
import EnoceanPage from '../EnoceanPage';
import SettingsTab from './SettingsTab';
import { RequestStatus } from '../../../../../utils/consts';
import { WEBSOCKET_MESSAGE_TYPES } from '../../../../../../../server/utils/constants';

@connect(
  'user,session,usbPorts,enoceanInfos,enoceanDriverPath,enoceanStatus,getEnoceanUsbPortStatus,getCurrentEnoceanDriverPathStatus,enoceanGetStatusStatus,enoceanDriverFailed,enoceanDisconnectStatus,connectEnoceanStatus,enoceanConnectionInProgress',
  actions
)
class EnoceanSettingsPage extends Component {
  driverReadyListener = () => this.props.getStatus();
  driverFailedListener = () => this.props.driverFailed();

  componentWillMount() {
    this.props.getUsbPorts();
    this.props.getInfos();
    this.props.getStatus();
    this.props.getCurrentEnoceanDriverPath();
    this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.ENOCEAN.DRIVER_READY, this.driverReadyListener);
    this.props.session.dispatcher.addListener(WEBSOCKET_MESSAGE_TYPES.ENOCEAN.DRIVER_FAILED, this.driverFailedListener);
  }

  componentWillUnmount() {
    this.props.session.dispatcher.removeListener(WEBSOCKET_MESSAGE_TYPES.ENOCEAN.DRIVER_READY, this.driverReadyListener);
    this.props.session.dispatcher.removeListener(
      WEBSOCKET_MESSAGE_TYPES.ENOCEAN.DRIVER_FAILED,
      this.driverFailedListener
    );
  }

  render(props, {}) {
    const loading =
      props.getEnoceanUsbPortStatus === RequestStatus.Getting ||
      props.getCurrentEnoceanDriverPathStatus === RequestStatus.Getting ||
      props.enoceanGetStatusStatus === RequestStatus.Getting ||
      props.enoceanDisconnectStatus === RequestStatus.Getting ||
      props.connectEnoceanStatus === RequestStatus.Getting;

    return (
      <EnoceanPage>
        <SettingsTab {...props} loading={loading} />
      </EnoceanPage>
    );
  }
}

export default EnoceanSettingsPage;
