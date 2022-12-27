import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import auth from './../auth/auth-helper'
import Home from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {textAlign: 'center',fontSize: '16px',margin: '4px 2px'}
  else
    return {color: 'black'}
}
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return {color: '#fffde7', backgroundColor: '#f57c00', marginRight:10}
  else
    return {color: '#616161', backgroundColor: '#ffffff', border:'1px solid #000000', marginRight:10}
}

const Menu = withRouter(({history}) => (
  <AppBar position="fixed" style={{zIndex:12343455}}>
    <Toolbar>
      <Typography variant="h5" style={{'color':'white','fontSize':'25px','fontFamily':'sans-serif'}}>
            Vignan Hire
      </Typography>
      <IconButton>
        <Link to="/">
        <Home style={{'fontSize':'30px','color':'white'}}></Home>
        </Link>
      </IconButton>
      <div style={{'position':'absolute', 'right': '10px'}}>
        <span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Register
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Login
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.educator && (<Link to="/teach/courses"><Button style={isPartActive(history, "/teach/")}>Teach</Button></Link>)}
          <Link to={"/editor/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Editor</Button>
          </Link>
          <Link to={"https://3000-vignancse-collaborative-gnus8d2vuuh.ws-us80.gitpod.io/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Collab Editor</Button>
          </Link>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
