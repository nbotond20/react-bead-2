import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Alert, Button, Grow, Skeleton } from '@mui/material';
import PaginationRounded from '../utils/PaginationRounded';
import { useGetTaskListsQuery } from '../../state/takskslists/tasksListsApiSlice';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useGetTasksQuery } from '../../state/tasks/tasksApiSlice';
import ReactTimeAgo from 'react-time-ago';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../state/auth/authSlice';
import { v4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import useDocumentTitle from '../utils/useDocumentTitle';
import CardContainer from '../utils/CardContainer';

const Row = ({ row, index, tasks, children }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {row && tasks && (
                <>
                    <Grow
                        direction="up"
                        in={true}
                        {...(true ? { timeout: 250 * (index + 1) } : {})}
                    >
                        <TableRow sx={{ borderCollapse: 'collapse' }}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </IconButton>
                                {children}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    color:
                                        row.status === 'published'
                                            ? '#77DD77'
                                            : 'text.secondary'
                                }}
                            >
                                {row.status === 'published'
                                    ? 'Published'
                                    : 'Draft'}
                            </TableCell>
                            <TableCell align="center">
                                {row.tasks?.length}
                            </TableCell>
                            <TableCell align="right">
                                <ReactTimeAgo date={new Date(row.updatedAt)} />
                            </TableCell>
                            <TableCell align="right">
                                <ReactTimeAgo date={new Date(row.createdAt)} />
                            </TableCell>
                            <TableCell align="center" sx={{ padding: '0' }}>
                                <Button>
                                    <EditIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </Grow>
                    <TableRow>
                        <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={7}
                        >
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                    >
                                        Description
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        gutterBottom
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {row.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ margin: 1 }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                    >
                                        Tasks
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Title</TableCell>
                                                <TableCell>
                                                    Description
                                                </TableCell>
                                                <TableCell align="right">
                                                    Notes
                                                </TableCell>
                                                <TableCell align="right">
                                                    Points
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.tasks.map((task) => {
                                                return (
                                                    <TableRow key={task.id}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            sx={{
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            {task.title}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            {task.description}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            {task.notes}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{
                                                                color: 'text.secondary'
                                                            }}
                                                        >
                                                            {task.points}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            <TableRow key={v4()}>
                                                <TableCell scope="row" />
                                                <TableCell />
                                                <TableCell align="right" />
                                                <TableCell
                                                    align="right"
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                    Summary: {row.tasks.reduce(
                                                        (acc, task) =>
                                                            acc + task.points,
                                                        0
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </>
            )}
        </>
    );
};

const TaskLists = () => {
    useDocumentTitle('Task-Manager - Tests');
    const user = useSelector(selectLoggedInUser);
    const itemPerPage = 10;
    const loadingTime = 1500;

    const { data, isLoading } = useGetTaskListsQuery();
    const [currentData, setCurrentData] = React.useState(
        data
            ? data
                  .filter((task) => task.userId === user.id)
                  .slice(0, itemPerPage)
            : []
    );

    const { data: tasks } = useGetTasksQuery();

    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);

    setTimeout(() => {
        setLoading(isLoading || false);
    }, loadingTime);

    React.useEffect(() => {
        setCurrentData(
            data
                ? data
                      .filter((task) => task.userId === user.id)
                      .slice(0, itemPerPage)
                : []
        );
    }, [user, data]);

    const handlePageChange = (event, value) => {
        setPage(value);
        setCurrentData(
            data
                ? [
                      ...data
                          .filter((task) => task.userId === user.id)
                          .slice(
                              value * itemPerPage - itemPerPage,
                              value * itemPerPage
                          )
                  ]
                : []
        );
    };

    return (
        <CardContainer>
            <h1
                style={{
                    textAlign: 'center',
                    margin: '0.5 0',
                    position: 'relative'
                }}
            >
                My Tests
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        right: '0'
                    }}
                >
                    New Test
                </Button>
            </h1>

            {currentData?.length <= 0 && !loading && (
                <Alert severity="warning">
                    There are no test available - create one!
                </Alert>
            )}
            <Table
                aria-label="collapsible table"
                sx={{
                    boxShadow: 'none',
                    margin: '0',
                    border: '1px solid #e0e0e0'
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Task Number</TableCell>
                        <TableCell align="right">Modified</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!loading &&
                        currentData?.map((row, index) => (
                            <Row
                                key={index}
                                row={row}
                                index={index}
                                tasks={tasks}
                            />
                        ))}
                    {loading && (
                        <>
                            <Loading count={itemPerPage} />
                        </>
                    )}
                </TableBody>
            </Table>

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
                        isLoading
                            ? 1
                            : data
                            ? Math.ceil(Math.max(data.length / itemPerPage, 1))
                            : 1
                    }
                    onChange={handlePageChange}
                    page={page}
                />
            </div>
        </CardContainer>
    );
};

const Loading = ({ count }) => {
    const list = Array.from(Array(count).keys());

    return (
        <>
            {list.map((e, index) => (
                <Grow
                    direction="up"
                    in={true}
                    {...(true ? { timeout: 250 * (index + 1) } : {})}
                    key={index}
                >
                    <TableRow
                        sx={{ '& > *': { borderBottom: 'unset' } }}
                        key={index}
                    >
                        <TableCell>
                            <IconButton aria-label="expand row" size="small">
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Skeleton variant="text" width={'100%'} />
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" width={'100%'} />
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" width={'100%'} />
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton variant="text" width={'100%'} />
                        </TableCell>
                        <TableCell align="right">
                            <Skeleton variant="text" width={'100%'} />
                        </TableCell>
                    </TableRow>
                </Grow>
            ))}
        </>
    );
};

export default TaskLists;
