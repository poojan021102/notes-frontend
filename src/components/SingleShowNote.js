import React from 'react'

function SingleShowNote({note, created_at, title}) {
    return (
        <div>
            <div className="card" style={{"width": "18rem;"}}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{created_at.split('T')[0]}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{created_at.split('T')[1].split('.')[0]}</h6>
                    <p className="card-text">{note}...</p>
                </div>
            </div>
        </div>
    )
}

export default SingleShowNote