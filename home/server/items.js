var itemDatastore_1 = require("./datastores/itemDatastore");
var Items = (function () {
    function Items(app) {
        app.get('/api/items/climate', function (req, res, next) {
            itemDatastore_1.ItemDatastore.getInstance().getItems({ type: { $in: [itemDatastore_1.ItemType.THERMOSTAT, itemDatastore_1.ItemType.WEATHERSTATION] } }).then(function (items) {
                res.send({
                    items: items
                });
            }, function (err) {
                res.sendStatus(500);
            });
        });
    }
    return Items;
})();
exports.Items = Items;
