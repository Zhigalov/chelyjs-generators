function getFinesByCarNumber(carNumber, cb) {
    setTimeout(function () {
        cb(['001', '002', '003']);
    }, 2);
}

function getFinesByDriverCard(driverCard, cb) {
    setTimeout(function () {
        cb(['004', '005']);
    }, 1);
}

function isFinesUnpaid(fine, cb) {
    setTimeout(function () {
        cb(Math.random() > 0.7);
    }, 5);
}

function getUnpaidFines(carNumber, driverCard, cb) {
    var fines = [];
    var readyCounter = 0;

    function onGetFinesReady(data) {
        fines = fines.concat(data);
        if (++readyCounter < 2) {
            return;
        }

        var unpaidFines = [];
        (function getUnpaidFines() {
            if (!fines.length) {
                return cb(unpaidFines);
            }
            var fine = fines.shift();
            isFinesUnpaid(fine, function (isUnpaid) {
                isUnpaid && unpaidFines.push(fine);
                getUnpaidFines();
            });
        })();
    }

    getFinesByCarNumber(carNumber, onGetFinesReady);
    getFinesByDriverCard(driverCard, onGetFinesReady);
}

getUnpaidFines('ABC', 'DEF', function (unpaidFines) {
    console.log(unpaidFines);
});
