import { AppRoot } from "@telegram-apps/telegram-ui"
import "@telegram-apps/telegram-ui/dist/styles.css"
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
        <AppRoot>
            <RouterProvider router={router} />
        </AppRoot>
    </StrictMode>
)
