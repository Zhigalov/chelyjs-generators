var Vow = require('vow');

var getFinesByCarNumber = function (carNumber) {
    var defer = new Vow.defer();
    require('./getFinesByCarNumber')(carNumber, function (data) {
        defer.resolve(data);
    });
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

function getUnpaidFines(carNumber, driverCard) {
    return Vow
        .all({
            finesByCarNumber: getFinesByCarNumber(carNumber),
            finesByDriverCard: getFinesByDriverCard(driverCard)
        })
        .then(function (data) {
            var fines = data.finesByCarNumber.concat(data.finesByDriverCard);
            return Vow.all(fines.map(isFineUnpaid));
        })
        .then(function (isFinesUnpaid) {
            return isFinesUnpaid.reduce(function (isFineUnpaid, acc) {
                return acc + Number(isFineUnpaid);
            }, 0)
        });
}

getUnpaidFines('ABC', 'DEF')
    .then(function (unpaidFines) {
        console.log(unpaidFines);
    })
    .fail(function (err) {
        console.error(err.stack);
    });
