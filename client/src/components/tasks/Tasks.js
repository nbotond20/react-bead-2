import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetTasksQuery } from '../../state/tasks/tasksApiSlice';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grow,
    Skeleton
} from '@mui/material';
import style from './css/Tasks.module.css';
import PaginationRounded from '../utils/PaginationRounded';
import useDocumentTitle from '../utils/useDocumentTitle';
import CardContainer from '../utils/CardContainer';
import { selectLoggedInUser } from '../../state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectEdit, setEditing } from '../../state/edit/editSlice';

const Loading = ({ count }) => {
    const list = Array.from(Array(count).keys());

    return (
        <>
            {list.map((e, index) => (
                <Grow
                    direction="up"
                    in={true}
                    {...(true ? { timeout: 250 * index } : {})}
                    key={index}
                >
                    <Accordion
                        sx={{
                            boxShadow: 'none',
                            margin: '0',
                            border: 'none',
                            backgroundColor: '#fafafa'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                boxShadow: 'none'
                            }}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                <Skeleton />
                            </Typography>
                            <Typography
                                sx={{
                                    marginLeft: '1em',
                                    width: '15%',
                                    color: 'text.secondary'
                                }}
                            >
                                <Skeleton />
                            </Typography>
                            <Box flexGrow={1} />
                            <Button
                                sx={{ margin: 'auto', zIndex: '1' }}
                                variant="contained"
                            >
                                <CircularProgress size={24} color="inherit" />
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails></AccordionDetails>
                    </Accordion>
                </Grow>
            ))}
        </>
    );
};

export default function Tasks() {
    const user = useSelector(selectLoggedInUser);
    const editing = useSelector(selectEdit);
    const dispatch = useDispatch();

    useDocumentTitle('Task-Manager - Tasks');
    const itemPerPage = 10;
    const loadingTime = 1500;

    const [page, setPage] = React.useState(1);
    const { data, isLoading } = useGetTasksQuery();

    const [expanded, setExpanded] = React.useState(false);
    const [currentData, setCurrentData] = React.useState(
        data ? data.slice(0, itemPerPage) : []
    );

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (data) {
            setCurrentData(data.slice(0, itemPerPage));
        }
    }, [data]);

    setTimeout(() => {
        setLoading(isLoading || false);
    }, loadingTime);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = (e, task) => {
        e.stopPropagation();
        if (editing !== null) {
            dispatch(
                addTask({
                    task: { ...task, notes: '', points: 0 }
                })
            );
        } else {
            dispatch(
                setEditing({
                    taskList: {
                        title: null,
                        description: null,
                        status: 'draft',
                        userId: user.id,
                        tasks: [{ ...task, notes: '', points: 0 }]
                    }
                })
            );
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        setCurrentData(
            data
                ? [
                      ...data.slice(
                          value * itemPerPage - itemPerPage,
                          value * itemPerPage
                      )
                  ]
                : []
        );
    };

    return (
        <CardContainer>
            <h1 style={{ textAlign: 'center', margin: '0.5 0' }}>Tasks</h1>
            {currentData?.length <= 0 && !loading && (
                <Alert severity="warning">
                    There are no tasks available - create one!
                </Alert>
            )}
            {!loading &&
                currentData?.map((task, index) => (
                    <Grow
                        direction="up"
                        in={true}
                        {...(true ? { timeout: 250 * (index + 1) } : {})}
                        key={index}
                    >
                        <Accordion
                            expanded={expanded === `panel${index}}`}
                            onChange={handleChange(`panel${index}}`)}
                            className={style.accordion}
                            sx={{
                                boxShadow: 'none',
                                margin: '0',
                                border: !(expanded === `panel${index}}`)
                                    ? 'none'
                                    : '1px solid #e0e0e0',
                                backgroundColor: !(
                                    expanded === `panel${index}}`
                                )
                                    ? '#fff'
                                    : '#fafafa'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}}bh-content`}
                                id={`panel${index}}bh-header`}
                                sx={{
                                    boxShadow: 'none'
                                }}
                            >
                                <Typography
                                    sx={{ width: '33%', flexShrink: 0 }}
                                >
                                    {task.title}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    {!(expanded === `panel${index}}`)
                                        ? `${task.description.slice(0, 25)}${
                                              task.description.length > 25
                                                  ? '...'
                                                  : ''
                                          }`
                                        : ''}
                                </Typography>
                                <Box flexGrow={1} />
                                <Button
                                    sx={{ margin: 'auto', zIndex: '1' }}
                                    variant="contained"
                                    onClick={(e) => handleClick(e, task)}
                                    disabled={
                                        editing?.tasks.find(
                                            (t) => t.id === task.id
                                        ) === undefined
                                            ? false
                                            : true
                                    }
                                >
                                    {editing?.tasks.find(
                                        (t) => t.id === task.id
                                    )
                                        ? 'Selected'
                                        : 'Select'}
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    {task.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grow>
                ))}
            {loading && (
                <>
                    <Loading count={itemPerPage} />
                </>
            )}
            <div
                style={{
                    display: 'flex',
                    margin: 'auto',
                    justifyContent: 'center',
                    marginTop: '1em'
                }}
            >
                <PaginationRounded
                    count={
                        data
                            ? Math.ceil(Math.max(data.length / itemPerPage, 1))
                            : 1
                    }
                    onChange={handlePageChange}
                    page={page}
                />
            </div>
        </CardContainer>
    );
}
