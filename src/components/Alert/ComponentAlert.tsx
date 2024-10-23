import React from "react";
import Alert from "@mui/material/Alert";
import style from "../alert/component-alert.module.css";

interface ComponentAlertProps {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  onClose?: () => void;
  sx?: object; 
}

const ComponentAlert: React.FC<ComponentAlertProps> = ({
  open,
  severity,
  message,
  onClose,
  sx
}) => {
  return (
    <div className={`${style['alert']}`}>
      {open && (
        <Alert
          variant="filled"
          severity={severity}
          onClose={onClose}
          sx={sx} 
        >
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ComponentAlert;