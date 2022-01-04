import moment from 'moment';

class TimeUtils {
  convertFullTime(date) {
    return moment(date).format('DD-MM-YYYY HH:mm');
  }

  convertDate(date) {
    return moment(date).format('DD-MM-YYYY');
  }

  convertMonth(date) {
    return moment(date).format('MM-YYYY');
  }
}

export default new TimeUtils();