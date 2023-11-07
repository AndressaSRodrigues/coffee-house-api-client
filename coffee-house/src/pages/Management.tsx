import { Breadcrumbs, Button } from "@mui/material";
import { useState } from "react";
import UsersTable from "../components/Manage/UsersTable";
import ProductsTable from "../components/Manage/ProductsTable";
import OrdersTable from "../components/Manage/OrdersTable";

export default function Management() {
    const [activeComponent, setActiveComponent] = useState<string>('');

    const handleBreadcrumbClick = (component: string) => {
        setActiveComponent(component);
    };

    return (
        <>
            <h1>Manage</h1>
            <Breadcrumbs aria-label="breadcrumb">
                <Button
                    component="button"
                    onClick={() => handleBreadcrumbClick("users")}
                >
                    Users
                </Button>
                <Button
                    component="button"
                    onClick={() => handleBreadcrumbClick("products")}
                >
                    Products
                </Button>
                <Button
                    component="button"
                    onClick={() => handleBreadcrumbClick("orders")}
                >
                    Orders
                </Button>
            </Breadcrumbs>
            {activeComponent === "users" && <UsersTable />}
            {activeComponent === "products" && <ProductsTable />}
            {activeComponent === "orders" && <OrdersTable />}
        </>
    );
};
