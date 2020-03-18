import PropTypes from 'prop-types';
import React from 'react';

Button.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
    isProcessing: PropTypes.bool
}

function Button({ label, color = '', onClick= null, isProcessing = false }) {
    return <button
        className={`user__actions-button ${color}`}
        onClick={onClick}
        disabled={isProcessing}>
            {label}
        </button>;
}

export default Button;
