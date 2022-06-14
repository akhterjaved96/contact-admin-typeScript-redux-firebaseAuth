import React, {useEffect, useState} from 'react';
import * as authActions from '../../store/auth/auth.actions';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "../../store/store";
import * as authReducer from "../../store/auth/auth.feature";
import * as contactReducer from "../../store/contacts/contacts.feature";

interface IProps{}
interface ContactStore{
    contactFeature : contactReducer.InitialState
}

let Dashboard:React.FC<IProps> = () => {
    let [colleagueCount , setColleagueCount] = useState(0);
    let [friendCount , setFriendCount] = useState(0);
    let [familyCount , setFamilyCount] = useState(0);
    let [serviceCount , setServiceCount] = useState(0);
    let [communityCount , setCommunityCount] = useState(0);
    let [socialCount , setSocialCount] = useState(0);


    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    // get the state information from store
    let authState = useSelector((store:{authFeature:authReducer.InitialState}) => {
        return store.authFeature;
    })

    // get the state data from Redux store
    let contactState = useSelector((store:ContactStore) => {
        return store.contactFeature;
    });

    let {errorMessage, currentUser} = authState;
    let {loading, contactList} = contactState;

    let clickLogOut = () => {
        dispatch(authActions.logOutUser());
    };

    useEffect(() =>{
        if(currentUser){
            return;
        }
        navigate('/');
    } , [currentUser])

    useEffect(() => {
        setColleagueCount(contactList.filter(contact => contact.groupId === "1").length);
        setFriendCount(contactList.filter(contact => contact.groupId === "2").length);
        setFamilyCount(contactList.filter(contact => contact.groupId === "3").length);
        setServiceCount(contactList.filter(contact => contact.groupId === "4").length);
        setCommunityCount(contactList.filter(contact => contact.groupId === "5").length);
        setSocialCount(contactList.filter(contact => contact.groupId === "6").length);
    }, [contactList]);

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col d-flex justify-content-between align-items-center">
                        <div>
                            {
                                currentUser && currentUser.displayName &&
                                <p className="h3 text-success">Welcome {currentUser.displayName}!</p>
                            }

                            <p className="fst">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, doloremque, excepturi? Accusantium atque dolor doloribus necessitatibus nemo nobis officia quae reiciendis rem voluptatum. Dolorem in nam nisi optio quis ullam?</p>
                        </div>
                        <div>
                            <button className="btn btn-danger" onClick={clickLogOut}>LogOut</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5 bg-success text-white text-center">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <i className="fa fa-users fa-5x"/>
                                        <p className="h4 mt-2">Family</p>
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-light text-success">
                                            <p className="display-6 fw-bold p-3">{familyCount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5 bg-info text-white text-center">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <i className="fa fa-snowflake fa-5x"/>
                                        <p className="h4 mt-2">Colleagues</p>
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-light text-info">
                                            <p className="display-6 fw-bold p-3">{colleagueCount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5 bg-warning text-white text-center">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <i className="fa fa-book fa-5x"/>
                                        <p className="h4 mt-2">Friends</p>
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-light text-warning">
                                            <p className="display-6 fw-bold p-3">{friendCount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5 bg-danger text-white text-center">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <i className="fa fa-tools fa-5x"/>
                                        <p className="h4 mt-2">Service</p>
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-light text-danger">
                                            <p className="display-6 fw-bold p-3">{serviceCount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5 bg-dark text-white text-center">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <i className="fab fa-github fa-5x"/>
                                        <p className="h4 mt-2">Community</p>
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-light text-dark">
                                            <p className="display-6 fw-bold p-3">{communityCount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5 bg-primary text-white text-center">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <i className="fab fa-facebook-f fa-5x"/>
                                        <p className="h4 mt-2">Social</p>
                                    </div>
                                    <div className="col">
                                        <span className="badge bg-light text-primary">
                                            <p className="display-6 fw-bold p-3">{socialCount}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Dashboard;