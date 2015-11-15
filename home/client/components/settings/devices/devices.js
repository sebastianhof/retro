define(['angular'], function (angular) {

    var MAXCUBE = 0;

    angular
        .module('retro.settings.devices', [])
        .controller('DeviceSettingsController', ['$scope', '$http', function ($scope, $http) {
            var controller = this;
            this.devices = [];

            this.getDevices = function () {
                $http.get('api/devices/list').success(function (data) {
                    controller.devices = _.map(data.devices, function (device) {
                        switch (device.type) {
                            case MAXCUBE:
                                device.imageUrl = "app/img/devices/max!cube.jpg";
                                device.category = 'climate';
                                device.templateUrl = 'components/settings/devices/maxcube-edit.html';
                                // remove from add device list
                                _.remove(controller.addDevices, {type: 0});
                                break;
                        }

                        return device;
                    });
                });
            };
            this.getDevices();

            this.addDevices = [
                {
                    title: 'Max!Cube',
                    imageUrl: "app/img/devices/max!cube.jpg",
                    category: 'climate',
                    templateUrl: 'components/settings/devices/maxcube.html',
                    submitUrl: 'api/devices/setup/maxcube',
                    type: 0,
                    onSuccess: function (data) {
                        // refresh
                        controller.getDevices();
                    }
                },
                {
                    title: 'Philips Hue Bridge',
                    imageUrl: "app/img/devices/philipshue.jpg",
                    category: 'lighting',
                    templateUrl: 'components/settings/devices/philipshue.html',
                    submitUrl: 'api/devices/setup/philipshue'
                },
                {
                    title: 'Lifx',
                    imageUrl: "app/img/devices/lifx.jpg",
                    category: 'lighting',
                    templateUrl: 'components/settings/devices/lifx.html',
                    submitUrl: 'api/devices/setup/lifx'
                },
                {
                    title: 'Belkin Wemo',
                    imageUrl: "app/img/devices/wemo.jpg",
                    category: 'appliances',
                    templateUrl: 'components/settings/devices/wemo.html',
                    submitUrl: 'api/devices/setup/wemo'
                },
                {
                    title: 'Withings',
                    imageUrl: "app/img/devices/withings.jpg",
                    category: 'appliances',
                    templateUrl: 'components/settings/devices/withings.html',
                    submitUrl: 'api/devices/setup/withings'
                }
            ]


        }])
        .directive('retroAddDevice', function () {
            return {
                replace: true,
                template: '<div class="gallery-item " ng-click="addDevice.setupDevice()" style="background-color: whitesmoke">\
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
                        <div class="dialog item-details">\
                            <div class="dialog__overlay"></div>\
                            <div class="dialog__content">\
                        </div>\
                    </div>\
                    ',
                scope: {
                    device: '='
                },
                controller: ['$scope', '$http', '$uibModal', function ($scope, $http, $uibModal) {

                    var device = $scope.device;

                    this.setupDevice = function () {
                        var modalInstance = $uibModal.open({
                            size: 'lg',
                            templateUrl: $scope.device.templateUrl,
                            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                                var controller = this;

                                this.close = function () {
                                    $uibModalInstance.dismiss();
                                };

                                this.data = {};

                                this.submit = function (form) {
                                    if (form.$valid) {

                                        $http.post(device.submitUrl, controller.data)
                                            .success(function (data) {
                                                if (device.onSuccess) device.onSuccess(data);
                                                $uibModalInstance.close();
                                            })
                                            .error(function (err) {
                                                console.log(err);
                                            });
                                    }
                                };

                            }],
                            controllerAs: 'modalInstance'
                        });

                    }

                }],
                controllerAs: 'addDevice'
            }
        })

        .directive('retroEditDevice', function () {
            return {
                replace: true,
                template: '<div class="gallery-item " ng-click="editDevice.editDevice()" style="background-color: whitesmoke">\
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
                                            <button class="btn btn-white btn-xs btn-mini bold fs-14" type="button">Edit</button>\
                                        </div>\
                                        <div class="clearfix"></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="dialog item-details">\
                            <div class="dialog__overlay"></div>\
                            <div class="dialog__content">\
                        </div>\
                    </div>\
                    ',
                scope: {
                    device: '='
                },
                controller: ['$scope', '$http', '$uibModal', function ($scope, $http, $uibModal) {
                    var device = $scope.device;

                    $http.get('/api/devices/items/' + device._id).success(function (data) {
                        device['items'] = data.items;
                    });

                    this.editDevice = function () {
                        var modalInstance = $uibModal.open({
                            size: 'lg',
                            templateUrl: $scope.device.templateUrl,
                            controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                                var controller = this;

                                this.close = function () {
                                    $uibModalInstance.dismiss();
                                };

                                this.data = angular.copy(device);

                                this.submit = function (form) {
                                    if (form.$valid) {

                                        $http.post('/api/devices/edit/' + device._id, controller.data)
                                            .success(function (data) {
                                                $uibModalInstance.close();
                                                angular.extend(device, data);
                                                $http.get('/api/devices/items/' + device._id).success(function (data) {
                                                    device['items'].length = 0;
                                                    _.forEach(data.items, function (item) {
                                                        device['items'].push(item);
                                                    })
                                                });
                                            })
                                            .error(function (err) {
                                                console.log(err);
                                            });
                                    }
                                };


                            }],
                            controllerAs: 'modalInstance'
                        });

                    }

                }],
                controllerAs: 'editDevice'
            }
        })

        .directive('retroItemsRows', function () {
            return {
                scope: {
                    template: '@',
                    model: '=',
                    field: '@',
                    label: '@'
                },
                template: '\
                    <fieldset class="form-group-attached">\
                        <label>{{::label}}</label>\
                        <div class="row" ng-repeat="row in devicesRows.rows" ng-include="devicesRows.getTemplate()">\
                        </div>\
                    </fieldset>\
                ',
                controller: ['$scope', function ($scope) {

                    this.rows = $scope.model['items'];

                    this.getTemplate = function () {
                        return $scope.template;
                    };

                }],
                controllerAs: 'devicesRows'
            }
        })

});