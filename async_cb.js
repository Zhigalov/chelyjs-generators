var getFinesByCarNumber = require('./getFinesByCarNumber');
var getFinesByDriverCard = require('./getFinesByDriverCard');
var isFineUnpaid = require('./isFineUnpaid');

function getUnpaidFines(carNumber, driverCard, cb) {
    var fines = [], getFinesCounter = 2;
    function onGetFinesReady(data) {
        fines = fines.concat(data);
        if (--getFinesCounter > 0) { return; }

        var unpaidFines = 0, isUnpaidCounter = fines.length;
        fines.forEach(function (fine) {
            isFineUnpaid(fine, function (isUnpaid) {
                if (--isUnpaidCounter > 0) {
                    isUnpaid && unpaidFines++;
                } else {
                    cb(unpaidFines);
                }
            })
        });
    }
    getFinesByCarNumber(carNumber, onGetFinesReady);
    getFinesByDriverCard(driverCard, onGetFinesReady);
}

getUnpaidFines('ABC', 'DEF', function (unpaidFines) {
    console.log(unpaidFines);
});
