import React  from 'react';
import "./style.css";

const RepoDisplay = ({title, description, link, removeFunc, id}) => {
    return (
        <div className="repo-display">
            <strong>{title}</strong>
            {(description != null && description.length > 0) ? (<p>{description}</p>) : null}
            <a href={link} target='_blank'>Go to repository</a>
            <button onClick={ () => removeFunc(id)}>Remove</button>
            <hr/>
        </div>
    );
};

export {RepoDisplay};