import React, { Fragment, useState, useEffect, } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import api from '../service/api'

import { grey } from '@material-ui/core/colors/';
import {
  Card, CardContent, Button, TextField,
  Container, Chip, Avatar, Link, Typography, ButtonGroup,
  FormControlLabel, Checkbox
} from '@material-ui/core'

const PersonificationCheckbox = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [org, setOrg] = useState(false)
  const classes = useStyles();
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await api.get(`repositories/${searchTerm}?page=${page}&org=${org}`)
        setRepositories(response.data.data)
        const { next = null, prev = null, last = null, first = null } = response.data.pagination
        setPagination([first, prev, next, last])
        window.localStorage.setItem('searchTerm', searchTerm)
        window.scrollTo(0, 0)
      }
      catch{
        setRepositories([])
        setPagination(null)
      }
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, page, org])

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    setSearchTerm(window.localStorage.getItem("searchTerm"))

  }, []);
  async function saveRepository(repository) {
    const [user,repo]=repository.full_name.split('/')
    const body = {
      "username": user,
      "repository_name": repo,
      "repository_id": repository.id
    }
    try {
      await api.post('archived',body)
    }
    catch(err){
      console.log(err)
     }
  }

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
          <FormControlLabel
            control={<PersonificationCheckbox checked={org} onChange={() => { setOrg(!org) }} name="Organization" />}
            label="Organization"
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
                  <br/>
                  <Chip avatar={<Avatar alt={repository.owner.login} src={repository.owner.avatar_url} />} label={repository.owner.login} ></Chip>
                </CardContent>
                <CardContent style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Button onClick={()=>saveRepository(repository)}>Save Repository</Button>
                </CardContent>
              </Card>
              // </ListItem>
            )
          })}

        </Container>
        <Container className={classes.info}>
          {pagination ? <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            {pagination.map(value => {
              return (
                <Button onClick={(e) => {
                  setPage(value.page)
                }} disabled={!value} >{value ? value.rel : ''}</Button>
              )
            })}
          </ButtonGroup> : <br />}
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

export default SearchRepository;