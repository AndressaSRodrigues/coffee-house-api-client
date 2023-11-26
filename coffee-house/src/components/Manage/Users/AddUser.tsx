import { useForm, Controller } from 'react-hook-form';
import { FormControl, TextField, Button, Stack, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { createUser } from '../../../services/users';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type FormData = {
    email: string;
    password: string;
    role: string;
};

export default function AddUser() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { token } = useAuth();
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            role: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await createUser(token, data);
            navigate('/manage/users');
        } catch (error) {
            const errorMessage = 'Please, check the user information.';
            setMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const onCancel = () => {
        navigate('/manage/users')
    };

    return (
        <>
            <h2>New User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={2} width={400}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Email"
                                    type="email"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Password"
                                    type="password"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Role is required' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <RadioGroup
                                        aria-label="role"
                                        name="role"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    >
                                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="waiter" control={<Radio />} label="Waiter" />
                                        <FormControlLabel value="chef" control={<Radio />} label="Chef" />
                                    </RadioGroup>
                                    {fieldState.error && (
                                        <Typography style={{color: 'red'}} variant="caption" color="textSecondary">{fieldState.error.message}</Typography>
                                    )}
                                </>
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Adding user...' : 'Add User'}
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                        <span>{message}</span>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};
