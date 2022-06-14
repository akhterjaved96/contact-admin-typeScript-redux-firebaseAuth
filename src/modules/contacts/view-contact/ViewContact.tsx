import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Spinner from "../../layout/spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import * as contactActions from '../../../store/contacts/contact.actions';
import * as contactReducer from '../../../store/contacts/contacts.feature';
import {AppDispatch} from "../../../store/store";

interface IProps{}
interface ContactStore{
    contactFeature : contactReducer.InitialState
}

let ViewContact:React.FC<IProps> = () => {
    let {contactId} = useParams(); // url parameters

    let dispatch:AppDispatch = useDispatch();

    // get the data from Redux store
    let contactState = useSelector((store:ContactStore) => {
        return store.contactFeature;
    });

    useEffect(() => {
        if(contactId){
            dispatch(contactActions.fetchContact(contactId)); // get a contact
            dispatch(contactActions.fetchGroup(contactId)); // get a group
        }
    }, [dispatch, contactId]);

    let {loading, contact, errorMessage, group} = contactState;
    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">View Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                                atque consequuntur culpa cupiditate fugit libero molestias nemo neque nihil, nulla optio
                                possimus praesentium quasi repudiandae saepe sed sit, vitae! Nobis!</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading && Object.keys(contact).length === 0 && Object.keys(group).length === 0 ? <>
                    <Spinner/>
                </> : <> </>
            }

            {
                !loading && errorMessage ? <>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col">
                                <p className="h4 text-danger text-center">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </> : <> </>
            }

            <div className="container">
                <div className="row">
                    {
                        !loading && Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                        <div className="col-sm-8">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-sm-5 text-center">
                                            <img src={contact.photo} alt=""
                                                 className="contact-img-big"/>
                                        </div>
                                        <div className="col-sm-7">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    Name : <span className="fw-bold">{contact.name}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Mobile : <span className="fw-bold">{contact.mobile}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Email : <span className="fw-bold">{contact.email}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Company : <span className="fw-bold">{contact.company}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Title : <span className="fw-bold">{contact.title}</span>
                                                </li>
                                                <li className="list-group-item">
                                                    Group : <span className="fw-bold">{group.name}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <Link to={'/contacts/admin'} className="btn btn-success">
                            <i className="fa fa-arrow-alt-circle-left"/> Back</Link>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ViewContact;