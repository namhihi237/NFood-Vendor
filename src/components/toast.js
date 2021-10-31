import { Toast } from 'native-base';

export default (title, status, duration = 3000) => {
  Toast.show({
    title,
    status,
    duration
  });
};
