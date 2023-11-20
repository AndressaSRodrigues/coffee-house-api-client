import { useForm, Controller } from 'react-hook-form';
import { FormControl, TextField, Button, Stack, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editUser, getUserById } from '../../../services/users';
import { useAuth } from '../../../context/AuthContext';
import { Users } from '../../../interfaces/Users';

export default function EditUser() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { token } = useAuth();
    const { id } = useParams();
    const [data, setData] = useState<Users | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(token, id)
            .then((user: Users) => {
                setData(user);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token, id]);

    type FormData = {
        email: string;
        password: string;
        role: string;
    };

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

            const updatedData: Record<string, string> = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value.trim() !== '')
            );

            await editUser(token, id, updatedData);
            console.log(updatedData)
            navigate('/manage');
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
            <h1>Edit User</h1>
            <h2>Current Information:</h2>
            <span>{data ? data.email : 'Loading info...'}</span><br />
            <span>{data ? data.role : null}</span>
            <h2>New Information:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={2} width={400}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ pattern: /^\S+@\S+$/i }}
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
                                        <Typography style={{ color: 'red' }} variant="caption" color="textSecondary">{fieldState.error.message}</Typography>
                                    )}
                                </>
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Editing user...' : 'Edit User'}
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                        <span>{message}</span>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};