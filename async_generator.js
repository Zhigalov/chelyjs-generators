var Vow = require('vow');
var co = require('co');

var getFinesByCarNumber = function (carNumber) {
    var defer = new Vow.defer();
    require('./getFinesByCarNumber')(carNumber, function (data) {
        defer.resolve(data);
    });
    throw new Error(1);
    return defer.promise();
};

var getFinesByDriverCard = function (carNumber) {
    var defer = new Vow.defer();
    require('./getFinesByDriverCard')(carNumber, function (data) {
        defer.resolve(data);
    });
    return defer.promise();
};

var isFineUnpaid = function (carNumber) {
    var defer = new Vow.defer();
    require('./isFineUnpaid')(carNumber, function (data) {
        defer.resolve(data);
    });
    return defer.promise();
};

var getUnpaidFines = co.wrap(function *(carNumber, driverCard) {
    try {
        var data = yield {
            finesByCarNumber: getFinesByCarNumber(carNumber),
            finesByDriverCard: getFinesByDriverCard(driverCard)
        };
        var fines = data.finesByCarNumber.concat(data.finesByDriverCard);
        var isFinesUnpaid = yield fines.map(isFineUnpaid);
        return isFinesUnpaid.reduce(function (isFineUnpaid, acc) {
            return acc + Number(isFineUnpaid);
        }, 0);
    } catch (e) {
        console.log('Error!');
    }
});

getUnpaidFines('ABC', 'DEF')
    .then(function (unpaidFines) {
        console.log(unpaidFines);
    })
    .catch(function (err) {
        console.error(err.stack);
    });
