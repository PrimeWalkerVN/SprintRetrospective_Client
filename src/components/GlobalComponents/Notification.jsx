import { notification } from 'antd';
const Notification = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc,
    placement: 'bottomRight'
  });
};

export default Notification;
