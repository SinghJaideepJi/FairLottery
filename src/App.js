import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import Particles from 'react-particles-js';

const particleSettings = {
  "particles": {
    "number": {
        "value": 30,
        "density": {
            "enable": true,
            "value_area": 800
        }
    },
    "line_linked": {
        "enable": false
    },
    "move": {
        "speed": 5,
        "out_mode": "out"
    },
    "shape": {
        "type": [
            "images",
            "circle"
        ],
        "images": [
            {
                "src": "/img/btc1.png",
                "height": 20,
                "width": 23
            },
            {
                "src": "/img/eth1.png",
                "height": 20,
                "width": 20
            },
            {
                "src": "/img/money3.png",
                "height": 20,
                "width": 20
            },
            {
                "src": "/img/money4.png",
                "height": 20,
                "width": 20
            },
            {
              "src": "/img/btc1.png",
              "height": 20,
              "width": 23
          },
          {
              "src": "/img/eth1.png",
              "height": 20,
              "width": 20
          },
          {
              "src": "/img/money3.png",
              "height": 20,
              "width": 20
          },
          {
              "src": "/img/money4.png",
              "height": 20,
              "width": 20
          },
      ]
    },
    "color": {
        "value": "#CCC"
    },
    "size": {
        "value": 30,
        "random": true,
        "anim": {
            "enable": true,
            "speed": 20,
            "size_min": 10,
            "sync": true
        }
    }
},
"retina_detect": false
}

const particleStyle = {
  position:"fixed",
  left:0,
  top:0,
  width:"100%",
  height:"100%",
  "zIndex": -1
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
          </Switch>
          <Particles params = {particleSettings} style ={particleStyle}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
