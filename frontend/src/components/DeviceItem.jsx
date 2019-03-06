import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { removeDevice, switchOn, switchOff } from '../api/devicesApi';
import { devicePropType } from '../constants';

export default class DeviceItem extends PureComponent {
    handleDelete = async () => {
        const {device, onUpdate} = this.props;

        await removeDevice(device.id);
        onUpdate();
    };

    handleStateChange = async (e) => {
        const {device, onUpdate} = this.props;
        const newState = e.target.firstChild.id;

        if (newState === 'On') {
            await switchOn(device.id);
        } else {
            await switchOff(device.id);
        }

        onUpdate();
    };

    render() {
        const {index, device} = this.props;

        return (
            <tr key={device.id}>
                <th scope="row">{index}</th>
                <td>{device.name}</td>
                <td>{device.address}:{device.port}</td>
                <td className="text-right">
                    <div className="btn-group btn-group-toggle mr-2" role="group" data-toggle="buttons">
                        <label className={`btn btn-outline-primary ${device.state === 'On' ? 'active' : ''}`}
                               onClick={this.handleStateChange}>
                            <input type="radio"
                                   name="state"
                                   id="On"
                                   defaultChecked={device.state === 'On'}/> On
                        </label>

                        <label className={`btn btn-outline-primary ${device.state === 'Off' ? 'active' : ''}`}
                               onClick={this.handleStateChange}>
                            <input type="radio"
                                   name="state"
                                   id="Off"
                                   defaultChecked={device.state === 'Off'}/> Off
                        </label>
                    </div>

                    <div className="btn-group" role="group">
                        <a href={`#/devices/log/${device.id}`} className="btn btn-outline-secondary">Log</a>
                        <a href={`#/devices/edit/${device.id}`} className="btn btn-outline-secondary">Edit</a>
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}

DeviceItem.defaultProps = {
    onUpdate: () => {
    }
};

DeviceItem.propTypes = {
    device: devicePropType.isRequired,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func
};
