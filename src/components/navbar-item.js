import React from 'react';

export default function NavBarItem( {render, ...props}) {

    if(!render) return false;

    return (
        <li className="nav-item">
            <a onClick={props.onClick} className="nav-link" href={props.href}>
                {props.label}
            </a>
        </li>
    );
}