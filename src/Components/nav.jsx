import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons'

const Nav = ({setLibrary , isLibrary ,darkModeHandler}) => {
    return ( 
        <nav>
            <h1>Waves</h1>
            <div className="xyz">
            <button className="xyz" onClick={()=>{setLibrary(!isLibrary)}}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
            <button className="xyz" onClick={darkModeHandler}>
          Dark
        </button>
        </div>
        </nav>
     );
}
 
export default Nav;
