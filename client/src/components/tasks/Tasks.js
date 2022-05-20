import CardContainer from '../utils/CardContainer';
import { useGetTasksQuery } from '../../state/tasks/tasksApiSlice';
import { Backdrop, CircularProgress } from '@mui/material';

const Tasks = () => {
    let { data, isLoading } = useGetTasksQuery();
    
    return (
        <CardContainer>
            <h1 style={{ textAlign: 'center' }}>Tasks</h1>
            {isLoading ? (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                data.map((task) => (
                    <div key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                    </div>
                ))
            )}
        </CardContainer>
    );
};

export default Tasks;
