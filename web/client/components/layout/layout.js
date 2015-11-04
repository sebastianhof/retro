require(['angular'], function (angular) {

    angular
        .module('homehub.layout', [])
        .controller('SearchCtrl', ['$scope', function ($scope) {
            $scope.liveSearch = function () {
                console.log("Live search for: " + $scope.search.query);
            }


        }])
        .directive('csSelect', function() {
            return {
                restrict: 'A',
                link: function(scope, el, attrs) {
                    if (!window.SelectFx) return;

                    var el = $(el).get(0);
                    $(el).wrap('<div class="cs-wrapper"></div>');
                    new SelectFx(el);

                }
            };
        })
        .directive('includeReplace', function () {
            return {
                require: 'ngInclude',
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.replaceWith(el.children());
                }
            };
        })
        .directive('pgDropdown', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var btn = $(element).find('.dropdown-menu').siblings('.dropdown-toggle');
                    var offset = 0;

                    var padding = btn.actual('innerWidth') - btn.actual('width');
                    var menuWidth = $(element).find('.dropdown-menu').actual('outerWidth');

                    if (btn.actual('outerWidth') < menuWidth) {
                        btn.width(menuWidth - offset);
                        $(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
                    } else {
                        $(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
                    }

                }
            }
        })
        .directive('pgFormGroup', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $(element).on('click', function() {
                        $(this).find(':input').focus();
                    });
                    $(element).find(':input').on('focus', function() {
                        $('.form-group.form-group-default').removeClass('focused');
                        $(element).addClass('focused');
                    });
                    $(element).find(':input').on('blur', function() {
                        $(element).removeClass('focused');
                        if ($(this).val()) {
                            $(element).find('label').addClass('fade');
                        } else {
                            $(element).find('label').removeClass('fade');
                        }
                    });
                    $(element).find('.checkbox, .radio').hover(function() {
                        $(this).parents('.form-group').addClass('focused');
                    }, function() {
                        $(this).parents('.form-group').removeClass('focused');
                    });
                }
            }
        })
        .directive('pgNavigate', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    $(element).click(function() {
                        var el = $(this).attr('data-view-port');
                        if ($(this).attr('data-toggle-view') != null) {
                            $(el).children().last().children('.view').hide();
                            $($(this).attr('data-toggle-view')).show();
                        }
                        $(el).toggleClass($(this).attr('data-view-animation'));
                        return false;
                    });


                }
            }
        })
        .directive('pgPortlet', ['$parse', function($parse) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attrs) {

                    var onRefresh = $parse(attrs.onRefresh);

                    var options = {};

                    if (attrs.progress) options.progress = attrs.progress;
                    if (attrs.overlayOpacity) options.overlayOpacity = attrs.overlayOpacity;
                    if (attrs.overlayColor) options.overlayColor = attrs.overlayColor;
                    if (attrs.progressColor) options.progressColor = attrs.progressColor;
                    if (attrs.onRefresh) options.onRefresh = function() {
                        onRefresh(scope);
                    };

                    element.portlet(options);

                    scope.maximize = function() {
                        element.portlet('maximize');
                    }
                    scope.refresh = function() {
                        element.portlet({
                            refresh: true
                        });
                    }
                    scope.close = function() {
                        element.portlet('close');
                    }
                    scope.collapse = function() {
                        element.portlet('collapse');
                    }
                }
            }
        }])
        .directive('pgSearch', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $(element).search();

                    scope.$on('toggleSearchOverlay', function(scopeDetails, status) {
                        if(status.show){
                            $(element).data('pg.search').toggleOverlay('show');
                        } else {
                            $(element).data('pg.search').toggleOverlay('hide');
                        }
                    })

                }
            }
        }])
        .directive('pgSidebar', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var $sidebar = $(element);
                    $sidebar.sidebar($sidebar.data());
                }
            }
        })
        .directive('pgTab', ['$parse', function($parse) {
            return {
                link: function(scope, element, attrs) {
                    var slide = attrs.slide;
                    var onShown = $parse(attrs.onShown);
                    // Sliding effect for tabs
                    $(element).on('show.bs.tab', function(e) {
                        e = $(e.target).parent().find('a[data-toggle=tab]');

                        var hrefCurrent = e.attr('href');

                        if ($(hrefCurrent).is('.slide-left, .slide-right')) {
                            $(hrefCurrent).addClass('sliding');

                            setTimeout(function() {
                                $(hrefCurrent).removeClass('sliding');
                            }, 100);
                        }
                    });

                    $(element).on('shown.bs.tab', {
                        onShown: onShown
                    }, function(e) {
                        if (e.data.onShown) {
                            e.data.onShown(scope);
                        }
                    });

                    element.click(function(e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        }]);

});