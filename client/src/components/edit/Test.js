import { Button, Chip, FormControl, Switch, TextField } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const Form = ({ handleClose }) => {
    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            title: 'a',
            description: 'asd',
            status: true
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error }
                }) => (
                    <FormControl fullWidth variant="filled">
                        <TextField
                            label="Title"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    </FormControl>
                )}
                rules={{ required: 'Title is required' }}
            />
            <Controller
                sx={{
                    marginTop: '1rem'
                }}
                name="description"
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error }
                }) => (
                    <FormControl fullWidth variant="filled">
                        <TextField
                            label="Description"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            multiline
                            maxRows={5}
                            helperText={error ? error.message : null}
                        />
                    </FormControl>
                )}
            />
            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <Switch {...field} checked={field.value} />
                )}
            />
            {watch('status') ? (
                <Chip label="Published" color="success" variant="outlined" />
            ) : (
                <Chip label="Draft" color="primary" variant="outlined" />
            )}
            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </div>
        </form>
    );
};

export default Form;
