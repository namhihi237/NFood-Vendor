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

  formatDate(date) {
    return moment(date).format('DD-MM-YYYY').split('-').reverse().join('-');
  }

  formatMonth(date) {
    return moment(date).format('MM-YYYY').split('-').reverse().join('-');
  }
}

export default new TimeUtils();