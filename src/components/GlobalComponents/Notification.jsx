import { notification } from 'antd';
const Notification = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc
  });
};

export default Notification;
