import {
    useContext,
    useEffect,
    useState,
} from "react"

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

const INTV_CAT_MENU_ITEMS = [
    {
        "id": "airway",
        "type": "intervention-form",
        "depth": "1",
        "label": "Airway"
    },
    {
        "id": "breathing",
        "type": "intervention-form",
        "depth": "1",
        "label": "Breathing"
    },
    {
        "id": "circulation",
        "type": "intervention-form",
        "depth": "1",
        "label": "Circulation"
    },
    {
        "id": "other-mgmt-actions",
        "type": "intervention-form",
        "depth": "1",
        "label": "Other Mgmt. Actions"
    },
    {
        "id": "ongoing-mgmt-plan",
        "type": "intervention-form",
        "depth": "1",
        "label": "Ongoing Mgmt. Plans"
    }
]

const MenuPair = () => {
    const {
        scenario,
        currentInterventionForm,
        setCurrentInterventionForm
    } = useContext(ScenarioContext)

    const [currIntvCategory, setCurrIntvCategory] = useState(null)

    const handleSelectIntvCategory = (event) => {
        setCurrentInterventionForm(null)
        const category = event.target.id
        switch(category) {
            case "airway":
            case "breathing":
            case "circulation":
            case "other-mgmt-actions":
            case "ongoing-mgmt-plan":
                setCurrIntvCategory(category)
                break
            default:
                console.error(`unknown intervention category: ${category}`)
                setCurrIntvCategory(null)
        }
    }

    const handleSelectIntv = (event) => {
        event.preventDefault()
        console.log(event.target.id)
        setCurrentInterventionForm(event.target.id)
    }

    // set current intervention form to null on initial render
    useEffect(
        () => { setCurrentInterventionForm(null) },
        //eslint-disable-next-line
        []
    )

    const getIntvMenu = () => {
        switch(currIntvCategory) {
            case "airway":
                return (
                    <Menu
                        label="Airway"
                        clickHandler={handleSelectIntv}
                        children={AIRWAY_MENU_ITEMS}
                    />
                )
            case "breathing":
                return (
                    <Menu
                        label="Breathing"
                        clickHandler={handleSelectIntv}
                        children={BREATHING_MENU_ITEMS}
                    />
                )
            case "circulation":
                return (
                    <Menu
                        label="Circulation"
                        clickHandler={handleSelectIntv}
                        children={CIRCULATION_MENU_ITEMS}
                    />
                )
            case "other-mgmt-actions":
                return (
                    <Menu
                        label="Other Mgmt. Actions"
                        clickHandler={handleSelectIntv}
                        children={OTHER_MGMT_ACTIONS_MENU_ITEMS}
                    />
                )
            case "ongoing-mgmg-plans":
                return (
                    <Menu
                        label="Ongoing Mgmt Plans"
                        clickHandler={handleSelectIntv}
                        children={ONGOING_MGMT_PLANS_MENU_ITEMS}
                    />
                )
            default:
                return (<span></span>)
        }
    }

    return (
        <>
            <Menu
                label="Intervention Category"
                clickHandler={handleSelectIntvCategory}
                children={INTV_CAT_MENU_ITEMS}
            />
            {!!currIntvCategory && getIntvMenu()}
            <hr />
            {!!currentInterventionForm && <IntvForm data={scenario.interventionForms[currentInterventionForm]} />}
        </>
    )
}

export default MenuPair