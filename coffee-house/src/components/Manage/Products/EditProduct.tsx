import { useForm, Controller } from 'react-hook-form';
import { FormControl, TextField, Button, Stack, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editProduct, getProductById } from '../../../services/products';
import { useAuth } from '../../../context/AuthContext';
import { Products } from '../../../interfaces/Products';

export default function EditProduct() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const { token } = useAuth();
    const { id } = useParams();
    const [data, setData] = useState<Products | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(token, id)
            .then((product: Products) => {
                setData(product);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token, id]);

    type FormData = {
        name: string;
        price: string;
        image: string;
        type: string;
    };

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

            const updatedData: Record<string, string> = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value.trim() !== '')
            );

            await editProduct(token, id, updatedData);
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
            <h1>Edit Product</h1>
            <h2>Current Information:</h2>
            <div>
                <span>{data ? data.name : null}</span>
                <span>{data ? data.price : null}</span>
                <img src={data ? data.image : undefined} alt={data ? data.name : undefined} width='200px' />
                <span>{data ? data.type : null}</span>
            </div>
            <h2>New Information:</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={2} width={400}>
                        <Controller
                            name="name"
                            control={control}
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
                            render={({ field, fieldState }) => (
                                <>
                                    <RadioGroup
                                        aria-label="role"
                                        name="role"
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
                            {isLoading ? 'Editing product...' : 'Edit Product'}
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                        <span>{message}</span>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};