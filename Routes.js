import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './pages/Home.js'
import About from './pages/About.js'
import Game from './pages/Game.js'

const Routes = () => (
   <Router>
      <Scene key="root">
         <Scene key="home" component={Home} title="Accueil" initial={true} />
         <Scene key="about" component={About} title="À propos" />
         <Scene key="game" component={Game} title="Jeu" />
      </Scene>
   </Router>
)
export default Routes