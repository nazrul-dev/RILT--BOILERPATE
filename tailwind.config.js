const defaultTheme = require("tailwindcss/defaultTheme");
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/**/*.{js,ts,jsx,tsx,vue,blade.php}",
        "./resources/js/**/*.jsx",
      
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    darkMode: "class",
    plugins: [nextui()],
};
