import { Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../actions';
import EnoceanPage from '../EnoceanPage';
import TeachInTab from './TeachInTab';
import { WEBSOCKET_MESSAGE_TYPES } from '../../../../../../../server/utils/constants';

@connect('user,session,httpClient,housesWithRooms,discoveredDevices,unsupportedDevices,manualTeachInDeviceBox,manuallyTeachableDevices,manuallyTeachInDevice', actions)
class EnoceanTeachInPage extends Component {
  async componentWillMount() {
    this.props.getHouses();
    this.props.getIntegrationByName('enocean');
    this.props.session.dispatcher.addListener(
      WEBSOCKET_MESSAGE_TYPES.ENOCEAN.NEW_DEVICE,
      this.props.addDiscoveredDevice
    );
    this.props.session.dispatcher.addListener(
      WEBSOCKET_MESSAGE_TYPES.ENOCEAN.UNSUPPORTED_BODY_DEVICE,
      this.props.addUnsupportedDevice
    );
  }


  render(props) {
    return (
      <EnoceanPage user={props.user}>
        <TeachInTab {...props} />
      </EnoceanPage>
    );
  }
}

export default EnoceanTeachInPage;
