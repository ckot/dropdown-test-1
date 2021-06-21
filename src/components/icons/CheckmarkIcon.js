import React from "react"

import classnames from "classnames"

const CheckmarkIcon = ({checked, uncheckedClassname = "invisible"}) => {

    return (
        <span className={classnames("material-icons-outlined", !checked ? uncheckedClassname : "")}>
            check
        </span>
    )
}

export default CheckmarkIcon


