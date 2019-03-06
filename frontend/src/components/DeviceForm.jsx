import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { devicePropType } from '../constants';
import { getGroups } from '../api/groupApi';

export default class DeviceForm extends PureComponent {
    state = {
        groups: [],
        selectedGroupId: ''
    };

    componentDidMount = async () => {
        this.setState({
            groups: await getGroups(),
            selectedGroupId: this.props.device.groupId
        });
    };

    handleCancelClick = () => {
        window.history.back();
    };

    handleSubmit = (event) => {
        this.props.onSubmit({
            ...this.props.device,
            name: event.target.deviceName.value,
            address: event.target.deviceAddress.value,
            port: parseInt(event.target.devicePort.value, 10),
            groupId: event.target.deviceGroup.value
        });

        event.preventDefault();
    };

    handleGroupChange = (event) => {
        this.setState({selectedGroupId: event.target.value});
    }

    render() {
        const {device} = this.props;
        const {groups, selectedGroupId} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="deviceName">Device Name</label>
                    <input type="text"
                           className="form-control"
                           id="deviceName"
                           name="deviceName"
                           placeholder="Device Name"
                           required
                           defaultValue={device.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="deviceAddress">IP Address</label>
                    <input type="text"
                           className="form-control"
                           id="deviceAddress"
                           name="deviceAddress"
                           placeholder="IP Address"
                           required
                           defaultValue={device.address}/>
                </div>

                <div className="form-group">
                    <label htmlFor="devicePort">Port</label>
                    <input type="text"
                           className="form-control"
                           id="devicePort"
                           name="devicePort"
                           placeholder="Port"
                           required
                           defaultValue={device.port}/>
                </div>

                <div className="form-group">
                    <label htmlFor="deviceGroup">Group</label>
                    <select className="form-control"
                            id="deviceGroup"
                            value={selectedGroupId}
                            onChange={this.handleGroupChange}>
                        <option value="">No group</option>
                        {groups.map(group =>
                            <option key={group.id} value={group.id}>{group.name}</option>
                        )}
                    </select>
                </div>

                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancelClick}>Cancel</button>
                </div>
            </form>
        );
    }
}

DeviceForm.defaultProps = {
    device: {
        name: '',
        address: '',
        port: 80
    }
};

DeviceForm.propTypes = {
    device: devicePropType,
    onSubmit: PropTypes.func.isRequired
};
