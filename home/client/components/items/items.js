define(['angular'], function (angular) {

    angular.module('homehub.items', [])

        .directive('homehubSwitch', function () {
            return {
                scope: {
                    itemId: '=',
                    value: '=',
                    onSet: '='
                },
                link: function (scope, elem) {

                    elem[0].checked = scope.value;
                    elem[0].onchange = function () {
                        if (scope.onSet) scope.onSet(scope.itemId, 'switch', elem[0].checked);
                    };

                    var init = new Switchery(elem[0]);


                }
            }
        })


        // climate

        .directive('homehubThermostatSlider', function () {
            return {
                scope: {
                    itemId: '=',
                    value: '=',
                    max: '=',
                    min: '=',
                    onSet: '='
                },
                link: function (scope, elem) {

                    require(['nouislider'], function (noUiSlider) {

                        noUiSlider.create(elem[0], {
                            start: [scope.value],
                            range: {
                                min: 0,
                                '1%': scope.min,
                                max: scope.max
                            },
                            step: 1
                        });

                        elem[0].noUiSlider.on('set', function (value) {
                            if (scope.onSet) scope.onSet(scope.itemId, 'temp', parseInt(value));
                        });

                    });


                }
            }
        })

        // lighting
        .directive('homehubColorPicker', function () {
            return {
                scope: {
                    itemId: '=',

                    onSet: '='
                },
                link: function (scope, elem) {

                    require(['jquery-minicolors'], function () {

                        $.minicolors.defaults = $.extend($.minicolors.defaults, {
                            theme: 'bootstrap'
                        });

                        $(elem).minicolors({
                            change: function (value, opacity) {
                                if (scope.onSet) scope.onSet(scope.itemId, 'color', value);
                            }
                        });

                    })

                }
            }
        })

        .directive('homehubDimmerSlider', function () {
            return {
                scope: {
                    itemId: '=',
                    value: '=',
                    onSet: '='
                },
                link: function (scope, elem) {

                    require(['nouislider'], function (noUiSlider) {

                        noUiSlider.create(elem[0], {
                            start: [scope.value],
                            range: {
                                min: 0,
                                max: 100
                            },
                            step: 10
                        });

                        elem[0].noUiSlider.on('set', function (value) {
                            if (scope.onSet) scope.onSet(scope.itemId, 'dimmer', parseInt(value));
                        });

                    });


                }
            }
        })


});