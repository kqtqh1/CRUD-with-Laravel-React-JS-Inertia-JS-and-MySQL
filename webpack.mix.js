const mix = require('laravel-mix')
mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .sourceMaps()
  .postCss('resources/css/app.css', 'public/css', [
    require('tailwindcss'),
  ])
const path = require('path');
mix.webpackConfig({
    resolve: {
        alias: {
            ziggy: path.resolve('vendor/tightenco/ziggy/dist/js/route.js'),
            ziggyRoutes: path.resolve('resources/js/ziggy.js'),
        },
    },
});
