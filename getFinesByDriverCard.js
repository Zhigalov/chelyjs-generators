module.exports = function getFinesByDriverCard(driverCard, cb) {
    console.log('getFinesByDriverCard start', driverCard);
    setTimeout(function () {
        console.log('getFinesByDriverCard end', driverCard);
        cb(['004', '005']);
    }, 10);
};
