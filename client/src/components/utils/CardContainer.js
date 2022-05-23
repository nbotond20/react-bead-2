import { Paper, TableContainer } from '@mui/material';

const CardContainer = ({ children }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                maxWidth: '1200px',
                width: '85vw',
                margin: 'auto',
                marginTop: '2em',
                marginBottom: '2em',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                padding: '1em'
            }}
        >{children}</TableContainer>
    );
};

export default CardContainer;
