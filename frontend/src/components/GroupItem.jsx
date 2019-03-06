import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';
import { removeGroup, switchOn, switchOff } from '../api/groupApi';

export default class GroupItem extends PureComponent {
    handleDelete = async () => {
        const {group, onUpdate} = this.props;

        await removeGroup(group.id);
        onUpdate();
    };

    handleStateChange = async (e) => {
        const {group, onUpdate} = this.props;
        const newState = e.target.firstChild.id;

        if (newState === 'On') {
            await switchOn(group.id);
        } else {
            await switchOff(group.id);
        }
        onUpdate();
    };

    render() {
        const { index, group } = this.props;

        return (
            <tr key={group.id}>
                <th scope="row">{index}</th>
                <td>{group.name}</td>
                <td className="text-right">
                    <div className="btn-group btn-group-toggle mr-2" role="group" data-toggle="buttons">
                        <label className={`btn btn-outline-primary ${group.state === 'On' ? 'active' : ''}`}
                               onClick={this.handleStateChange}>
                            <input type="radio"
                                   name="state"
                                   id="On"
                                   defaultChecked={group.state === 'On'}/> On
                        </label>

                        <label className={`btn btn-outline-primary ${group.state === 'Off' ? 'active' : ''}`}
                               onClick={this.handleStateChange}>
                            <input type="radio"
                                   name="state"
                                   id="Off"
                                   defaultChecked={group.state === 'Off'}/> Off
                        </label>
                    </div>

                    <div className="btn-group" role="group">
                        <a href={`#/groups/log/${group.id}`} className="btn btn-outline-secondary">Log</a>
                        <a href={`#/groups/edit/${group.id}`} className="btn btn-outline-secondary">Edit</a>
                        <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}

GroupItem.defaultProps = {
    onUpdate: () => {}
};

GroupItem.propTypes = {
    group: groupPropType.isRequired,
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func
};
