import React from 'react'

export default function Separator(props) {
    return (
        <div>
            <div className="separator" style={{ backgroundImage: `url( ${props.url} )` }}>
                <div className="filters">
                <div className="text">{props.text}</div>

                </div>
            </div>
        </div>
    )
}
