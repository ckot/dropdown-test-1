import React, {useState, useContext, useEffect, useMemo} from "react"

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap"

import classnames from "classnames"

import { ScenarioContext } from "../../contexts/ScenarioContext"
import InterventionForm from "../InterventionForm"


const InterventionsTabContent = () => {

    const {
        checkListItems,
        currentInterventionForm,
        isChecked,
        setCurrentInterventionForm,
        scenario
    } = useContext(ScenarioContext)

    const options = useMemo(() => scenario.interventionFormsMenu, [scenario.interventionFormsMenu])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropDown = () => setDropdownOpen(prevState => !prevState)

    const handleInterventionFormSelection = (event) => setCurrentInterventionForm(event.target.id)

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
                <DropdownToggle caret>
                    Select an Intervention
                </DropdownToggle>
                <DropdownMenu>
                    {options.map((opt) =>
                        <DropdownItem
                            key={opt.id}
                            id={opt.id}
                            className={
                                classnames({
                                        "dropdown-header": "heading" === opt.type,
                                        "dropdown-form": "heading" !== opt.type
                                    },
                                    `dropdown-depth-${opt.depth}`
                            )}
                            header={opt.type === "heading"}
                            onClick={handleInterventionFormSelection}
                        > {opt.label}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>

            {!!currentInterventionForm && <InterventionForm /> }
        </>
    )
}

export default InterventionsTabContent