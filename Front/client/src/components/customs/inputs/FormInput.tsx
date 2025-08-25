import PasswordInput from '@/components/ui/PasswordInput'
import { TextField } from '@mui/material'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface FormInputProps {
    header?: string;
    label?: string;
    name: string;
    field: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    id?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    header,
    label,
    field,
    name,
    type,
    register,
    errors,
    id,
}) => {
    return (
        <div>
            <label className="text-gray-900 font-medium" htmlFor={field}>
                <span className="cursor-pointer">{header}</span>
            </label>
            {
                type === "password" ? (
                    <PasswordInput
                        label="Şifrə"
                        error={!!errors[name]}
                        helperText={errors[name]?.message as string}
                        {...register(name)}
                    />
                ) : (
                    <TextField
                        label={label}
                        type={type || 'text'}
                        fullWidth
                        id={id || field}
                        margin="normal"
                        {...register(name)}
                        error={!!errors[name]}
                        helperText={errors[name]?.message as string}
                    />
                )
            }
        </div>
    )
}

export default FormInput;
