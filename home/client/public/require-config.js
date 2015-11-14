require.config({
    baseUrl: '/',
    paths: {
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'jquery.scrollbar': 'bower_components/jquery.scrollbar/jquery.scrollbar.min',
        'pages': 'app/js/pages'
    },
    shim: {
        'bootstrap': ['jquery'],
        'jquery.scrollbar': ['jquery'],
        'pages': ['jquery']
    },
    deps: ['bootstrap', 'jquery.scrollbar', 'pages']
});