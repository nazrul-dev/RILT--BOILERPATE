import '../css/app.css';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import {NextUIProvider} from '@nextui-org/react'

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <NextUIProvider >
                <App {...props} />
            </NextUIProvider>
        );
    },
});
