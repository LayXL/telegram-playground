import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/home"
import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
