import * as React from 'react';
// Material UI
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface Options {
    value: string,
    label: string
}

export interface Props {
    options: Array<Options>,
    row: boolean,
    event: any,
    name: string
}

export const RadioForm = React.memo((props: Props) => {

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name={props.name}
                row={props.row}
                onChange={props.event}
            >
                {props.options.map((item, index) =>
                    <FormControlLabel value={item.value} control={<Radio />} label={item.label} key={index} />
                )}
            </RadioGroup>
        </FormControl>
    );

});