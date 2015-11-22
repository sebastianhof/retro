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
                    current: '=',
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
                            pips: {
                                mode: 'values',
                                values: [scope.current],
                                density: 4
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

        .filter('retrocommand', function() {
            return function(command) {

                var action = '';
                if(command.action == 'turnoff') action = 'Turn off';
                if(command.action == 'turnon') action = 'Turn on';
                if(command.action == 'settemp') action = 'Set temperature of';

                var type = '';
                if (command.itemType == 'thermostat') type = 'Thermostat';
                if (command.itemType == 'light') type = 'Light';
                if (command.itemType == 'dimmer') type = 'Dimmer';
                if (command.itemType == 'colorlight') type = 'Color light';
                if (command.itemType == 'colordimmer') type = 'Color dimmer';
                if (command.itemType == 'switch') type = 'Switch';

                var value = '';
                if (command.value) value = 'to ' + command.value;

                return action + ' ' + command.itemTitle + ' ' + type + ' ' + value
            }
        })


});