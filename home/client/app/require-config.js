require.config({
    baseUrl: '/',
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'jquery.scrollbar': 'bower_components/jquery.scrollbar/jquery.scrollbar.min',
        'lodash': 'bower_components/lodash/lodash.min',
        'nouislider': 'bower_components/nouislider/distribute/nouislider',
        'pages': 'layout/js/pages'
    },
    shim: {
        'angular': {
            exports: "angular"
        },
        'angular-nouislider': ['angular', 'nouislider'],
        'angular-sanitize': ['angular'],
        'angular-ui-router': ['angular'],
        'bootstrap': ['jquery'],
        'jquery.scrollbar': ['jquery'],
        'nouislider': ['jquery'],
        'pages': ['jquery']
    },
    deps: ['bootstrap', 'lodash', 'jquery.scrollbar', 'pages']
});

require(['app/app'], function(app) {
   app.bootstrap();
});