import * as React from 'react';

export function Administration({...props}) {

    React.useEffect(() => {
        props.setPage("Administration");
    });

    return (
        <>
            <h1>ADMINISTRATION</h1>
        </>
    )
}