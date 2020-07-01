import React, { Fragment, useState, useEffect, } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import api from '../service/api'

import {
  Card, CardActions, CardContent, Button, TextField,
  Container, CardMedia, Chip, Avatar, Link, Typography, ButtonGroup,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    minWidth: 275,
    marginTop: 12,

  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  lisChip: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function SearchRepository() {
  const [theme, setTheme] = useState('dark');
  const [repositories, setRepositories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pagination,setPagination] = useState(null)
  const [page, setPage]= useState(1)
  const classes = useStyles();
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await api.get(`repositories/${searchTerm}?page=${page}`)
        setRepositories(response.data.data)
        const {next=null,prev=null,last=null,first=null} = response.data.pagination
        setPagination([first,prev,next,last])
        window.localStorage.setItem('searchTerm',searchTerm)
      }
      catch{
        setRepositories([])
        setPagination(null)
      }
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm,page])

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    setSearchTerm(window.localStorage.getItem("searchTerm"))

  }, []);


  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Fragment>
        <Container  >
          <TextField
            id="filled-full-width"
            label="Search"
            style={{ background: 'white' }}
            placeholder="Input your profile"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            defaultValue={window.localStorage.getItem("searchTerm")}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
          {repositories.map(repository => {
            return (
              // <ListItem key={repository._id}>
              <Card variant="outlined" className={classes.pos}>
                <CardContent className={classes.text}>
                  <Typography variant="h5" component="h2">
                    {repository.full_name}
                  </Typography>
                  <Typography color="textSecondary">
                    {repository.description}
                  </Typography>
                  <Typography variant="body1">
                    {repository.language}
                  </Typography>
                  <Link href={repository.html_url}>
                    {repository.html_url}
                  </Link>
                </CardContent>

              </Card>

              // </ListItem>
            )
          })}

        </Container>
        <Container className={classes.info}>
          {pagination?<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
           {pagination.map(value=>{
             return(
               <Button onClick={(e)=>{
                  setPage(value.page)
               }}disabled={!value} >{value?value.rel:''}</Button>
             )
           })}
          </ButtonGroup>:<br/>}
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

export default SearchRepository;