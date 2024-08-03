import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/AppRouter.jsx";
import { SidebarProvider } from "./context/SedibarContext.jsx";
import "./index.css";
import { Toaster } from "sonner";


const idRoot = document.getElementById("root");
const root = createRoot(idRoot);
root.render(
  <SidebarProvider>
    <RouterProvider router={router} />
    <Toaster richColors closeButton position="top-right" />
  </SidebarProvider>
);
