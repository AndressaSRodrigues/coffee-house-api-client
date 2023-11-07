export interface Orders {
    _id: string,
    client: string,
    products: [
        {
            product: {
                name: string,
                price: number,
                image: string,
                type: string,
            },
            qty: number,
            _id: string,
        }
    ],
    status: string,
    dateEntry: string,
    dateProcessed: string,
};
