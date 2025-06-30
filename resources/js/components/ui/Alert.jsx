import { useState } from "react";

const Alert = ({ type, message }) => {
    const [showAlert, setShowAlert] = useState(true);

    if (!showAlert) {
        return "";
    }

    return (
        <div
            role="alert"
            className={`w-1/2 p-4 rounded-md alert alert-${type}`}
        >
            <strong>{type.charAt(0).toUpperCase() + type.slice(1)}!</strong>{" "}
            {message}
            <span onClick={() => setShowAlert(false)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </span>
        </div>
    );
};

export default Alert;
