import React from 'react';

interface HeaderTitleProps {
    title: string;
}

function HeaderTitle(props: HeaderTitleProps) {
    return (
        <div className="header-title">
            <span>{props.title}</span>
        </div>
    );
}

export default HeaderTitle;