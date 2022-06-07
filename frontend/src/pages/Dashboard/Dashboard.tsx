import * as React from 'react';
// Material UI


export function Dashboard({...props}) {

    React.useEffect(() => {
        props.setPage("Dashboard");
    });

    return (
        <>
            <h1>DASHBOARD</h1>
        </>
    )
}