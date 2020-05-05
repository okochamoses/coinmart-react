import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../../redux/actions';
import { Cookies } from 'react-cookie';

class Logout extends Component {

    async componentDidMount() {
        console.log("LOGOUT")
        this.props.logoutUser(this.props.history);
        const cookies = new Cookies();
        await cookies.remove("user")
        const user = cookies.get('user');
        console.log(user)
    }

    render() {
        return (<React.Fragment>
            <p>
                Logging out...
            </p>
        </React.Fragment>)
    }
}

export default withRouter(connect(null, { logoutUser })(Logout));