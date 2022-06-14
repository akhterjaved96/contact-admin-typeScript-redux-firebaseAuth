import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {IUser} from "../../models/IUser";
import {useDispatch, useSelector} from "react-redux";
import * as authActions from '../../store/auth/auth.actions';
import * as authReducer from '../../store/auth/auth.feature';
import {AppDispatch} from "../../store/store";

interface Props{}
interface IState{
    user : IUser
}

let Register:React.FC<Props> = ({}) => {
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    // get the state information from store
    let authState = useSelector((store:{authFeature:authReducer.InitialState}) => {
        return store.authFeature;
    })

    let {loading , errorMessage, currentUser} = authState;

    let [state , setState] = useState<IState>({
        user : {
            username : '',
            email : '',
            password : '',
            confirmPassword : ''
        }
    });

    let updateInput = (e:ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            user : {
                ...state.user,
                [e.target.name] : e.target.value
            }
        })
    };

    useEffect(() => {
        // after register success
        if(currentUser && Object.keys(currentUser).length  > 0){
            navigate('/');
        }
    }, [currentUser])

    let submitRegister = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(state.user.password !== state.user.confirmPassword){
            return;
        }
        dispatch(authActions.registerUser(state.user));
    };

    let {user} = state;
    return (
        <>
            <div className="landing">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
                        <div className="container">
                            {
                                errorMessage &&
                                <div className="row">
                                    <div className="col text-center text-white">
                                        <pre>{errorMessage.message}</pre>
                                    </div>
                                </div>
                            }
                            <div className="row">
                                <div className="col-sm-3 offset-5">
                                    <div className="card animate__animated animate__tada">
                                        <div className="card-header bg-success text-white">
                                            <img src="https://cdn-icons-png.flaticon.com/512/164/164600.png" alt="" style={{width: '100px'}}/>
                                            <p className="h4 mt-2">Register Here</p>
                                        </div>
                                            <div className="card-body bg-light text-start">
                                                <form onSubmit={submitRegister}>
                                                    <div className="mb-2">
                                                        <input
                                                            name={'username'}
                                                            onChange={updateInput}
                                                            value={user.username}
                                                            required={true}
                                                            type="text" className="form-control" placeholder="Username*"/>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            name={'email'}
                                                            onChange={updateInput}
                                                            value={user.email}
                                                            required={true}
                                                            type="text" className="form-control" placeholder="Email*"/>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            name={'password'}
                                                            onChange={updateInput}
                                                            value={user.password}
                                                            required={true}
                                                            type="password" className="form-control" placeholder="Password*"/>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            name={'confirmPassword'}
                                                            onChange={updateInput}
                                                            value={user.confirmPassword}
                                                            required={true}
                                                            type="password" className="form-control" placeholder="Confirm Password*"/>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input type="submit" className="btn btn-success" value="Register"/>
                                                    </div>
                                                </form>
                                                <span>Already have an account?
                                                    <Link to={'/'} className="fw-bold text-danger text-decoration-none"> Login</Link>
                                                </span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;