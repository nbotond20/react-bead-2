import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({count, onChange, page}) {
    return (
        <Stack spacing={2}>
            <Pagination count={count} shape="rounded" page={page} onChange={onChange}/>
        </Stack>
    );
}
