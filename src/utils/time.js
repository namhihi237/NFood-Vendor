import moment from 'moment';

class TimeUtils {
  convertFullTime(date) {
    return moment(date).format('DD-MM-YYYY HH:mm');
  }

  convertDate() {
    return moment().format('DD-MM-YYYY');
  }
}

export default new TimeUtils();