import { Component } from 'preact';
import { Text, Localizer } from 'preact-i18n';
import cx from 'classnames';
import { DeviceFeatureCategoriesIcon } from '../../../../../utils/consts';
import get from 'get-value';
import slugify from '../../../../../utils/slugify';

class EnoceanManualTeachInDeviceBox extends Component {
  updateName = e => {
    this.props.updateManualyTeachInDeviceField('name', e.target.value);

    this.setState({
      loading: false
    });
  };

  updateId = e => {
    this.props.updateManualyTeachInDeviceField('external_id', e.target.value);
    this.props.manuallyTeachableDevices.forEach((manuallyTeachableDevice) => {
      if (manuallyTeachableDevice.name === this.props.device.name) {
        this.props.updateManualyTeachInDeviceField('selector', `enocean-${e.target.value}-${manuallyTeachableDevice.eep}`);
        manuallyTeachableDevice.features.map((feature) => {
          let shortcut = feature.shortcut;
          let slugified = slugify(manuallyTeachableDevice.name)
          delete feature.shortcut;
          feature.external_id = `${e.target.value}:${shortcut}:${slugified}`;
          feature.selector = `enocean:${e.target.value}:${shortcut}:${slugified}`;
        })
        this.props.updateManualyTeachInDeviceField('features', manuallyTeachableDevice.features);
      }
    })

    this.setState({
      loading: false
    });
  };

  updateRoom = e => {
    this.props.updateManualyTeachInDeviceField('room_id', e.target.value);

    this.setState({
      loading: false
    });
  };

  updateProfile = e => {
    this.props.manuallyTeachableDevices.forEach((manuallyTeachableDevice) => {
      if (manuallyTeachableDevice.eep === e.target.value) {
        this.props.updateManualyTeachInDeviceField('name', manuallyTeachableDevice.name);
        this.props.updateManualyTeachInDeviceField('selector', `enocean-${this.props.device.external_id}-${manuallyTeachableDevice.eep}`);
        manuallyTeachableDevice.features.map((feature) => {
          let shortcut = feature.shortcut;
          let slugified = slugify(manuallyTeachableDevice.name)
          delete feature.shortcut;
          feature.external_id = `${this.props.device.external_id}:${shortcut}:${slugified}`;
          feature.selector = `enocean:${this.props.device.external_id}:${shortcut}:${slugified}`;
        })
        this.props.updateManualyTeachInDeviceField('features', manuallyTeachableDevice.features);
        this.props.updateManualyTeachInDeviceField('model', manuallyTeachableDevice.model);
        this.props.updateManualyTeachInDeviceField('service_id', manuallyTeachableDevice.service_id);
      }
    })

    this.setState({
      loading: false
    });
  };

  saveDevice = async () => {
    this.setState({
      loading: true,
      errorMessage: null
    });
    try {
      await this.props.saveManuallyTeachInDevice();
    } catch (e) {
      let errorMessage = 'integration.enocean.error.defaultError';
      if (e.response.data && e.response.data.message) {
        errorMessage = e.response.data.message;
      }
      if (e.response.status === 409) {
        errorMessage = 'integration.enocean.error.conflictError';
      }
      this.setState({
        errorMessage
      });
    }
    this.setState({
      loading: false
    });
  };

  render({ manuallyTeachableDevices, device, housesWithRooms, ...props }, { loading, errorMessage }) {

    return (
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">{device.name}</div>
          <div
            class={cx('dimmer', {
              active: loading
            })}
          >
            <div class="loader" />
            <div class="dimmer-content">
              <div class="card-body">
                {errorMessage && (
                  <div class="alert alert-danger">
                    <Text id={errorMessage} />
                  </div>
                )}
                <div class="form-group">
                  <label class="form-label" for="name">
                    <Text id="integration.enocean.device.nameLabel" />
                  </label>
                  <Localizer>
                    <input
                      id="name"
                      type="text"
                      value={device.name}
                      onInput={this.updateName}
                      class="form-control"
                      placeholder={<Text id="integration.enocean.namePlaceholder" />}
                    />
                  </Localizer>
                </div>

                <div class="form-group">
                  <label class="form-label" for="profile">
                    <Text id="integration.enocean.profile" />
                  </label>
                  <select
                    onChange={this.updateProfile}
                    class="form-control"
                    id="profile"
                  >
                    <option value="">
                      <Text id="global.emptySelectOption" />
                    </option>
                    {manuallyTeachableDevices &&
                      manuallyTeachableDevices.map(manuallyTeachableDevice => (
                        <option selected={manuallyTeachableDevice.eep === device.eep} value={manuallyTeachableDevice.eep}>
                          {manuallyTeachableDevice.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="room">
                    <Text id="integration.enocean.device.roomLabel" />
                  </label>
                  <select
                    onChange={this.updateRoom}
                    class="form-control"
                    id="room"
                  >
                    <option value="">
                      <Text id="global.emptySelectOption" />
                    </option>
                    {housesWithRooms &&
                      housesWithRooms.map(house => (
                        <optgroup label={house.name}>
                          {house.rooms.map(room => (
                            <option selected={room.id === device.room_id} value={room.id}>
                              {room.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="id">
                    <Text id="integration.enocean.device.id" />
                  </label>
                  <Localizer>
                    <input
                      id="id"
                      type="text"
                      value={device.id}
                      onInput={this.updateId}
                      class="form-control"
                      placeholder={<Text id="integration.enocean.device.idPlaceholder" />}
                    />
                  </Localizer>
                </div>

                {device.features && device.features.length > 0 && (
                  <div class="form-group">
                    <label class="form-label">
                      <Text id="integration.enocean.device.featuresLabel" />
                    </label>
                    <div class="tags">
                      {device.features.map(feature => (
                        <span class="tag">
                          <Text id={`deviceFeatureCategory.${feature.category}.${feature.type}`} />
                          <div class="tag-addon">
                            <i
                              class={`fe fe-${get(DeviceFeatureCategoriesIcon, `${feature.category}.${feature.type}`)}`}
                            />
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div class="form-group">
                  <button onClick={props.close} class="btn btn-default mr-2">
                    <Text id="integration.enocean.cancelButton" />
                  </button>
                  <button onClick={this.saveDevice} class="btn btn-success mr-2">
                    <Text id="integration.enocean.saveButton" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnoceanManualTeachInDeviceBox;
