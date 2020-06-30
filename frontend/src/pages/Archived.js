import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";
import api from '../service/api'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import {
    Card, CardActions, CardContent, Button, TextField,
    Container, CardMedia, Chip, Avatar, Link
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

function Archived() {
    const [theme, setTheme] = useState('dark');
    const [repositories, setRepositories] = useState([])
    const classes = useStyles();
    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        localTheme && setTheme(localTheme);
        console.log('entrou')
        async function loadData() {
            try {

                const response = await api.get('/archived')
                setRepositories(response.data)
            }
            catch{
                setRepositories([])
            }
        }
        loadData()
    }, []);


    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Fragment>
                <Container className={classes.bullet} >

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
                                <CardContent className={classes.lisChip}>
                                    {repository.contributors.map(user => {
                                        return (
                                            <Chip avatar={<Avatar alt={user.login} src={user.avatar_url} />} label={user.login} ></Chip>
                                        )
                                    })}
                                </CardContent>
                                <CardContent className={classes.lisChip}>
                                    {repository.pulls.map(pull => {
                                        return (
                                            <CardContent>
                                                <Typography variant="h6" component="p">
                                                    Pull request
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {pull.title}
                                                </Typography>
                                                <Chip avatar={<Avatar alt={pull.user.login} src={pull.user.avatar_url} />} label={pull.user.login} ></Chip>
                                                <CardActions>
                                                    <Link href={pull.html_url} color="inherit" >
                                                        Acess pull request
                                                    </Link>
                                                </CardActions>
                                            </CardContent>
                                        )
                                    })}
                                </CardContent>
                            </Card>

                            // </ListItem>
                        )
                    })}
                </Container>
            </Fragment>
        </ThemeProvider>
    );
}

export default Archived;