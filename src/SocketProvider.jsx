import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import socket from "./socket/socket";

import {
  addRealtimeNotification,
  fetchNotifications,
} from "./redux/features/notificationSlice";

export default function SocketProvider() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const notificationsEnabled = useSelector(
    (state) => state.settings.notificationsEnabled
  );

  const notificationsEnabledRef = useRef(notificationsEnabled);

  useEffect(() => {
    notificationsEnabledRef.current = notificationsEnabled;
  }, [notificationsEnabled]);

  useEffect(() => {
    if (!user?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", user._id);

    dispatch(fetchNotifications());

    const handleNotification = (data) => {
      if (!notificationsEnabledRef.current) {
        return;
      }

      dispatch(addRealtimeNotification(data));

      toast.success(data.message || "New notification");

      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      socket.disconnect();
    };
  }, [dispatch, user?._id]);

  return null;
}