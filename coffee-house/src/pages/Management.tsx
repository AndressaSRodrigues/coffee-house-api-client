import { Breadcrumbs, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Management() {
    return (
        <>
            <h1>Manage</h1>
            <Breadcrumbs aria-label="breadcrumb">
                <Button
                    component={Link}
                    to="/manage/users"
                >
                    Users
                </Button>
                <Button
                    component={Link}
                    to="/manage/products"
                >
                    Products
                </Button>
                <Button
                    component={Link}
                    to="/fronthouse/orders"
                >
                    Orders
                </Button>
            </Breadcrumbs>
            <Outlet />
        </>
    );
};

