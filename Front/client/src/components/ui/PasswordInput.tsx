"use client";

import { useState } from "react";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    OutlinedInputProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = Omit<OutlinedInputProps, 'error'> & {
    label?: string;
    error?: boolean;
    helperText?: string;
};

const PasswordInput = ({ label, helperText, error, ...rest }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent) => event.preventDefault();
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{ my: 1 }} error={error}>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...rest}
            />
            {helperText && (
                <p style={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: "4px", marginLeft: "16px" }}>{helperText}</p>
            )}
        </FormControl>
    );
};

export default PasswordInput;
