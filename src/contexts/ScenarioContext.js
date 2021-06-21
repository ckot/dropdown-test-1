import React, {
    useState,
    // useEffect,
    // useContext
} from "react"

// import { db } from "@meddbriefer/mdb-firebase"

// import { AuthContext } from '@meddbriefer/mdb-auth'

export const ScenarioContext = React.createContext()

export const ScenarioProvider = ({scenario, defaultValues, children}) =>{

    // const { currentUser, getUserData, isAuthenticated, saveUserData } = useContext(AuthContext)
    // const [currentNode, setCurrentNode] = useState(defaultValues.currentNode)
    // const [currentAssessmentFinding, setCurrentAssessmentFinding] = useState(null)
    const [checkListItems, setCheckListItems] = useState(defaultValues.checkListItems)
    // const [criticalCriteria, setCriticalCriteria] = useState(defaultValues.criticalCriteria)
    const [showInterventionForm, setShowInterventionForm] = useState(defaultValues.showForm)
    // const [currentVitals, setCurrentVitals] = useState(defaultValues.vitals)
    // const [vitalsRecomputed, setVitalsRecomputed] = useState(defaultValues.vitalsRecomputed)
    const [currentInterventionForm, setCurrentInterventionForm] = useState(null)

    // const [started, setStarted] = useState(false)
    // const [paused, setPaused] = useState(false)
    // const [timestamp, setTimestamp] = useState(0)
    // const [timers, setTimers] = useState([{id: 'scenario', duration: scenario.info.maxTime * 60, action:{type: "timeExpired", payload: "time expired"}, timeRemaining: scenario.info.maxTime * 60, expired: false}])
    // const [timerError, setTimerError] = useState(null)
    // const [actionsQueue, setActionsQueue] = useState([])

    const [collapsed, setCollapsed] = useState({});

    // const [showScenarioComplete, setShowScenarioComplete] = useState(false)

    // expose accesor rather than timestamp, in effect making it a private variable
    // const getTimestamp = () => timestamp
    const getTimestamp = () => Date.now()
    // const clearTimerError = () => setTimerError(null)

    // useEffect(() => {
    //   const interval = setInterval(() => tick(), 1000)
    //   // cleanup interval
    //   return () => {
    //     clearInterval(interval)
    //   }
    // })

    // useEffect(() => {
    //     if (Object.keys(actionsQueue).length !== 0) {
    //         let currActionString = actionsQueue[0].type;
    //         let currActionPayload = actionsQueue[0].payload;
    //         let currAction = ACTIONS[currActionString];

    //         currAction(currActionPayload);
    //     }
    // }, [actionsQueue])

    // Save scenario state
    // useEffect(
    //     () => {
    //         // as both class components .setState() and functional components useState() setters
    //         // both actually queue the setting of state, as an performance optimization for when
    //         // there are individual requests for state changes made in a relatively short period
    //         // of time,  making use of a useEffect() with a dependency array of all state variables
    //         // we're interested in persisting to the db is a perfect place to capture when they
    //         // have actually been changed, and thus persist those changes.  since we're not hooked
    //         // up to the db yet, I'm merely console.log()ing that things have changed, and listing
    //         // what state we'll be persisting to the db.
    //         saveUserData(scenario.id, {
    //             currentAssessmentFinding,
    //             checkListItems,
    //             criticalCriteria,
    //             showInterventionForm,
    //             currentVitals,
    //             vitalsRecomputed
    //         });
    //     },
    //     [
    //         currentAssessmentFinding,
    //         checkListItems,
    //         criticalCriteria,
    //         showInterventionForm,
    //         currentVitals,
    //         vitalsRecomputed
    //     ]
    // )

    // Load and apply scenario state
    // useEffect(() => {
    //     // isAuthenticated &&
    //     getUserData()
    //         .then(res => {
    //             let state = res[scenario.id];

    //             // Set all states
    //             setCurrentAssessmentFinding(state.currentAssessmentFinding);
    //             setCheckListItems(state.checkListItems);
    //             setCriticalCriteria(state.criticalCriteria);
    //             setShowInterventionForm(state.showInterventionForm);
    //             setCurrentVitals(state.currentVitals);
    //             setVitalsRecomputed(state.vitalsRecomputed);
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    // const tick = () => {
    //     if (started && !paused) {
    //         setTimestamp(timestamp + 1);  // Increase the timestamp by 1 if the timers have been started and are not paused
    //         const newTimers = timers.map((timer) => {
    //             const newTimer = Object.assign(timer)
    //             if (!timer.expired) {
    //                 if (timer.timeRemaining === 1) {
    //                     newTimer.expired = true
    //                     if (newTimer.action != null) {  // != instead of !== is intentional
    //                         const newActionsQueue = actionsQueue.slice();
    //                         newActionsQueue.push(newTimer.action);
    //                         setActionsQueue(newActionsQueue);
    //                     }
    //                 }
    //                 newTimer.timeRemaining--
    //             }
    //             return newTimer
    //         })
    //         setTimers(newTimers)
    //     }
    // }

    // const registerTimer = (id, duration, action = null, timeRemaining = null, expired = false) => {
    //     timeRemaining = timeRemaining ?? duration
    //     const found = timers.find((timer) => timer.id === id)
    //     if (found) {
    //         setTimerError(`ERROR: timer: "${id}" already registered`)
    //     } else {
    //         const newTimers = timers.slice()
    //         newTimers.push({ id, duration, action, timeRemaining, expired })
    //         setTimers(newTimers)
    //     }
    // }

    // const cancelTimer = (id) => {
    //     const found = timers.find((timer) => timer.id === id);
    //     if (found) {
    //         let newTimers = timers.filter(timer => timer.id != id);  // Returns an array with everything except the removed timer
    //         setTimers(newTimers);
    //     } else {
    //         setTimerError(`ERROR: timer: "${id}" not found`)
    //     }
    // }

    // // Actions begin
    // const timeExpired = (payload) => {
    //     // alert(payload);
    //     console.log(payload)
    // }

    // const bar = () => {
    //     alert("bar");
    // }

    // const ACTIONS = {
    //     "timeExpired": timeExpired,
    //     "bar": bar
    // }
    // // Actions end


    const setCollapsedValue = (id, boolVal) => {
        setCollapsed(prevState => ({
            ...prevState, [id]: boolVal
        }))
    }

    const toggleCollapsed = (id) => {
        setCollapsedValue(id, !getCollapsed(id));
    }

    const getCollapsed = (id) => {
        return collapsed[id];
    }

    const isChecked = (id) => {
        return !!checkListItems[id]
    }

    const setChecked = (id, boolVal) => {
        const newValue = boolVal ? getTimestamp() : false
        setCheckListItems(prevState => ({
            ...prevState, [id]: newValue
        }))
    }

    const toggleChecked = (id) => {
        setChecked(id, !isChecked(id))
    }

    const someChecked = (ids) => {
        const result = ids.some(id => isChecked(id))
        console.log(`someChecked(${ids}): ${result}`)
        return result
    }

    const allChecked = (ids) => {
        const result = ids.every(id => isChecked(id))
        console.log(`allChecked(${ids}): ${result}`)
        return result
    }

    // const isCurrentAssessmentFinding = (id) => {
    //     return !!currentAssessmentFinding && currentAssessmentFinding === id
    // }

    // const toggleAssessmentFinding = (id) => {
    //     const stepIsChecked = isChecked(id)
    //     setCurrentAssessmentFinding(!stepIsChecked ? id : null)
    //     toggleChecked(id)
    // }

    const shouldDisplayInterventionForm = (id) => {
        return Object.keys(showInterventionForm).includes(id) && showInterventionForm[id]
    }

    const setDisplayInterventionForm = (id, boolVal) => {
        setShowInterventionForm(prevState => ({
            ...prevState, [id]: boolVal
        }))
    }

    const toggleDisplayInterventionForm = (id) => {
        setDisplayInterventionForm(id, !showInterventionForm[id])
    }

    // const setVital = (vital, value) => {
    //     setCurrentVitals(prevState => ({
    //         ...prevState, [vital]: value
    //     }))
    // }

    // const saveScenarioToLog = (label = "") => {
    //     const docRef = db.collection("logs").doc()
    //     let data = {
    //         userName: currentUser.email,
    //         scenario: scenario.id,
    //         label: label,
    //         timestamp: Date().toLocaleString()
    //     }
    //     let idsAndTimestamps = []
    //     Object.keys(checkListItems).forEach(id => {
    //         if (isChecked(id)) {
    //             const ts = checkListItems[id]
    //             idsAndTimestamps.push({id: id, timestamp: ts})
    //         }
    //     });
    //     idsAndTimestamps.sort((recA, recB) => recA.timestamp - recB.timestamp)
    //     data["events"] = idsAndTimestamps
    //     // console.log(JSON.stringify(data, null, 4))
    //     docRef.set(data)
    // }

    const buildDepListFromCheckListItemIDs = (ids) => ids.map(id => isChecked(id))

    const setDerivedCheckListItemValue = (id, depChecker, deps) => {
        const currVal = isChecked(id)
        const newVal = ("all" === depChecker) ? allChecked(deps) : someChecked(deps)
        // don't update checkListItems if we don't have an actual change
        if (currVal !== newVal) {
            console.log(`setDerivedCheckListItemValue(${id}, "${depChecker}", [${deps}]): ${newVal}`)
            setChecked(id, newVal)
        }
    }

    // const evalIDExpression = (exp) => {
    //     exp = exp.replace(/AND/gi, ' && ')
    //         .replace(/OR/gi, ' || ')
    //         .replace(/NOT\s*/gi, ' !');
    //     const re = /[\w][-\w]*/gi;
    //     const matches = exp.matchAll(re);
    //     for (let match of matches) {
    //         exp = isChecked(match)
    //             ? exp.replace(match, 'true')
    //             : exp.replace(match, 'false');
    //     }
    //     return eval(exp)
    // }

    return (
        <ScenarioContext.Provider
            value={{
                scenario,
                checkListItems,
                isChecked,
                setChecked,
                toggleChecked,
                someChecked,
                allChecked,
                // isCurrentAssessmentFinding,
                // toggleAssessmentFinding,
                shouldDisplayInterventionForm,
                setDisplayInterventionForm,
                currentInterventionForm,
                setCurrentInterventionForm,
                toggleDisplayInterventionForm,
                // setCriticalCriteria,
                // currentVitals,
                // setVital,
                // vitalsRecomputed,
                // setVitalsRecomputed,
                // started,
                // setStarted,
                // paused,
                // setPaused,
                // getTimestamp,
                // timers,
                // timerError,
                // actionsQueue,
                // registerTimer,
                // cancelTimer,
                // clearTimerError,
                // setTimerError,
                setCollapsedValue,
                toggleCollapsed,
                getCollapsed,
                // showScenarioComplete,
                // setShowScenarioComplete,
                // saveScenarioToLog,
                buildDepListFromCheckListItemIDs,
                setDerivedCheckListItemValue
            }}
        >
            {children}
        </ScenarioContext.Provider>
    )
}