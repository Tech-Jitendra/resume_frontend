import React from "react";
import './styles.scss';

interface Props {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: string;
    className?: string;
    disabled?: boolean;
    btnSize?: string;
    type: any;
}

const Button = ({
    onClick,
    btnSize,
    children,
    type,
    disabled,
    className,
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`oss-btn ${className}  ${disabled ? 'disabled-btn' : ''}`}
        >
            {children}
        </button>
    )
}

export default Button;