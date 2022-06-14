import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import Spinner from "../../layout/spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import * as contactActions from '../../../store/contacts/contact.actions';
import * as contactReducer from '../../../store/contacts/contacts.feature';
import {AppDispatch} from "../../../store/store";
import {IContact} from "../../../models/IContact";
import {IGroup} from "../../../models/IGroup";

interface IProps{}
interface ContactStore{
    contactFeature : contactReducer.InitialState
}
interface IState{
    loading: boolean;
    contact: IContact;
    groups: IGroup[];
    errorMessage: string | null;
}

let EditContact:React.FC<IProps> = () => {
    let dispatch:AppDispatch = useDispatch();
    let {contactId} = useParams();
    let navigate = useNavigate();

    // get the state data from redux store
    let contactState = useSelector((store:ContactStore) => {
        return store.contactFeature;
    })

    let [state, setState] = useState<IState>({
        loading: false,
        contact: {
            name: '',
            company: '',
            email: '',
            title: '',
            mobile: '',
            photo: '',
            groupId: ''
        },
        groups: [],
        errorMessage: null
    });

    useEffect(() => {
       if(contactId){
           dispatch(contactActions.fetchContact(contactId)); // get a contact
       }
       dispatch(contactActions.fetchAllGroups()); // get all groups
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(contactState.contact).length > 0) {
            setState({
                ...state,
                contact: {
                    ...state.contact,
                    name: contactState.contact.name ? contactState.contact.name : '',
                    photo: contactState.contact.photo ? contactState.contact.photo : '',
                    email: contactState.contact.email ? contactState.contact.email : '',
                    mobile: contactState.contact.mobile ? contactState.contact.mobile : '',
                    company: contactState.contact.company ? contactState.contact.company : '',
                    title: contactState.contact.title ? contactState.contact.title : '',
                    groupId: contactState.contact.groupId ? contactState.contact.groupId : '',
                }
            })
        }
    }, [contactState.contact]);

    useEffect(() => {
        if (contactState.groupList.length > 0) {
            setState({
                ...state,
                groups: contactState.groupList
            })
        }
    }, [contactState.groupList])

    let updateInput = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        });
    };

    let submitUpdate = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(contactId){
            let payload = {
                contact: state.contact,
                contactId: contactId
            }
            dispatch(contactActions.updateContact(payload)).then(() => {
                navigate('/contacts/admin');
            })
        }
    };

    let {loading, contact, groups, errorMessage} = state;

    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Edit Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                                atque consequuntur culpa cupiditate fugit libero molestias nemo neque nihil, nulla optio
                                possimus praesentium quasi repudiandae saepe sed sit, vitae! Nobis!</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading && groups.length === 0 && Object.keys(contact).length > 0 ? <>
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

            {
                !loading && Object.keys(contact).length > 0 &&
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={submitUpdate}>
                                <div className="mb-2">
                                    <input
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="photo"
                                        value={contact.photo}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Photon Url"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Mobile"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Company"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name="title"
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Title"/>
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name="groupId"
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select Group</option>
                                        {
                                            groups.length > 0 && groups.map(group => {
                                                return (
                                                    <option value={group.id} key={group.id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success me-2" value="Update"/>
                                    <Link to={'/contacts/admin'} className="btn btn-dark">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            <img src={contact.photo} alt="" className="contact-img-big rounded-circle"/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};
export default EditContact;