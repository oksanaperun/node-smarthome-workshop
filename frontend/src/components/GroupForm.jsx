import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';
import { getDevicesByGroupId } from '../api/groupApi';

export default class GroupForm extends PureComponent {
    state = {
        linkedDevices: []
    };

    componentDidMount = async () => {
        this.setState({
            linkedDevices: await getDevicesByGroupId(this.props.group.id)
        });
    };

    handleCancelClick = () => {
        window.history.back();
    };

    handleSubmit = (event) => {
        this.props.onSubmit({
            ...this.props.group,
            name: event.target.groupName.value
        });

        event.preventDefault();
    };

    render() {
        const {group} = this.props;
        const {linkedDevices} = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input type="text"
                           className="form-control"
                           id="groupName"
                           name="groupName"
                           placeholder="Group Name"
                           required
                           defaultValue={group.name}/>
                </div>

                {group.id &&
                    <label> Linked Devices <span className="badge badge-primary">{linkedDevices.length}</span>
                    </label>
                }
                <ul className="list-group list-group-flush">
                    {linkedDevices.map(device =>
                        <li key={device.id} className="list-group-item">
                            {device.name} / {device.address}:{device.port}
                        </li>
                    )}
                </ul>

                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancelClick}>Cancel</button>
                </div>
            </form>
        );
    }
}

GroupForm.defaultProps = {
    group: {
        name: ''
    }
};

GroupForm.propTypes = {
    group: groupPropType,
    onSubmit: PropTypes.func.isRequired
};
