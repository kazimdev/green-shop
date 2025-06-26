const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .react() // Enable React support
    .postCss("resources/css/app.css", "public/css", [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
    ])
    .browserSync({
        proxy: "127.0.0.1:8000", // The Laravel development server URL
        files: [
            "resources/views/**/*.blade.php", // Watch Blade templates
            "resources/js/**/*.js", // Watch JS files
            "resources/js/**/*.jsx", // Watch JSX files
            "resources/css/**/*.css", // Watch CSS files
            "app/**/*.php", // Watch PHP files
            "routes/**/*.php", // Watch Routes
        ],
    });

mix.options({
    watchOptions: {
        usePolling: true,
        interval: 1000, // Check for changes every second
    },
});

mix.webpackConfig({
    stats: {
        children: true,
    },
});
