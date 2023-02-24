const moment = require('moment');

exports.NewDate = () => {
    const nowDate = moment();
    return new Date(Date.UTC(nowDate.year(), nowDate.month(), nowDate.date(), nowDate.hour(), nowDate.minute(), nowDate.second(), nowDate.millisecond()))
}