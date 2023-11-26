import { useForm, Controller } from 'react-hook-form';
import { FormControl, TextField, Button, Stack, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { createProduct } from '../../../services/products';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type FormData = {
    name: string;
    price: string;
    image: string;
    type: string;
};

export default function AddProduct() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { token } = useAuth();
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            name: '',
            price: '',
            image: '',
            type: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await createProduct(token, data);
            navigate('/manage/products');
        } catch (error) {
            const errorMessage = 'Please, check the product information.';
            setMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const onCancel = () => {
        navigate('/manage/products')
    };

    return (
        <>
            <h2>New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={2} width={400}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Name"
                                    type="text"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: 'Price is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Price"
                                    type="text"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="image"
                            control={control}
                            rules={{ required: 'Image is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Image URL"
                                    type="text"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: 'Type is required' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <RadioGroup
                                        aria-label="type"
                                        name="type"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    >
                                        <FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />
                                        <FormControlLabel value="lunch/dinner" control={<Radio />} label="Lunch/ Dinner" />
                                        <FormControlLabel value="drinks" control={<Radio />} label="Drinks" />
                                    </RadioGroup>
                                    {fieldState.error && (
                                        <Typography style={{ color: 'red' }} variant="caption" color="textSecondary">{fieldState.error.message}</Typography>
                                    )}
                                </>
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Adding product...' : 'Add Product'}
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                        <span>{message}</span>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};