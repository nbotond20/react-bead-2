import { useDispatch, useSelector } from 'react-redux';
import { clear, selectEdit, updateTasklist } from '../../state/edit/editSlice';
import {
    Alert,
    Button,
    Chip,
    FormControl,
    Paper,
    Snackbar,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import CardContainer from '../utils/CardContainer';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import {
    useCreateTaskListMutation,
    useModifyTaskListMutation
} from '../../state/takskslists/tasksListsApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

const Edit = () => {
    const dispatch = useDispatch();
    const editing = useSelector(selectEdit);

    const tasks = editing?.tasks
        ? editing?.tasks?.map((e) => ({
              id: e.id,
              title: e.title,
              description: e.description,
              notes: e.notes,
              points: e.points
          }))
        : [];

    const [createTaskList] = useCreateTaskListMutation();
    const [modifyTaskList] = useModifyTaskListMutation();

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const navigate = useNavigate();

    const { handleSubmit, control, watch, getValues } = useForm({
        defaultValues: {
            title: editing?.title ? editing?.title : '',
            description: editing?.description ? editing?.description : '',
            status: editing?.status ? editing?.status === 'published' : false
        }
    });

    const onError = (errors, e) => {
        setOpenErrorAlert(true);
    };

    const onSubmit = async (data) => {
        if (!editing?.createdAt) {
            await createTaskList({
                strategy: 'local',
                title: getValues('title'),
                description: getValues('description'),
                status: getValues('status') ? 'published' : 'draft',
                tasks: tasks?.map((e) => ({
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    notes: getValues(`task-notes[${e.id}]`),
                    points: parseInt(getValues(`task-points[${e.id}]`))
                }))
            }).unwrap();
        } else {
            await modifyTaskList({
                id: editing?.id,
                body: {
                    strategy: 'local',
                    title: getValues('title'),
                    description: getValues('description'),
                    status: getValues('status') ? 'published' : 'draft',
                    tasks: tasks?.map((e) => ({
                        id: e.id,
                        title: e.title,
                        description: e.description,
                        notes: getValues(`task-notes[${e.id}]`),
                        points: parseInt(getValues(`task-points[${e.id}]`))
                    }))
                }
            }).unwrap();
        }
        setOpenSuccessAlert(true);
        setTimeout(() => {
            navigate('/tasklists');
            dispatch(clear());
        }, 1000);
    };

    const onCancel = () => {
        dispatch(
            updateTasklist({
                taskList: {
                    id: editing?.id,
                    title: getValues('title'),
                    description: getValues('description'),
                    status: getValues('status') ? 'published' : 'draft',
                    createdAt: editing?.createdAt,
                    updatedAt: editing?.updatedAt,
                    tasks: tasks?.map((e) => ({
                        id: e.id,
                        title: e.title,
                        description: e.description,
                        notes: getValues(`task-notes[${e.id}]`),
                        points: parseInt(getValues(`task-points[${e.id}]`))
                    }))
                }
            })
        );
    };

    return (
        <>
            <Snackbar
                open={openSuccessAlert}
                autoHideDuration={6000}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpenSuccessAlert(false);
                }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {editing?.createdAt
                        ? 'Successfully updated the tasklist!'
                        : 'Successfully created the tasklist!'}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openErrorAlert}
                autoHideDuration={6000}
                onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }

                    setOpenErrorAlert(false);
                }}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {editing?.createdAt
                        ? 'Error updating the tasklist! You must fill in the title!'
                        : 'Error creating the tasklist! You must fill in the title!'}
                </Alert>
            </Snackbar>
            <CardContainer>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '80%'
                            }}
                        >
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
                                            helperText={
                                                error ? error.message : null
                                            }
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
                                            helperText={
                                                error ? error.message : null
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '20%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '1  em'
                            }}
                        >
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Switch {...field} checked={field.value} />
                                )}
                            />
                            {watch('status') ? (
                                <Chip
                                    label="Published"
                                    color="success"
                                    variant="outlined"
                                />
                            ) : (
                                <Chip
                                    label="Draft"
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginBottom: '2rem'
                        }}
                    >
                        <span>
                            Created at:
                            {editing?.createdAt && (
                                <span
                                    style={{
                                        color: '#666'
                                    }}
                                >
                                    {' ' +
                                        new Date(
                                            editing?.createdAt
                                        ).toLocaleString()}
                                </span>
                            )}
                        </span>
                        <span>
                            Updated at:
                            {editing?.updatedAt && (
                                <span
                                    style={{
                                        color: '#666'
                                    }}
                                >
                                    {' '}
                                    <ReactTimeAgo
                                        date={new Date(editing?.updatedAt)}
                                    />
                                </span>
                            )}
                        </span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            marginBottom: '2rem'
                        }}
                    >
                        <TableContainer component={Paper}>
                            {tasks?.length > 0 ? (
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">
                                                Title
                                            </TableCell>
                                            <TableCell align="left">
                                                Description
                                            </TableCell>
                                            <TableCell align="center">
                                                Notes
                                            </TableCell>
                                            <TableCell align="center">
                                                Points
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasks &&
                                            tasks?.map((task) => (
                                                <TableRow key={task.id}>
                                                    <TableCell align="left">
                                                        {task.title}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {task.description}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Controller
                                                            name={`task-notes[${task.id}]`}
                                                            control={control}
                                                            defaultValue={
                                                                task.notes
                                                            }
                                                            render={({
                                                                field: {
                                                                    onChange,
                                                                    value
                                                                },
                                                                fieldState: {
                                                                    error
                                                                }
                                                            }) => (
                                                                <FormControl variant="filled">
                                                                    <TextField
                                                                        label="Notes"
                                                                        variant="filled"
                                                                        value={
                                                                            value
                                                                        }
                                                                        onChange={
                                                                            onChange
                                                                        }
                                                                        error={
                                                                            !!error
                                                                        }
                                                                        multiline
                                                                        maxRows={
                                                                            3
                                                                        }
                                                                        helperText={
                                                                            error
                                                                                ? error.message
                                                                                : null
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Controller
                                                            name={`task-points[${task.id}]`}
                                                            control={control}
                                                            defaultValue={
                                                                task.points
                                                            }
                                                            render={({
                                                                field: {
                                                                    onChange,
                                                                    value
                                                                },
                                                                fieldState: {
                                                                    error
                                                                }
                                                            }) => (
                                                                <FormControl variant="filled">
                                                                    <TextField
                                                                        label="Points"
                                                                        variant="filled"
                                                                        type="number"
                                                                        value={
                                                                            value
                                                                        }
                                                                        onChange={
                                                                            onChange
                                                                        }
                                                                        error={
                                                                            !!error
                                                                        }
                                                                        helperText={
                                                                            error
                                                                                ? error.message
                                                                                : null
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            )}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Alert severity="warning">
                                    There are no tasks added yet -{' '}
                                    <Link
                                        to="/tasks"
                                        onClick={() => onCancel()}
                                    >
                                        add one
                                    </Link>
                                    !
                                </Alert>
                            )}
                        </TableContainer>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2rem'
                        }}
                    >
                        <Button type="submit" variant="contained">
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate('/tasklists');
                                onCancel();
                            }}
                        >
                            Back
                        </Button>
                    </div>
                </form>
            </CardContainer>
        </>
    );
};

export default Edit;
