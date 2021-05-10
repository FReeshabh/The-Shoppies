import React from 'react'
import '../App.css'

export default function Movie({id, title, year, img, plot}) {
    return (
        <div className="Movie">
            <img src={img} height="166.5px" width="112.5px" alt={title}></img>
            <h4>{title}({year})</h4>
        </div>
    )
}

