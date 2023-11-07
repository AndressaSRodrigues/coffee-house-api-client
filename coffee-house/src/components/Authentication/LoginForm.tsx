import { useForm, Controller } from 'react-hook-form'
import { FormControl, TextField, Button, Stack } from '@mui/material'
import { auth } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type FormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const navigateTo = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            const response = await auth(data.email, data.password);
            const role = response.user.role;
            localStorage.setItem('token', response.accessToken);
            switch (role) {
                case 'admin': navigateTo('/manage');
                    break;
                case 'waiter': navigateTo('/fronthouse');
                    break;
                case 'chef': navigateTo('/backhouse');
                    break;
            }
        } catch (error) {
            const errorMessage = error instanceof Error 
            ? `${error.message}. Please, check your credentials.` 
            : 'An error occurred';
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h2>Login</h2>
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
                        <span>{errorMessage}</span>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Loggin in...' : 'Login'}
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};
