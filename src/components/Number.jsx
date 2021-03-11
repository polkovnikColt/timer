import React from 'react';
import '../App.css'

export const Number = ({number}) => {
    return (
        <div className="number">
            {number < 10 ? 0 : null}
            {number}
        </div>
    )
}