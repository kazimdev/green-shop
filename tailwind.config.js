import forms from "@tailwindcss/forms";
import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.{html,js,ts,jsx,tsx}",
        "./resources/**/*.vue",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                customGray: {
                    500: "#6b7280",
                },

                primary: {
                    DEFAULT: "#2f4858",
                },
                base: {
                    DEFAULT: "#2F4858",
                    dark: "#2F4858",
                    light: "rgb(240 247 255)"
                },
            },
        },
        container: {
            center: true,
        },
    },

    plugins: [forms, daisyui],

    // DaisyUI configuration
    daisyui: {
        themes: ["light", "dark"],
        darkTheme: "dark",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: true,
        themeRoot: ":root",
    },
};
