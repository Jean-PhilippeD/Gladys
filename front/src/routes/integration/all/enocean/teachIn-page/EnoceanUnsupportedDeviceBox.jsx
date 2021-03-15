import { Component } from 'preact';
import { Text, Localizer  } from 'preact-i18n';

class EnoceanUnsupportedDeviceBox extends Component {

  render({ device, ...props }) {

    return (
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <Text id="integration.enocean.device.unsupported.title" />
          </div>
          <div class="card-body">
            <b><Text id="integration.enocean.device.unsupported.eep"/>:</b>
            &nbsp;
            <i>{device.eep}</i>
            <br/>
            <b><Text id="integration.enocean.device.unsupported.description"/>:</b>
            <div>
              {device.body && device.body.map((item) => (item.data ? (
                <div>
                  <b><Text id="integration.enocean.device.unsupported.data" /></b>: <i>{item.data}</i><br/>
                  <b><Text id="integration.enocean.device.unsupported.shortcut" /></b>: <i>{item.shortcut}</i><br/>
                  <b><Text id="integration.enocean.device.unsupported.bodyDescription" /></b>: <i>{item.description}</i><br/>
                  {item.enum && item.enum.length ? (
                    <div>
                      <b><Text id="integration.enocean.device.unsupported.values" /></b>: [{item.enum.item.map((value) => (
                        <span>
                          <i>({value.value}, {value.description})</i>
                        </span>
                      ))}]
                    </div>
                  ) : null}
                  <br/>
                </div>
              ) : null
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnoceanUnsupportedDeviceBox;
