import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import AddRecipe from "../pages/AddRecipe.jsx";
import DetailProfile from "../pages/DetailProfile.jsx";
import UpdateMenu from "../pages/UpdateMenu.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import DetailMenu from "../pages/DetailMenu.jsx";
import NotFound from "../pages/NotFound.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import EditProfile from "../pages/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-recipe",
    element: (
      <PrivateRoute>
        <AddRecipe />
      </PrivateRoute>
    ),
  },
  {
    path: "/detail-profile",
    element: (
      <PrivateRoute>
        <DetailProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/update-recipe/:menuId",
    element: <UpdateMenu />,
  },
  {
    path: "/detail-menu/:menuId",
    element: <DetailMenu />,
  },
  {
    path: "/edit-profile/:userId",
    element: <EditProfile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
