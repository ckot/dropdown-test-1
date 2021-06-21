import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo
} from "react"

import { Collapse } from 'reactstrap'

import {ScenarioContext} from "../../contexts/ScenarioContext"

import CheckBoxIcon from "../icons/CheckBoxIcon"
import CheckmarkIcon from "../icons/CheckmarkIcon"
import ChevronIcon from "../icons/ChevronIcon"
import DoneIcon from "../icons/DoneIcon"


export const NestedForm = ({id, label, checkedWhen = "some", children}) => {
    const {
        buildDepListFromCheckListItemIDs,
        checkListItems,
        isChecked,
        setDerivedCheckListItemValue,
        shouldDisplayInterventionForm,
        toggleDisplayInterventionForm
    } = useContext(ScenarioContext)
    // eslint-disable-next-line
    const depIDs = useMemo(() => children.map(child => child.id), [...children])
    // eslint-disable-next-line
    const depList = useCallback(() => buildDepListFromCheckListItemIDs(depIDs), [checkListItems])

    useEffect(
        () => {setDerivedCheckListItemValue(id, checkedWhen, depIDs)},
        // eslint-disable-next-line
        [depList]
    )

    return (
        <li>
            <span onClick={() => toggleDisplayInterventionForm(id)}>
                <CheckmarkIcon checked={isChecked(id)} />
                {label}
                <ChevronIcon expand={shouldDisplayInterventionForm(id)} />
             </span>
            <Collapse isOpen={shouldDisplayInterventionForm(id)} >
                <ul>
                {children.map(child =>
                    <li key={child.id}><IntvFormItem item={child} /></li>
                )}
                </ul>
            </Collapse>
        </li>
    )
}


export const DerivedValue = ({id, checkedWhen, children}) => {

    const {
        buildDepListFromCheckListItemIDs,
        checkListItems,
        setDerivedCheckListItemValue
    } = useContext(ScenarioContext)

    // eslint-disable-next-line
    const depIDs = useMemo(() => children.map(child => child.id), [...children])
    // eslint-disable-next-line
    const depList = useCallback(() => buildDepListFromCheckListItemIDs(depIDs), [checkListItems])
    // set the derived value on the initial render
    useEffect(
        () => { setDerivedCheckListItemValue(id, checkedWhen, depIDs) },
         // eslint-disable-next-line
        []
    )
    // set the derived value when something changes
    useEffect(
        () => {setDerivedCheckListItemValue(id, checkedWhen, depIDs)},
        // eslint-disable-next-line
        [depList]
    )

    return (
        <>
            {children.map(child =>
                <IntvFormItem item={child} />
            )}
        </>
    )
}


export const FormCheckBox = ({ id, label, clickHandler }) => {
    const { isChecked } = useContext(ScenarioContext)

    return (
        <span onClick={() => clickHandler(id)}>
            <CheckBoxIcon checked={isChecked(id)} />
            <span>
                {label}
            </span>
        </span>
    )
}

export const SelectOne = ({ id, label, children }) => {

    const {
        buildDepListFromCheckListItemIDs,
        checkListItems,
        isChecked,
        setChecked,
        setDerivedCheckListItemValue
    } = useContext(ScenarioContext)
    // eslint-disable-next-line
    const depIDs = useMemo(() => children.map(child => child.id), [...children])
    // eslint-disable-next-line
    const depList = useCallback(() => buildDepListFromCheckListItemIDs(depIDs), [checkListItems])
    // set the derived value on initial render
    useEffect(
        () => { setDerivedCheckListItemValue(id, "some", depIDs) },
        // eslint-disable-next-line
        []
    )
    // set the derived value when something changes
    useEffect(
        () => { setDerivedCheckListItemValue(id, "some", depIDs) },
        // eslint-disable-next-line
        [depList]
    )

    const changeHandler = (event) => {
        const selected = event.target.value
        const notSelected = depIDs.filter(dep => dep !== selected)
        notSelected.forEach(id => setChecked(id, false))
        if ("" !== selected) {
            setChecked(selected, true)
        }
    }

    return (
        <li>
            <CheckmarkIcon checked={isChecked(id)} />
            <i>{label}</i>
            <ul>
                <li>
                    <select
                        id={id}
                        onChange={changeHandler}
                        className="form-control"
                    >
                        <option value="">----</option>
                        {children.map(child => (
                            <option key={child.id} value={child.id} selected={isChecked(id)}>{child.label}</option>
                        ))}
                    </select>
                </li>
            </ul>
        </li>
    )
}

