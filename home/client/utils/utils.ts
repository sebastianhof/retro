export class Utils {

    static upsert(arr, key, newval) {
        var match = _.find(arr, key);
        if (match) {
            var index = _.indexOf(arr, match);
            arr.splice(index, 1, newval);
        } else {
            arr.push(newval);
        }
    }

}



