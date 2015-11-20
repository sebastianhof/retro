require.config({
    baseUrl: '/',
    paths: {
        'angular': 'bower_components/angular/angular',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min',
        'angular-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'jquery-minicolors': 'bower_components/jquery-minicolors/jquery.minicolors.min',
        'jquery.scrollbar': 'bower_components/jquery.scrollbar/jquery.scrollbar.min',
        'lodash': 'bower_components/lodash/lodash.min',
        'nouislider': 'bower_components/nouislider/distribute/nouislider.min',
        'pages': 'app/js/pages',
    },
    shim: {
        'angular': {
            exports: "angular"
        },
        'angular-nouislider': ['angular', 'nouislider'],
        'angular-sanitize': ['angular'],
        'angular-bootstrap': ['angular', 'bootstrap'],
        'angular-ui-router': ['angular'],
        'bootstrap': ['jquery'],
        'jquery-minicolors': 'jquery',
        'jquery.scrollbar': ['jquery'],
        'nouislider': ['jquery'],
        'pages': ['jquery']
    },
    deps: ['bootstrap', 'lodash', 'jquery.scrollbar', 'pages'],
    waitSeconds: 0
});

require(['app/app'], function(app) {
   app.bootstrap();
});