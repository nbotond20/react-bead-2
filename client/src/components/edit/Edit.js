import { useDispatch, useSelector } from 'react-redux';
import { clear, selectEdit, updateTasklist } from '../../state/edit/editSlice';
import {
    Alert,
    Button,
    FormControlLabel,
    Snackbar,
    Switch,
    TextField
} from '@mui/material';
import CardContainer from '../utils/CardContainer';
import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import {
    useCreateTaskListMutation,
    useModifyTaskListMutation
} from '../../state/takskslists/tasksListsApiSlice';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const dispatch = useDispatch();
    const editing = useSelector(selectEdit);

    const [state, setSate] = useState({
        error: false,
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

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.error) {
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
        }
        setOpenSuccessAlert(true);
        dispatch(clear());
        setTimeout(() => {
            navigate('/tasklists');
        }, 1000);
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
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={state.title.value}
                        name="title"
                        onChange={(e) =>
                            setSate({
                                ...state,
                                title: { ...state.title, value: e.target.value }
                            })
                        }
                    />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        value={state.description.value}
                        name="description"
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
                    <FormControlLabel
                        control={
                            <Switch
                                checked={state.status.value === 'published'}
                                name="status"
                                onChange={handleToggle}
                            />
                        }
                        label="Published"
                    />
                    <span>
                        {state.createdAt.value && (
                            <ReactTimeAgo
                                date={new Date(state.createdAt.value)}
                            />
                        )}
                    </span>
                    <span>
                        {state.updatedAt.value && (
                            <ReactTimeAgo
                                date={new Date(state.updatedAt.value)}
                            />
                        )}
                    </span>

                    <div>
                        {state?.tasks &&
                            state.tasks.map((task) => (
                                <div key={task.id}>
                                    <span>{task.title}</span>
                                    <span>{task.description}</span>
                                    <TextField
                                        id="outlined-basic"
                                        label="Notes"
                                        variant="outlined"
                                        value={task.notes}
                                        name="notes"
                                        onChange={(e) =>
                                            setSate({
                                                ...state,
                                                tasks: state.tasks.map((t) =>
                                                    t.id === task.id
                                                        ? {
                                                              ...t,
                                                              notes: e.target
                                                                  .value
                                                          }
                                                        : t
                                                )
                                            })
                                        }
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Points"
                                        variant="outlined"
                                        value={task.points}
                                        name="points"
                                        onChange={(e) =>
                                            setSate({
                                                ...state,
                                                tasks: state.tasks.map((t) =>
                                                    t.id === task.id
                                                        ? {
                                                              ...t,
                                                              points: e.target
                                                                  .value
                                                                  ? parseInt(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                  : 0
                                                          }
                                                        : t
                                                )
                                            })
                                        }
                                    />
                                </div>
                            ))}
                    </div>

                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/tasklists')}
                    >
                        Finish Later
                    </Button>
                </form>
            </CardContainer>
        </>
    );
};

export default Edit;
