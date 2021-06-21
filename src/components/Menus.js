import React, {
    // useContext,
    useState
} from "react"

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap"

import classnames from "classnames"

export const AIRWAY_MENU_ITEMS = [
    {
        "id": "heading-bls",
        "type": "heading",
        "depth": "1",
        "label": "BLS"
    },
    {
        "id": "intv-form-bls-airway-management",
        "type": "intervention-form",
        "depth": "2",
        "label": "BLS airway management"
    },
    {
        "id": "intv-form-remove-foreign-objects",
        "type": "intervention-form",
        "depth": "2",
        "label": "Remove foreign body obstructions"
    },
    {
        "id": "intv-form-suction",
        "type": "intervention-form",
        "depth": "2",
        "label": "Suction"
    },
    {
        "id": "intv-form-crico",
        "type": "intervention-form",
        "depth": "2",
        "label": "Cricothyrotomy"
    },
    {
        "id": "heading-als",
        "type": "heading",
        "depth": "1",
        "label": "ALS"
    },
    {
        "id": "intv-form-als-airway-management",
        "type": "intervention-form",
        "depth": "2",
        "label": "ALS airway management"
    }
]

export const BREATHING_MENU_ITEMS = [
    {
        "id": "intv-form-ventilation",
        "type": "intervention-form",
        "depth": "1",
        "label": "Ventilation"
    },
    {
        "id": "intv-form-supplemental-oxygen",
        "type": "intervention-form",
        "depth": "1",
        "label": "Supplemental oxygen administration"
    },
    {
        "id": "heading-manage-breathing-injury",
        "type": "heading",
        "depth": "1",
        "label": "Manage Breathing-Compromising Injury"
    },
    {
        "id": "intv-form-occlusive-dressing",
        "type": "intervention-form",
        "depth": "2",
        "label": "Occlusive dressing"
    },
    {
        "id": "intv-form-pleural-decompression",
        "type": "intervention-form",
        "depth": "2",
        "label": "Pleural decompression"
    }
]

export const CIRCULATION_MENU_ITEMS = [
    {
        "id": "intv-form-severe-bleeding",
        "type": "intervention-form",
        "depth": "1",
        "label": "Severe bleeding"
    },
    {
        "id": "intv-form-shock",
        "type": "intervention-form",
        "depth": "1",
        "label": "Shock"
    }
]

export const OTHER_MGMT_ACTIONS_MENU_ITEMS = [
    {
        "id": "intv-form-manage-secondary-injuries",
        "type": "intervention-form",
        "depth": "2",
        "label": "Secondary wounds"
    },
    {
        "id": "intv-form-spinal-motion-restriction",
        "type": "intervention-form",
        "depth": "2",
        "label": "Spinal motion restriction"
    },
    {
        "id": "intv-form-transport-decisions",
        "type": "intervention-form",
        "depth": "2",
        "label": "Transport decisions"
    }
]

export const ONGOING_MGMT_PLANS_MENU_ITEMS = [
    {
        "id": "intv-form-transfers-patient",
        "type": "intervention-form",
        "depth": "1",
        "label": "Transfers patient to ambulance as needed"
    },
    {
        "id": "intv-form-reassess-vital-signs",
        "type": "intervention-form",
        "depth": "1",
        "label": "Reassesses vital signs"
    },
    {
        "id": "intv-form-reassess-modify-interventions",
        "type": "intervention-form",
        "depth": "1",
        "label": "Checks and modifies interventions as needed"
    },
    {
        "id": "intv-form-administer-additional-interventions",
        "type": "intervention-form",
        "depth": "1",
        "label": "Administers additional interventions as needed"
    }
]

export const Menu = ({label, clickHandler, children}) => {
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)

    return (
        <Dropdown
            isOpen={show}
            toggle={toggleShow}
            className="dropdown"
        >
            <DropdownToggle caret>
                {label}
            </DropdownToggle>
            <DropdownMenu>
                {children.map((opt) =>
                    <DropdownItem
                        key={opt.id}
                        id={opt.id}
                        className={
                            classnames({
                                "dropdown-header": "heading" === opt.type,
                                "dropdown-form": "heading" !== opt.type
                            },
                                `dropdown-depth=${opt.depth}`
                            )}
                        header={opt.type === "heading"}
                        onClick={clickHandler}
                    >
                        {opt.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    )
}