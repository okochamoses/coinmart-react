import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import InfoArea from "../components/InfoArea/InfoArea.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { DollarSign, Lock, BatteryCharging, Clock } from "react-feather";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          {/* <h2 className={classes.title}>Let{"'"}s talk product</h2> */}
          {/* <h5 className={classes.description}>
            This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see
            more.
          </h5> */}
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Fast Payout"
              description="You get paid immediately your transaction is completed. Directly to your bank account "
              icon={Clock}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Round the clock access"
              description="We are online 24/7 to do business and help you make money round-the-clock."
              icon={Clock}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Secure Transactions"
              description="The things that matter to you matter to us, you’re secure with us. "
              icon={Lock}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="No Extra Charges"
              description="We charge nothing extra for transactions. You only pay according to our fixed rates"
              icon={DollarSign}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
