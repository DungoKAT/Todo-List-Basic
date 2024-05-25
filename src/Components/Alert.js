import { useEffect } from "react";

const Alert = ({icon, message, type, removeAlert}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 2000)
        return () => clearTimeout(timeout)
    }, [removeAlert])

    return (
        <div className={`alert ${type}`} id="alert-box">
            <span>{icon}</span>
            <p className="alert-text">
                {message}
            </p>
        </div>
    );
};

export default Alert;