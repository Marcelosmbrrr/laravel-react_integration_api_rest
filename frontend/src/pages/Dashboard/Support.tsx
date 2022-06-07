import * as React from 'react';

export function Support({...props}) {

    React.useEffect(() => {
        props.setPage("Support");
    });

    return (
        <>
            <h1>SUPPORT</h1>
        </>
    )
}