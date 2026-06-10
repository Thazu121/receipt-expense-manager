import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import socket from "../../socket/socket";

import {
  addRealtimeNotification,
  fetchNotifications,
} from "../../redux/features/notificationSlice";

export default function NotificationListener() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?._id) return;

    dispatch(fetchNotifications());

    socket.connect();

    socket.emit("join", user._id);

    socket.on("notification", (notification) => {
      dispatch(addRealtimeNotification(notification));

      toast.success(
        notification.title ||
          notification.message ||
          "New notification"
      );

      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, [dispatch, user?._id]);

  return null;
}