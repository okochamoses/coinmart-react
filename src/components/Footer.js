import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {
    render() {
        return (
            <footer className="footer" style={{ backgroundColor: '#222' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">2020 &copy; Coinmart. All Rights Reserved.</div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
