/*eslint-disable*/
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload, Lock, People } from '@material-ui/icons';

// core components
import CustomDropdown from '../CustomDropdown/CustomDropdown.js';
import Button from '../CustomButtons/Button.js';

import styles from '../../../../assets/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            {/* <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText="Components"
                    buttonProps={{
                        className: classes.navLink,
                        color: 'transparent',
                    }}
                    buttonIcon={Apps}
                    dropdownList={[
                        <Link to="/" className={classes.dropdownLink}>
                            All components
                        </Link>,
                        <a
                            href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
                            target="_blank"
                            className={classes.dropdownLink}>
                            Documentation
                        </a>,
                    ]}
                />
            </ListItem>
            <ListItem className={classes.listItem}> 
                <Link className={classes.listItem} to="/account/login">
                    <Button color="transparent" target="_blank" className={classes.navLink}>
                        <CloudDownload className={classes.icons} /> Download
                    </Button>
                </Link>
            </ListItem> */}
            <ListItem className={classes.listItem}>
                <Link className={classes.listItem} to="/account/login">
                    <Button color="transparent" target="_blank">
                        <Lock className={classes.icons} /> Login
                    </Button>
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link className={classes.listItem} to="/account/register">
                    <Button color="transparent" target="_blank">
                        <People className={classes.icons} /> Register
                    </Button>
                </Link>
            </ListItem>
        </List>
    );
}
