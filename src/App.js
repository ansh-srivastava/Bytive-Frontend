import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./view/login";
import Signup from "./view/signup";
import Home from "./view/home";
import Browse from "./view/browse";
import EditProfile from "./view/edit-profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/edit-profile",
    element: <EditProfile />
  }
 
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
