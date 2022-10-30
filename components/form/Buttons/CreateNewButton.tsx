import React from 'react'
import { MdAddCircle } from "react-icons/md";
import './styles.scss';
import { Link } from 'react-router-dom';


const CreateNewButton = (props:any) => {
    const plusSign = 
                    <div className="ms-2 me-3 icon-container">
                        <span className="icon">
                            <MdAddCircle color='#23AD83' size='2em' className="m-0" />
                        </span>
                    </div>
    return (
            <Link to={props.link} className="d-flex btn align-items-center secondary-color create-new-btn">
                {plusSign}
                <span className="text-bold-700">Create New</span>                
            </Link>
    )
}
export default CreateNewButton;
