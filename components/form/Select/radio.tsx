import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { MdSearch } from "react-icons/md"

import '../styles.scss';

interface Props {
    options?: Array<string>;
    selected?: string;
    setSelected?: (value: string) => void ;
    searchable?: boolean;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
    searchValue?: string;
    name: string;
    inputType?: string;
}


const SelectDropdownRadio: React.FC<Props> = ({ searchable, handleSearch,name, searchValue, setSelected, selected, options, inputType }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="dropdown-container">

            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="dropdown-btn d-flex fw-bold justify-content-between align-items-center">
                <div >
                    {selected === "" ? "Tap to select..." : <span className="fw-bold primary-color">{selected}</span>}
                </div>

                {isOpen ? <FaCaretUp className="dropdown-icon" /> : <FaCaretDown className="dropdown-icon" />}
            </button>
            {
                isOpen && (
                    <div className="dropdown-content">
                        {searchable && (
                            <div className="select-search-container">
                                <input
                                    type="text"
                                    className="select-search-input form-control"
                                    value={searchValue}
                                    onChange={handleSearch}
                                    name="search"
                                    placeholder="Search store" />

                                <MdSearch className="select-search-icon" />
                            </div>
                        )}
                        {options?.map((option, index) => {
                            return (
                                <div
                                    key={`${index}`}
                                    className={`select-item d-flex  justify-content-between `}
                                >
                                    {option}
                                    { inputType === "checkbox" ? 
                                        <span className="round-checkbox">
                                            <input type="checkbox"
                                                onChange={(e) => {
                                                    setSelected && setSelected(option);
                                                    setIsOpen(false);
                                                }}
                                                className="checkbox-input" id={`${index}-box`} value={option} name={name} checked={selected === option}/>
                                            <label htmlFor={`${index}-box`} ></label>
                                        </span>
                                    : 
                                        <input type="radio"
                                            onChange={() => {
                                                setSelected && setSelected(option);
                                                setIsOpen(false);
                                            }}
                                            className="form-check-input" value={option} name={name} checked={selected === option} />
                                    }
                                </div>
                            )
                        })}
                        {searchable && <button
                            onClick={(e) => setIsOpen(false)}
                            className="oss-primary-btn w-100 fw-normal">Select</button>}
                    </div>
                )
            }
        </div>
    )
}

export default SelectDropdownRadio;