export const SelectOneOrMore = ({id, label, checkedWhen, children}) => {

    const {
        buildDepListFromCheckListItemIDs,
        checkListItems,
        isChecked,
        setDerivedCheckListItemValue
    } = useContext(ScenarioContext)
    // eslint-disable-next-line
    const depIDs = useMemo(() => children.map(child => child.id), [...children])
    // eslint-disable-next-line
    const depList = useMemo(() => buildDepListFromCheckListItemIDs(depIDs), [checkListItems])
    // set the derived value on initial render
    useEffect(
        () => { setDerivedCheckListItemValue(id, checkedWhen, depIDs) },
        // eslint-disable-next-line
        []
    )
    // set the derived value when something changes
    useEffect(
        () => {setDerivedCheckListItemValue(id, checkedWhen, depIDs)},
        // eslint-disable-next-line
        [...depList]
    )

    return (
        <li>
            <CheckmarkIcon checked={isChecked(id)} />
            <i>{label}</i>
            <ul>
                {children.map((child) =>
                    <li key={child.id}><IntvFormItem item={child} /></li>
                )}
            </ul>
        </li>
    )
}


export const IntvFormItem = ({ item }) => {
    // eslint-disable-next-line
    const { toggleChecked, someChecked } = useContext(ScenarioContext)

    switch (item.type) {
        case "select-one":
            return (
                <SelectOne
                    id={item.id}
                    label={item.prompt}
                    children={item.children}
                />
            )
        case "select-one-or-more":
            return (
                <SelectOneOrMore
                    id={item.id}
                    label={item.prompt}
                    checkedWhen={item.checkedWhen}
                    children={item.children}
                />
            )
        case "derived-value":
            return (
                <DerivedValue
                    id={item.id}
                    checkedWhen={item.checkedWhen}
                    children={item.children}
                />
            )
        case "checkbox":
            return (
                <FormCheckBox
                    id={item.id}
                    label={item.label}
                    clickHandler={toggleChecked}
                />
            )
        case "nested-form":
            return (
                <li>
                    <NestedForm
                        id={item.id}
                        label={item.label}
                        checkedWhen={item.checkedWhen || "some"}
                        children={item.children}
                    />
                </li>
            )
        case "prompt":
            return (<li><i>{item.label}</i></li>)
        default:
            return (<p>placeholder for unhandled item type</p>)
    }
}

export const IntvForm = ({ data }) => {
    const {id, label, checkedWhen, children} = data
    const {
        buildDepListFromCheckListItemIDs,
        checkListItems,
        isChecked,
        setDerivedCheckListItemValue
    } = useContext(ScenarioContext)
    // eslint-disable-next-line
    const depIDs = useMemo(() => children.map(child => child.id), [...children])
    // eslint-disable-next-line
    const depList = useMemo(() => buildDepListFromCheckListItemIDs(depIDs), [checkListItems])
    // set derived value on initial render
    useEffect(
        () => { setDerivedCheckListItemValue(id, checkedWhen, depIDs)},
        // eslint-disable-next-line
        []
    )
    // set derived value whenever something changes
    useEffect(
        () => { setDerivedCheckListItemValue(id, checkedWhen, depIDs) },
        // eslint-disable-next-line
        [depList]
    )

    return (
        <div>
            <span className="h5">
                <DoneIcon checked={isChecked(id)} />
                {label}
            </span>
            <hr className="minimal"/>
            <ul>
                {children.map((rec) =>
                    <IntvFormItem key={rec.id} item={rec} />
                )}
            </ul>
        </div>
    )
}
