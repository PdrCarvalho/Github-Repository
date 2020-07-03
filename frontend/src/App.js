import React, { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import GlobalTheme from "./globals";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import SearchRepository  from './pages/SearchRepository'
import Archived from './pages/Archived'
import Avatar from '@material-ui/core/Avatar';
const foto = require('./image/logo.jpg')
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
   console.log(newValue)
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Fragment>
        <GlobalTheme />
        <Container>
         <Avatar alt="logo" src={foto} />
          <Title>
            GitHub Repository
          </Title>
        </Container>
          <Button style={{position:"absolute",top:15,right:5}} variant="contained" onClick={toggleTheme}>{theme === "light" ? "light theme" : "dark theme"}</Button>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Search repositories" />
            <Tab label="Archived" />
          </Tabs>
        </Paper>
        {value?<Archived/>:<SearchRepository/>}
      </Fragment>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 30px;
  /* margin-left: 15px; */
  
`;

// const ButtonChange = styled.button`
//   width: 100px;
//   height: 40px;
//   margin-right: 20px;
//   margin-left: 40px;
//   border-radius: 10px;
// `;

export default App;