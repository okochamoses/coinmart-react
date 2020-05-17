/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// material-ui core components
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import styles from '../../../../assets/jss/material-kit-react/components/footerStyle.js';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    const { whiteFont } = props;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    return (
        <footer className={footerClasses}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                                <Link to="/account/login">Login</Link>
                        </ListItem>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <ListItem className={classes.inlineBlock}>
                            <Link to="/account/register">Register</Link>
                        </ListItem>
                    </List>
                </div>
                <div className={classes.right}>
                    &copy; {1900 + new Date().getYear()}
                    Coinmart
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    whiteFont: PropTypes.bool,
};
