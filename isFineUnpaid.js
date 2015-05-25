module.exports = function isFineUnpaid(fine, cb) {
    console.log('isFineUnpaid start', fine);
    setTimeout(function () {
        console.log('isFineUnpaid end', fine);
        cb(Math.random() > 0.7);
    }, 50);
};
