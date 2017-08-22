import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    // Create helper method to avoid fetching
    // the employees list when we already have them on state
    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        
        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <ListItem employee={employee} />;
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    // The list view data source expects an array.
    // Firebase returns the user list as an object.
    // Use lodash to convert the object to an array
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });

    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
