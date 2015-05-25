module.exports = function getFinesByCarNumber(carNumber, cb) {
    console.log('getFinesByCarNumber start', carNumber);
    setTimeout(function () {
        console.log('getFinesByCarNumber end', carNumber);
        cb(['001', '002', '003']);
    }, 20);
};
