import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from "components/Table/Table.jsx";

import TableData from "./LeaderBoardTable.jsx"

//References:
//https://material-ui.com/components/tabs/
//https://www.npmjs.com/package/react-swipeable-views
//https://stackoverflow.com/questions/35079675/custom-background-color-for-material-ui-menu

//Render panel, and fonts
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={2}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

//Accessibility 
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

//Rendering table styles
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fdfbfb',
    width: 300,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="info"
          textColor="info"
          variant="100px"
          
        >
          <Tab label="Posts" style={{backgroundColor: 'white', color: 'black', width: 100}} {...a11yProps(0)} />
          <Tab label="Reactions" style={{backgroundColor: 'white', color: 'black'}} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            {/* <TableData/> */}
            <Table
              hover
              tableHeaderColor="info"
              tableData={[
                      ["1",  "Lucy"],
                      ["2", "Lilydale"],
                      ["3", "Maccas"],
                      ["4", "Orange"],
                      ["5", "Blue"]
                  ]}
              />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Table
                hover
                tableHeaderColor="info"
                tableData={[
                    ["1", "Lily"],
                    ["2", "Waters"],
                    ["3", "Rain"],
                    ["4", "Storm"],
                    ["5", "Storm"]
                ]}
            />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}