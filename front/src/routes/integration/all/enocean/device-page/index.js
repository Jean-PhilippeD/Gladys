import { Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../actions';
import EnoceanPage from '../EnoceanPage';
import DeviceTab from './DeviceTab';

@connect('user,enoceanDevices,housesWithRooms,getEnoceanStatus', actions)
class EnoceanDevicePage extends Component {
  componentWillMount() {
    this.props.getEnoceanDevices();
    this.props.getHouses();
  }

  render(props, {}) {
    return (
      <EnoceanPage user={props.user}>
        <DeviceTab {...props} />
      </EnoceanPage>
    );
  }
}

export default EnoceanDevicePage;
