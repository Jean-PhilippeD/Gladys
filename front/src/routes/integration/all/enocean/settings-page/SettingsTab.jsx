import { Text } from 'preact-i18n';
import get from 'get-value';
import cx from 'classnames';

const SettingsTab = ({ children, ...props }) => (
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">
        <Text id="integration.enocean.settings.title" />
      </h2>
      <div class="page-options d-flex">
        <button class="btn btn-info" onClick={props.getUsbPorts}>
          <Text id="integration.enocean.settings.refreshButton" />
        </button>
      </div>
    </div>
    <div class="card-body">
      <div
        class={cx('dimmer', {
          active: props.loading
        })}
      >
        <div class="loader" />
        <div class="dimmer-content">
          {get(props, 'enoceanStatus.ready') && (
            <div class="alert alert-success">
              <Text id="integration.enocean.settings.connectedWithSuccess" />
            </div>
          )}
          {!get(props, 'enoceanStatus.ready') && (
            <div class="alert alert-warning">
              <Text id="integration.enocean.settings.notConnected" />
            </div>
          )}
          {props.enoceanConnectionInProgress && (
            <div class="alert alert-info">
              <Text id="integration.enocean.settings.connecting" />
            </div>
          )}
          {props.enoceanDriverFailed && (
            <div class="alert alert-danger">
              <Text id="integration.enocean.settings.driverFailedError" />
            </div>
          )}
          <p>
            <Text id="integration.enocean.settings.description" />
          </p>
          <div class="form-group">
            <label class="form-label">
              <Text id="integration.enocean.settings.enoceanUsbDriverPathLabel" />
            </label>
            <select class="form-control" onChange={props.updateEnoceanDriverPath}>
              <option>
                <Text id="global.emptySelectOption" />
              </option>
              {props.usbPorts &&
                props.usbPorts.map(usbPort => (
                  <option value={usbPort.comPath} selected={props.enoceanDriverPath === usbPort.comPath}>
                    {usbPort.comName}
                  </option>
                ))}
            </select>
          </div>
          <div class="form-group">
            <button class="btn btn-success" onClick={props.saveDriverPathAndConnect}>
              <Text id="integration.enocean.settings.connectButton" />
            </button>
            <button class="btn btn-danger ml-2" onClick={props.disconnect}>
              <Text id="integration.enocean.settings.disconnectButton" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsTab;
