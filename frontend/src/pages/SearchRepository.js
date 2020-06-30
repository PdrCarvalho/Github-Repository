import React, { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import api from '../service/api'


function SearchRepository() {
  const [theme, setTheme] = useState('dark');
  const [repositories,setRepository]= useState([])
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);


  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Fragment>
        <h1>Teste2</h1>
      </Fragment>
    </ThemeProvider>
  );
}

export default SearchRepository;