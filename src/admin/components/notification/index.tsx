import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CircleCloseIcon, CloseIcon } from "../../../assets/icons/normal-svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNotification } from "../../../redux/slice/notificationSlice";

function NotificationComponent() {
  const dispatch = useAppDispatch();
  const { notificationStatus, message, type } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (notificationStatus) {
      const timer = setTimeout(() => {
        dispatch(setNotification({ notificationStatus: false, message: '', type: 'info' }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notificationStatus]);
  return notificationStatus
    ? ReactDOM.createPortal(
        <div className="notification-wrap">
          <div className="notification-icon">
            <CircleCloseIcon />
          </div>
          <div className="message">{message}</div>
        </div>,
        document.body
      )
    : null;
}

export default NotificationComponent;
