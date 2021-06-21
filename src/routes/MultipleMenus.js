import React, {
    useContext,
    useEffect
} from "react"

// import classnames from "classnames"

import { ScenarioContext } from "../contexts/ScenarioContext"


import { IntvForm } from "../components/forms/FormUtils"

import {
    AIRWAY_MENU_ITEMS,
    BREATHING_MENU_ITEMS,
    CIRCULATION_MENU_ITEMS,
    OTHER_MGMT_ACTIONS_MENU_ITEMS,
    ONGOING_MGMT_PLANS_MENU_ITEMS,
    Menu
} from "../components/Menus"

const MultipleMenus = () => {
    const {
        currentInterventionForm,
        scenario,
        setCurrentInterventionForm
    } = useContext(ScenarioContext)

    const handleInterventionFormSelection = (event) => setCurrentInterventionForm(event.target.id)

    // set current intervention form to null on initial render
    useEffect(
        () => { setCurrentInterventionForm(null) },
        //eslint-disable-next-line
        []
    )

    return (
        <>
            <Menu
                label="Airway"
                clickHandler={handleInterventionFormSelection}
                children={AIRWAY_MENU_ITEMS}
            />
            <Menu
                label="Breathing"
                clickHandler={handleInterventionFormSelection}
                children={BREATHING_MENU_ITEMS}
            />
            <Menu
                label="Circulation"
                clickHandler={handleInterventionFormSelection}
                children={CIRCULATION_MENU_ITEMS}
            />
            <Menu
                label="Other Mgmt. Actions"
                clickHandler={handleInterventionFormSelection}
                children={OTHER_MGMT_ACTIONS_MENU_ITEMS}
            />
            <Menu
                label="Ongoing Mgmt. Plans"
                clickHandler={handleInterventionFormSelection}
                children={ONGOING_MGMT_PLANS_MENU_ITEMS}
            />
            <hr/>
            {!!currentInterventionForm && <IntvForm data={scenario.interventionForms[currentInterventionForm]} />}
        </>
    )
}

export default MultipleMenus