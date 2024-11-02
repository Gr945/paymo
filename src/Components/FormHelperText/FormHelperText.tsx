import { useMemo } from 'react';
import { FormHelperText as MuiFormHelperText, SxProps, Theme } from '@mui/material';

interface IProps {
    error: string | undefined;
    touched: boolean | undefined;
    sx?: SxProps<Theme>;
}

export function FormHelperText(props: IProps) {
    const helperText = useMemo(() => {
        if (props.touched && props.error) {
            return props.error;
        }
    }, [props.touched, props.error]);

    return <MuiFormHelperText sx={{color: 'red'}}>{helperText}</MuiFormHelperText>;
}
