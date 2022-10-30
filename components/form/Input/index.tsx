import React from 'react';
import './styles.scss';

interface Props {
    onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    className?: string;
}
const Input: React.FC<Props> = (
    { type, placeholder, onChange, name, value, className }
) => {
    return (
        <input type={type}
            className={`input-field ${className}`}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input;