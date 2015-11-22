define(['angular'], function (angular) {

    angular.module('retro.items', [])

        .directive('retroSwitch', function () {
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

        .directive('retroThermostatSlider', function () {
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
        .directive('retroColorPicker', function () {
            return {
                scope: {
                    itemId: '=',
                    value: '=',
                    onSet: '='
                },
                link: function (scope, elem) {

                    require(['raphael', 'colorwheel'], function (Raphael) {

                        var cw = Raphael.colorwheel($(elem)[0], 300, 180).color(scope.value);
                        $(elem).width('auto');
                        $(elem).find('rect').remove();
                        var circles = $(elem).find('circle');
                        circles[circles.length - 1].remove();
                        circles[circles.length - 2].remove();
                        cw.onchange(function (value) {
                            if (scope.onSet) scope.onSet(scope.itemId, 'color', value);
                        })

                    })

                }
            }
        })

        .directive('retroDimmerSlider', function () {
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