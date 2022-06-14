import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Spinner from "../../layout/spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import * as contactActions from '../../../store/contacts/contact.actions';
import * as contactReducer from '../../../store/contacts/contacts.feature';
import {IContact} from "../../../models/IContact";
import {IGroup} from "../../../models/IGroup";
import {AppDispatch} from "../../../store/store";

interface ContactStore{
    contactFeature : contactReducer.InitialState
}
interface IState{
    loading: boolean;
    contact: IContact;
    groups: IGroup[],
    errorMessage: string | null
}

interface IProps{}

let AddContact:React.FC<IProps> = () => {
    let dispatch:AppDispatch = useDispatch();
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

    let updateInput = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    };

    useEffect(() => {
        dispatch(contactActions.fetchAllGroups());
    }, [dispatch]);

    useEffect(() => {
        if (contactState.groupList.length > 0) {
            setState({
                ...state,
                groups: contactState.groupList
            })
        }
    }, [contactState.groupList])

    let submitCreate = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(contactActions.createContact(state.contact)).then(() => {
            navigate('/contacts/admin');
        });
    };

    let {contact, groups} = state; // local state
    let {loading, errorMessage} = contactState; // redux
    return (
        <>
            <div className="grid mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success">Add Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                                atque consequuntur culpa cupiditate fugit libero molestias nemo neque nihil, nulla optio
                                possimus praesentium quasi repudiandae saepe sed sit, vitae! Nobis!</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading && groups.length === 0 ? <>
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
                    <div className="col-sm-4">
                        <form onSubmit={submitCreate}>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="name"
                                    value={contact.name}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Name"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="photo"
                                    value={contact.photo}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Photon Url"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="mobile"
                                    value={contact.mobile}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Mobile"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="email"
                                    value={contact.email}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
                                    name="company"
                                    value={contact.company}
                                    onChange={updateInput}
                                    type="text" className="form-control" placeholder="Company"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    required={true}
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
                                <input type="submit" className="btn btn-success me-2" value="Create"/>
                                <Link to={'/contacts/admin'} className="btn btn-dark">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-3">
                        <img src={contact.photo} alt="" className="contact-img-big rounded-circle"/>
                    </div>
                </div>
            </div>
        </>
    )
};
export default AddContact;