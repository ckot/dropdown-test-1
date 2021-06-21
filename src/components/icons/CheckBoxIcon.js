import React from "react"

const CheckBoxIcon = ({checked = false}) => {

    return (
        <span
            className="checkbox-icon material-icons-outlined"
        >
            {checked ? "check_box" : "check_box_outline_blank"}
        </span>
    )
}

export default CheckBoxIcon