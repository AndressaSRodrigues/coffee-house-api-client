import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Button } from '@mui/material';

interface TableProps {
    data: any[];
    headers: string[];
    productRenderer?: (data: any) => JSX.Element;
    onDelete: (id: string) => void;
}

export function CustomTable({ data, headers, productRenderer, onDelete }: TableProps) {

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index}>{capitalize(header)}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, itemIndex) => (
                            <TableRow key={itemIndex}>
                                {headers.map((header, headerIndex) => (
                                    <TableCell key={headerIndex}>
                                        {header === 'products' && productRenderer ? productRenderer(item) :
                                            header === 'manage' ? (
                                                <>
                                                    <Button>Add</Button>
                                                    <Button>CheckOut</Button>
                                                </>
                                            ) :
                                                header === 'options' ? (
                                                    <>
                                                        <Button>Edit</Button>
                                                        <Button onClick={() => onDelete(item.email)}>Delete</Button>
                                                    </>
                                                ) :
                                                    item[header]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
