import React from "react"

const ChevronIcon = ({expand = false}) => {

    return (
        <span
            className="chevron-icon material-icons-outlined"
        >
            {expand ? "arrow_drop_down  " : "arrow_right"}
        </span>

    )
}

export default ChevronIcon