import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          lazy: async () => ({ Component: (await import("./App")).default }),
        },
        {
          path: "/resume",
          lazy: async () => ({
            Component: (await import("./components/resume/Index")).default,
          }),
        },
      ])}
    />
  </React.StrictMode>
);
