import React, {useState} from 'react';
import './App.css';

import {HashRouter as Router, Switch, Route, Link} from "react-router-dom"

// import { Button } from 'reactstrap';

import { ScenarioProvider } from "./contexts/ScenarioContext"
import scenarioData from "./data/strawMan.json"

import ProofOfConcept from './routes/ProofOfConcept';
import MultipleMenus from './routes/MultipleMenus';
import MenuPair from './routes/MenuPair';

function App() {
  console.log(scenarioData)

  const getDefaultValues = (scen) => {
    return {
      // vitals: scen.initialVitalSigns,
      // vitalsRecomputed: false,
      // currentNode: null,
      checkListItems: {}, //mapChildObjKeysToFalse(scen.items),
      // criticalCriteria: {}, //mapArrayOfObjKeysToFalse(scen.criticalCriteria),
      showForm: {}, //mapKeysToFalse(scen.interventionForms)
    }
  }
  // eslint-disable-next-line
  const [defaultValues, _unused] = useState(getDefaultValues(scenarioData))

  return (
    <>
      <ScenarioProvider scenario={scenarioData} defaultValues={defaultValues} >
        <Router>
          <Link to="/" className="btn btn-info">Proof of Concept</Link>
          <Link to="/multi-menu" className="btn btn-primary">Multi-Menu</Link>
          <Link to="/menu-pair" className="btn btn-success">Menu-Pair</Link>
          <hr />
          <h5>Screen width narrowed to approximate width of Interventions Tab</h5>
          <hr />

          <Switch>
            <Route exact path="/" component={ProofOfConcept} />
            <Route exact path="/multi-menu" component={MultipleMenus} />
            <Route exact path="/menu-pair" component={MenuPair} />
          </Switch>
        </Router>
      </ScenarioProvider>
    </>
  )
}

export default App;
