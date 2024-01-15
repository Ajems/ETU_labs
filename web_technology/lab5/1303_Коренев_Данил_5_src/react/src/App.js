import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Brokers} from "./domain/brokers/brokers";
import {Settings} from "./domain/settings/settings";
import {TablesContainer} from "./domain/tables/tablesContainer";
import {Charts} from "./domain/charts/charts";
import {ChartsContainer} from "./domain/charts/chartsContainer";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Settings/>
        },
        {
            path: '/charts',
            element: <ChartsContainer/>,
        },
        {
            path: '/tables',
            element: <TablesContainer/>,
        },
        {
            path: '/settings',
            element: <Settings/>,
        },
        {
            path: '/brokers',
            element: <Brokers/>,
        },
    ])
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
