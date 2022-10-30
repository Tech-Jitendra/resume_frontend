import React, {useState} from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { MdSearch } from "react-icons/md"

import '../styles.scss';

interface Props {
    options: Array<string>;
    checkedItems: Array<string>;
    setCheckedItems: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
    searchable?: boolean;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
    searchValue?: string;
    name: string;
}


const SelectDropdownCheck: React.FC<Props> = ({
    searchable, handleSearch, searchValue, options, checkedItems, setCheckedItems, name }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(false)
    
   

    return (
        <div className="dropdown-container">

            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="dropdown-btn d-flex fw-bold justify-content-between align-items-center">

                <div className={`fw-bold`}>
                    {checkedItems.length === 0
                        ? "Tap to select..."
                        :
                        checkedItems.map((item, index) => {
                            return index === checkedItems.length - 1
                                ? <span key={item + '-' + index} className="fw-bold primary-color">{item}</span>
                                : <span key={item + '-' + index} className="fw-bold primary-color">{item + ', '}</span>
                        })

                    }
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
                        {options.map((option, index) => {
                           
                            return (
                                <div
                                    key={`${index}`}
                                    className={`select-item d-flex  justify-content-between `}
                                >
                                    {option}

                                    <span className="round-checkbox">
                                        <input type="checkbox"
                                            onChange={(e) => {setCheckedItems(index, e) }}
                                            className="checkbox-input" id={`${index}-box`} value={option} name={name} checked={checkedItems.includes(option)} />
                                        <label htmlFor={`${index}-box`} ></label>
                                    </span>
                                </div>
                            )
                        })}
                        {searchable && <button
                            onClick={(e) => setIsOpen(false)}
                            className={`oss-primary-btn w-100 fw-normal ${checkedItems.length === 0 && 'disabled-btn'}`}>Select</button>}
                    </div>
                )
            }
        </div>
    )
}

export default SelectDropdownCheck;
