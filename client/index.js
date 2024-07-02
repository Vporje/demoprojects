import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hotels from "./src/pages/list/Hotels.js";
import Hotel from "./src/pages/hotel/Hotel.js";
import { SearchContextProvider } from "./src/context/SearchContext.js";
import { AuthContextProvider } from "./src/context/AuthContext.js";
import Login from "./src/pages/login/Login.js";
import Demo from "./src/Components/Demo.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
    path: "/hotels/:id",
    element: <Hotel />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  </AuthContextProvider>
);
