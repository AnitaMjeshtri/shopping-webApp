const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
  .sass('resources/css/app.scss', 'public/css')
   .sourceMaps(); // Enable source maps for development

if (mix.inProduction()) {
    mix.version(); // Add versioning for cache busting in production
}
