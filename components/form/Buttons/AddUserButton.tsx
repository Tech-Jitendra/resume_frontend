import React from 'react'
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";

import './styles.scss';


const AddUserButton = () => {
    const plusSign =
        <div className="ms-2 me-3 icon-container">
            <span className="icon">
                <MdAddCircle color='#23AD83' size='2em' className="m-0" />
            </span>
        </div>
    return (
        <Link to="users/new" className="d-flex btn align-items-center secondary-color adduser-btn" >
            {plusSign}
            <span className="text-bold-700">Add new user</span>
        </Link>
    )
}
export default AddUserButton;
