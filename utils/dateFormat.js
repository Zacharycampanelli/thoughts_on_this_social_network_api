const dayjs = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


const formatDate = (date) => {
  // formats date in localized format 'ddd, MMM D, YYYY h:mm A'
  let datestr = dayjs(date).format('llll');
  return datestr;
}

module.exports = formatDate;
