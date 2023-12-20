import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Resources from "./components/Resources";
import Signup from "./components/Signup";
import JournalPage from "./components/Journal";
import JournalEntries from "./components/JournalContainers";
import FavortieList from "./components/FavoriteList";


const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <div>Error in app. Whoops!</div>,
        children: [
            {index: true, element: <Dashboard/>},
            {path: '/dashboard', element: <Dashboard/>},
            {path: '/journal', element: <JournalPage />},
            {path: '/resources', element: <Resources/>},
            {path: '/login', element: <Signup/>},
            {path: '/signup', element: <Signup/>},
            {path: '/myjournal', element: <JournalEntries/>},
            {path: '/myaffirmations', element: <FavortieList/>},
        ],
    },
];

const router = createBrowserRouter(routes);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);