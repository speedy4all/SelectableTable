import React from 'react';

const DownloadButton = ({disabled, ...rest}) => {
    return (
        <button {...rest}
                disabled={disabled}
                style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    background: 'white',
                    border: 'none',
                    fontSize: '0.8em'
                }}>
            <i className="fa fa-download"/> Download selected
        </button>
    );
};

export default DownloadButton;