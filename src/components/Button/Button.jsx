import React from 'react';

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={props.className} style={props.style}>{props.text}</button>
    );
};

export default Button;