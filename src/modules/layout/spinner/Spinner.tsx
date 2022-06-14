import React from 'react';
import spinnerImage from '../../../assets/loading.gif';

interface IProps{}

let Spinner:React.FC<IProps> = () => {
    return (
        <>
            <img src={spinnerImage} alt="" className="d-block m-auto"/>
        </>
    )
};
export default Spinner;