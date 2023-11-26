import { Breadcrumbs, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function FrontHouse() {
    return (
        <>
            <h1>Front House</h1>
            <Breadcrumbs aria-label="breadcrumb">
                <Button
                    component={Link}
                    to="/fronthouse/take-order"
                >
                    Take Order
                </Button>
                <Button
                    component={Link}
                    to="/fronthouse/orders"
                >
                    All Orders
                </Button>
            </Breadcrumbs>
            <Outlet />
        </>
    );
};
