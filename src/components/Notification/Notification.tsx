import css from './Notification.module.css';

interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  return <p className={css.text}>{message}</p>;
}