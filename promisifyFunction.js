function myFunction(data, cb) {
    // ...
}

function myPromisifyFunction(data) {
    var defer = new Vow.defer();
    myFunction(data, function (err, res) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(res);
        }
    });
    return defer.promise();
}
