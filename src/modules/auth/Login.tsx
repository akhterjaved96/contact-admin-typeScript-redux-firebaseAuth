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


let Login:React.FC<Props> = ({}) => {
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    // get the state information from store
    let authState = useSelector((store:{authFeature:authReducer.InitialState}) => {
        return store.authFeature;
    })

    let {loading , errorMessage, currentUser} = authState;

    let [state, setState] = useState<IState>({
        user : {
            email : '',
            password : ''
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
            navigate('/dashboard');
        }
    }, [currentUser])

    let submitLogin = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(state.user.email === '' && state.user.password === ''){
            return;
        }
        dispatch(authActions.loginUser(state.user));
    };

    let clickGoogleLogin = () => {
        // dispatch action
        dispatch(authActions.googleLogin());
    }

    let clickFacebookLogin = () => {
        // dispatch action
        dispatch(authActions.facebookLogin());
    }

    let {user} = state;
    return (
        <>
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
                                <p className="h4 mt-2">Login Here</p>
                            </div>
                            <div className="card-body bg-light text-start">
                                <form onSubmit={submitLogin}>
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
                                        <input type="submit" className="btn btn-success" value="Login"/>
                                        <button onClick={clickGoogleLogin} type="button" className="btn btn-danger ms-2"><i className="fab fa-google" /></button>
                                        <button onClick={clickFacebookLogin} type="button" className="btn btn-primary ms-2"><i className="fab fa-facebook" /></button>
                                    </div>
                                </form>
                                <span>Don't have an account?
                                    <Link to={'/auth/register'} className="fw-bold text-danger text-decoration-none"> Register</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;