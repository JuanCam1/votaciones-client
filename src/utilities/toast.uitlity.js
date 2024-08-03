import { toast } from "sonner";

export const NotificationError = ( message) => {
  toast.error(message, {
    style: {
      padding: "16px",
      fontSize: "16px"
    }
  });
};

export const NotificationSucces = ( message) => {
  toast.success(message, {
    style: {
      padding: "16px",
      fontSize: "16px"
    }
  });
};

export const NotificationWarning = ( message) => {
  toast.warning(message, {
    style: {
      padding: "16px",
      fontSize: "16px"
    }
  });
};
