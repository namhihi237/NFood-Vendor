import moment from 'moment';

class TimeUtils {
  convertFullTime(date) {
    return moment(date).format('DD-MM-YYYY HH:mm');
  }
}

export default new TimeUtils();