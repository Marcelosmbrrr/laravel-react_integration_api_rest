import * as React from 'react';

export function Profile({...props}){

    React.useEffect(() => {
        props.setPage("Profile");
    });

    return (
        <>
            <h1>PROFILE</h1>
        </>
    )
}