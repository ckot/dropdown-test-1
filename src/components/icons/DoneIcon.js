import React from "react"

import classnames from "classnames"

const DoneIcon = ({ checked = false }) => {

    return (
        <span className={classnames("checkbox-icon", "material-icons-outlined", { "invisible": !checked })}>
            done_all
        </span>
    )
}

export default DoneIcon