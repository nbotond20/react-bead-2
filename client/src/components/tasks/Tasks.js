import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetTasksQuery } from '../../state/tasks/tasksApiSlice';
import { Alert, Box, Button, CircularProgress, Grow, Skeleton } from '@mui/material';
import style from './css/Tasks.module.css';
import PaginationRounded from '../utils/PaginationRounded';
import { Container } from '@mui/system';
import useDocumentTitle from '../utils/useDocumentTitle';

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
                    <Accordion>
                        <AccordionSummary>
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
    useDocumentTitle('Task-Manager - Tasks');
    const itemPerPage = 10;
    const loadingTime = 1500

    const { data, isLoading } = useGetTasksQuery();
    const [expanded, setExpanded] = React.useState(false);
    const [currentData, setCurrentData] = React.useState(
        data ? data.slice(0, itemPerPage) : []
    );

    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);

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

    const handleClick = (e) => {
        e.stopPropagation();
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
        <Container
            sx={{
                width: '85%',
                marginTop: '2em',
                marginBottom: '2em',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                padding: '1em'
            }}
        >   
            <h1 style={{ textAlign: 'center', margin: '0.5 0' }}>Tasks</h1>
            {(currentData?.length <= 0) && !loading && <Alert severity="warning">
                There are no tasks available - create one!
            </Alert>}
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
                                        ? `${task.description.slice(0, 25)}...`
                                        : ''}
                                </Typography>
                                <Box flexGrow={1} />
                                <Button
                                    sx={{ margin: 'auto', zIndex: '1' }}
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    Select
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ color: 'text.secondary' }}>{task.description}</Typography>
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
        </Container>
    );
}
