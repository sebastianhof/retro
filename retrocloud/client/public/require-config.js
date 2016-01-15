require.config({
    baseUrl: '/',
    paths: {
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'pages.frontend': 'public/js/pages.frontend',
        'pages.custom': 'public/js/custom',
        'swiper': 'bower_components/Swiper/dist/js/swiper.jquery.min'

    },
    shim: {
        'bootstrap': ['jquery'],
        'pages.custom': ['jquery', 'swiper'],
        'pages.frontend': ['jquery'],
        'swiper': ['jquery']
    },
    deps: ['bootstrap', 'pages.frontend', 'pages.custom']
});


//<!-- END FOOTER -->
//<!-- BEGIN VENDOR JS -->
//<!--<script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script>-->
//    <!--<script type="text/javascript" src="public/layout/js/pages.image.loader.js"></script>-->
//    <!--<script type="text/javascript" src="assets/plugins/jquery/jquery-1.11.1.min.js"></script>-->
//    <!--<script type="text/javascript" src="assets/plugins/swiper/js/swiper.jquery.min.js"></script>-->
//    <!--<script type="text/javascript" src="assets/plugins/velocity/velocity.min.js"></script>-->
//    <!--<script type="text/javascript" src="assets/plugins/velocity/velocity.ui.js"></script>-->
//    <!--<script type="text/javascript" src="assets/plugins/jquery-appear/jquery.appear.js"></script>-->
//    <!--<script type="text/javascript" src="assets/plugins/animateNumber/jquery.animateNumbers.js"></script>-->
//    <!-- END VENDOR JS -->
//<!-- BEGIN PAGES FRONTEND LIB -->
//    <!-- END PAGES LIB -->
//<!-- BEGIN YOUR CUSTOM JS -->
//<!--<script type="text/javascript" src=""></script>-->
//    <!-- END PAGES LIB -->