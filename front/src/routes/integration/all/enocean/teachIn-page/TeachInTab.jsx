import { Text } from 'preact-i18n';
import style from './style.css';
import cx from 'classnames';
import EnoceanDeviceBox from '../EnoceanDeviceBox';
import EnoceanUnsupportedDeviceBox from './EnoceanUnsupportedDeviceBox';
import EnoceanManualTeachInDeviceBox from './EnoceanManualTeachInDeviceBox';

const TeachInTab = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h1 class="card-title">
        <Text id="integration.encoean.teachIn.title" />
      </h1>
    </div>
    <div class="card-body">

      <div class="alert alert-secondary">
        <Text id="integration.enocean.teachIn.description" />
      </div>
      <div
        class={cx('dimmer', {
          active: props.loading
        })}
      >
        <div class="loader" />
        {!props.manualTeachInDeviceBox ? (
          <div class="page-options d-flex">
            <button onClick={props.showManualTeachInDeviceBox} class="btn btn-secondary mr-2">
              <Text id="integration.enocean.manualTeachIn" />
            </button>
          </div>
        ) : null}
        {props.manualTeachInDeviceBox ? 
          <EnoceanManualTeachInDeviceBox 
            {...props} 
            manuallyTeachableDevices={props.manuallyTeachableDevices} 
            device={props.manuallyTeachInDevice} 
            close={props.hideManualTeachInDeviceBox}
          /> : null
        }
        <div class={cx('dimmer-content', style.enoceanListBody)}>
          <div class="row">
            {props.discoveredDevices &&
              props.discoveredDevices.map((device, index) => (
                <EnoceanDeviceBox
                  {...props}
                  editable={true}
                  saveButton={true}
                  device={device}
                  deviceIndex={index}
                  listName="discoveredDevices"
                />
              ))}
            {props.unsupportedDevices &&
              props.unsupportedDevices.map((device) => (
                <EnoceanUnsupportedDeviceBox
                  {...props}
                  device={device}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TeachInTab;
