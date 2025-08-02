/**
 * Description:
 * A simple reusable component for rendering confirmation text and a "Delete" button.
 * 
 * Props:
 * - content (string): the confirmation message to display
 * - onDelete (function): function to execute when the "Delete" button is clicked
 */


import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
    return (
        <div className="p-5">
            {/* Confirmation Message */}
            <p className="text-[14px]">{content}</p>

            {/* Delete Button aligned to right */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="btn-small"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}


export default DeleteAlertContent