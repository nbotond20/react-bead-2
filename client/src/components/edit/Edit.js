import { useDispatch, useSelector } from 'react-redux';
import { clear, selectEdit, updateTasklist } from '../../state/edit/editSlice';
import {
    Alert,
    Button,
    Chip,
    FilledInput,
    FormControl,
    InputLabel,
    Paper,
    Snackbar,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import CardContainer from '../utils/CardContainer';
import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import {
    useCreateTaskListMutation,
    useModifyTaskListMutation
} from '../../state/takskslists/tasksListsApiSlice';
import { Link, useNavigate } from 'react-router-dom';

const Edit = () => {
    const dispatch = useDispatch();
    const editing = useSelector(selectEdit);

    const [state, setSate] = useState({
        id: {
            value: editing?.id ? editing.id : null
        },
        title: {
            value: editing?.title ? editing.title : '',
            error: ''
        },
        description: {
            value: editing?.description ? editing.description : '',
            error: ''
        },
        status: {
            value: editing?.status ? editing.status : '',
            error: ''
        },
        createdAt: {
            value: editing?.createdAt ? editing.createdAt : '',
            error: ''
        },
        updatedAt: {
            value: editing?.updatedAt ? editing.updatedAt : '',
            error: ''
        },
        maxPoints: {
            value: editing?.tasks ? 0 : 0,
            error: ''
        },
        tasks: editing?.tasks
            ? editing.tasks.map((e) => ({
                  id: e.id,
                  title: e.title,
                  description: e.description,
                  notes: e.notes,
                  points: e.points
              }))
            : []
    });

    const [createTaskList] = useCreateTaskListMutation();
    const [modifyTaskList] = useModifyTaskListMutation();

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.title.value !== '') {
            if (state.createdAt.value === '') {
                await createTaskList({
                    strategy: 'local',
                    title: state.title.value,
                    description: state.description.value,
                    status: state.status.value,
                    tasks: state.tasks
                }).unwrap();
            } else {
                await modifyTaskList({
                    id: editing.id,
                    body: {
                        strategy: 'local',
                        title: state.title.value,
                        description: state.description.value,
                        status: state.status.value,
                        tasks: state.tasks
                    }
                }).unwrap();
            }
            setOpenSuccessAlert(true);
            dispatch(clear());
            setTimeout(() => {
                navigate('/tasklists');
            }, 1000);
        } else {
            setError(true);
        }
    };

    const handleToggle = (e) => {
        const s = !e.target.checked ? 'draft' : 'published';
        setSate({ ...state, status: { ...state.status, value: s } });
    };

    useEffect(() => {
        dispatch(
            updateTasklist({
                taskList: {
                    id: state.id.value,
                    title: state.title.value,
                    description: state.description.value,
                    status: state.status.value,
                    createdAt: state.createdAt.value,
                    updatedAt: state.updatedAt.value,
                    tasks: state.tasks
                }
            })
        );
    }, [state, dispatch]);

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
                    {state.createdAt.value
                        ? 'Successfully updated the tasklist!'
                        : 'Successfully created the tasklist!'}
                </Alert>
            </Snackbar>
            <CardContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
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
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <FilledInput
                                    id="title"
                                    value={state.title.value}
                                    name="title"
                                    error={error}
                                    required
                                    onChange={(e) =>
                                        setSate({
                                            ...state,
                                            title: {
                                                ...state.title,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                variant="filled"
                                sx={{
                                    marginTop: '1rem'
                                }}
                            >
                                <InputLabel htmlFor="description">
                                    Description
                                </InputLabel>
                                <FilledInput
                                    id="description"
                                    value={state.description.value}
                                    name="description"
                                    multiline
                                    maxRows={5}
                                    onChange={(e) =>
                                        setSate({
                                            ...state,
                                            description: {
                                                ...state.description,
                                                value: e.target.value
                                            }
                                        })
                                    }
                                />
                            </FormControl>
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
                            <Switch
                                checked={state.status.value === 'published'}
                                name="status"
                                onChange={handleToggle}
                            />
                            {state.status.value === 'published' ? (
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
                            {state.createdAt.value && (
                                <span
                                    style={{
                                        color: '#666'
                                    }}
                                >
                                    {' ' +
                                        new Date(
                                            state.createdAt.value
                                        ).toLocaleString()}
                                </span>
                            )}
                        </span>
                        <span>
                            Updated at:
                            {state.updatedAt.value && (
                                <span
                                    style={{
                                        color: '#666'
                                    }}
                                >
                                    {' '}
                                    <ReactTimeAgo
                                        date={new Date(state.updatedAt.value)}
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
                            {state?.tasks.length > 0 ? (
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
                                        {state?.tasks &&
                                            state.tasks.map((task) => (
                                                <TableRow key={task.id}>
                                                    <TableCell align="left">
                                                        {task.title}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {task.description}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <FormControl variant="filled">
                                                            <InputLabel htmlFor="notes">
                                                                Notes
                                                            </InputLabel>
                                                            <FilledInput
                                                                id="notes"
                                                                value={
                                                                    task.notes
                                                                }
                                                                name="notes"
                                                                multiline
                                                                maxRows={3}
                                                                onChange={(e) =>
                                                                    setSate({
                                                                        ...state,
                                                                        tasks: state.tasks.map(
                                                                            (
                                                                                t
                                                                            ) =>
                                                                                t.id ===
                                                                                task.id
                                                                                    ? {
                                                                                          ...t,
                                                                                          notes: e
                                                                                              .target
                                                                                              .value
                                                                                      }
                                                                                    : t
                                                                        )
                                                                    })
                                                                }
                                                            />
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <FormControl variant="filled">
                                                            <InputLabel htmlFor="points">
                                                                Points
                                                            </InputLabel>
                                                            <FilledInput
                                                                id="points"
                                                                value={
                                                                    task.points
                                                                }
                                                                name="points"
                                                                onChange={(e) =>
                                                                    setSate({
                                                                        ...state,
                                                                        tasks: state.tasks.map(
                                                                            (
                                                                                t
                                                                            ) =>
                                                                                t.id ===
                                                                                task.id
                                                                                    ? {
                                                                                          ...t,
                                                                                          points: e
                                                                                              .target
                                                                                              .value
                                                                                              ? parseInt(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                              : 0
                                                                                      }
                                                                                    : t
                                                                        )
                                                                    })
                                                                }
                                                            />
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Alert severity="warning">
                                    There are no tasks added yet -{' '}
                                    <Link to="/tasks">add one</Link>!
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
                            onClick={() => navigate('/tasklists')}
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
