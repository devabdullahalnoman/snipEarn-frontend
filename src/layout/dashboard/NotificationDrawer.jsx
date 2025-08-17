import { useState, useEffect, useRef } from "react";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router";
import useNotifications from "../../hooks/useNotifications";

const NotificationDrawer = ({ userEmail }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();
  const { data: notifications = [] } = useNotifications(userEmail);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={() => setOpen(!open)} className="btn btn-ghost">
        <IoNotifications size={28} />
      </button>

      {open && (
        <div className="absolute z-50 top-full right-0 mt-3 w-xs sm:w-md md:w-lg lg:w-xl max-h-[80vh] rounded-lg border shadow-lg bg-base-100 overflow-y-auto">
          <div className="p-4 border-b text-lg font-semibold">
            Notifications
          </div>
          <ul className="divide-y divide-base-200">
            {notifications.length === 0 ? (
              <li className="p-4 text-sm text-gray-500">
                No new notifications
              </li>
            ) : (
              notifications
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((n, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(n.actionRoute);
                      setOpen(false);
                    }}
                    className="p-4 cursor-pointer hover:bg-base-200 transition-all"
                  >
                    <p className="text-sm">{n.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDrawer;
