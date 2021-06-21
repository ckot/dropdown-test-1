import {
    useContext,
    useEffect,
    useState
} from "react"

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap"

import { ScenarioContext } from "../contexts/ScenarioContext"

import { IntvForm } from "../components/forms/FormUtils"
import CheckMarkIcon from "../components/icons/CheckmarkIcon"

const ProofOfConcept = () => {

    const {
        scenario,
        currentInterventionForm,
        isChecked,
        setCurrentInterventionForm,
        toggleChecked
    } = useContext(ScenarioContext)
    const [showDropDown, setShowDropDown] = useState(false)
    const toggleDropDown = () => setShowDropDown(!showDropDown)

    const handleSimpleInterventionSelection = (event) => {
        setCurrentInterventionForm(null)
        toggleChecked(event.target.id)
    }

    const handleInterventionFormSelection = (event) => {
        setCurrentInterventionForm(event.target.id)
    }

    // set current intervention form to null on initial render
    useEffect(
        () => { setCurrentInterventionForm(null) },
        //eslint-disable-next-line
        []
    )

    return (
        <>
            <Dropdown
                isOpen={showDropDown}
                toggle={toggleDropDown}
            >
                <DropdownToggle caret>
                    Select an item
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        id="item1"
                        onClick={handleSimpleInterventionSelection}
                    >
                        <CheckMarkIcon
                            checked={isChecked("item1")}
                            uncheckedClassname="hidden"
                        />
                        I'm a simply intervention with no prompts (no form)
                    </DropdownItem>
                    <DropdownItem
                        id="intv-form-bls-airway-management"
                        onClick={handleInterventionFormSelection}
                    >
                        <CheckMarkIcon
                            checked={isChecked("intv-bls-airway-management")}
                            uncheckedClassname="hidden"
                        />
                        BLS Airway Management<b>...</b>
                    </DropdownItem>
                    <DropdownItem header>Sub heading</DropdownItem>
                    <DropdownItem
                        id="item2"
                        onClick={handleSimpleInterventionSelection}
                    >
                        <CheckMarkIcon
                            checked={isChecked("item2")}
                            uncheckedClassname="hidden"
                        />
                        Another simple intervention
                    </DropdownItem>
                    <DropdownItem
                        id="intv-form-ventilation"
                        onClick={handleInterventionFormSelection}
                    >
                        <CheckMarkIcon
                            checked={isChecked("intv-ventilation")}
                            uncheckedClassname="hidden"
                        />
                        Ventilation<b>...</b>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <hr />
            {!!currentInterventionForm &&
                <IntvForm
                    data={scenario.interventionForms[currentInterventionForm]}
                />
            }
        </>
    )
}

export default ProofOfConcept