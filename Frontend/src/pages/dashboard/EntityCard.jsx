import React from 'react';
import { Link } from 'react-router-dom';

function EntityCard({ entity}) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card bg border">
                <div className="card-body">
                    <h2 className="card-title">{entity.title}</h2>
                    <p className="card-text fs-5">
                        <strong>Total Entries:</strong> {entity.totalEntries}<br />
                        {/* <strong>Rating:</strong> {entity.rating}<br /> */}
                    </p>
                    <Link to={entity.link} className="btn btn-primary">Open</Link>
                </div>
            </div>
        </div>
    );
}

export default EntityCard;