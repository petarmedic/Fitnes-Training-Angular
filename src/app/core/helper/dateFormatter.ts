const moment = require('moment-timezone')

export const getDateTimeInBelgradeFromString = (date: any) => {
  return new Date(moment(date).tz("Europe/Belgrade").format())
};

export const getCurrentDateTimeInBelgrade = () => {
  return new Date(moment().tz("Europe/Belgrade").format())
};

export const getDateTimeInBelgradeFromDate = (date: any) => {
  return new Date(moment(date).tz("Europe/Belgrade").format())
};
