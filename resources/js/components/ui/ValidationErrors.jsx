import React from "react";

const ValidationErrors = ({errors}) => {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4">
                {Object.entries(errors).map(([field, messages]) => (
                    <p key={field} style={{ color: "red" }}>
                        <strong>{field}:</strong>{" "}
                        {Array.isArray(messages)
                            ? messages.join(" ")
                            : messages}
                    </p>
                ))}
            </div>
        )
    );
};

export default ValidationErrors;
