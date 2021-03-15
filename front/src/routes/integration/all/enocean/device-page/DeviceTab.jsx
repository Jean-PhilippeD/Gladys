import { Text } from 'preact-i18n';
import EnoceanDeviceBox from '../EnoceanDeviceBox';

const DeviceTab = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">
        <Text id="integration.enocean.device.title" />
      </h1>
    </div>
    <div class="card-body">
      <div class="row">
        {props.enoceanDevices &&
          props.enoceanDevices.map((device, index) => (
            <EnoceanDeviceBox
              {...props}
              editable={true}
              saveButton={true}
              deleteButton={true}
              device={device}
              deviceIndex={index}
              listName="enoceanDevices"
            />
          ))}
        </div>
    </div>
  </div>
);

export default DeviceTab;
