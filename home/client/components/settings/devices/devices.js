define(['angular'], function (angular) {

    angular
        .module('homehub.settings.devices', [])
        .controller('DeviceSettingsController', ['$scope', function ($scope) {

            this.addDevices = [
                { title: 'Max!Cube', imageUrl: "layout/img/devices/max!cube.jpg", category: 'climate' },
                { title: 'Philips Hue Bridge', imageUrl: "layout/img/devices/philipshue.jpg", category: 'lighting' },
                { title: 'Lifx', imageUrl: "layout/img/devices/lifx.jpg", category: 'lighting' },
                { title: 'Belkin Wemo', imageUrl: "layout/img/devices/wemo.jpg", category: 'appliances' },
                { title: 'Withings', imageUrl: "layout/img/devices/withings.jpg", category: 'appliances' }
            ]


        }])
        .directive('homehubAddDevice', function() {
            return {
                template:
                    '<div class="gallery-item " ng-click="showItemDetails()" style="background-color: whitesmoke">\
                        <img ng-src="{{::device.imageUrl}}" alt="" class="image-responsive-height">\
                        <div class="overlayer bottom-left full-width">\
                            <div class="overlayer-wrapper item-info">\
                                <div class="bg-master p-l-20 p-r-20 p-t-20 p-b-5">\
                                    <div class="">\
                                        <p class="pull-left bold text-white fs-14 p-t-10">{{::device.title}}</p>\
                                        <h5 class="pull-right">\
                                            <i ng-if="device.category == \'climate\'" class="fa fa-inverse fa-sun-o"></i>\
                                            <i ng-if="device.category == \'lighting\'" class="fa fa-inverse fa-lightbulb-o"></i>\
                                            <i ng-if="device.category == \'appliances\'" class="fa fa-inverse fa-plug"></i>\
                                            <i ng-if="device.category == \'security\'" class="fa fa-inverse fa-lock"></i>\
                                        </h5>\
                                        <div class="clearfix"></div>\
                                    </div>\
                                    <div class="m-t-10">\
                                        <div class="pull-right m-t-10">\
                                            <button class="btn btn-white btn-xs btn-mini bold fs-14" type="button">+</button>\
                                        </div>\
                                        <div class="clearfix"></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    ',
                scope: {
                    device: '=',
                }
            }
        });

});