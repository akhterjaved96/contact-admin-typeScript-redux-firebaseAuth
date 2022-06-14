import React from 'react';
import Login from "../../auth/Login";
interface IProps{}

let Home:React.FC<IProps> = () => {
    return (
        <>
            <div className="landing">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
                        <Login/>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Home;