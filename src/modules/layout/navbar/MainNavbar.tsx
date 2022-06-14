import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import * as authReducer from "../../../store/auth/auth.feature";

interface IProps{
    title : string
}

let MainNavbar:React.FC<IProps> = ({title}) => {

    // get the state information from store
    let authState = useSelector((store:{authFeature:authReducer.InitialState}) => {
        return store.authFeature;
    })

    let {loading , errorMessage, currentUser} = authState;

    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand">{title}</Link>
                    <div className="navbar-collapse collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            {
                                currentUser && Object.keys(currentUser).length > 0 &&
                                <>
                                    <li className="nav-item px-2">
                                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                    <li className="nav-item px-2">
                                        <Link to="/contacts/admin" className="nav-link">Contacts</Link>
                                    </li>
                                </>
                            }
                            <li className="nav-item px-2">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};
export default MainNavbar;