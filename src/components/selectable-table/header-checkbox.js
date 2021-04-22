import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const HeaderCheckbox = ({checked, indeterminate = false, onClick}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.checked = checked;
        inputRef.current.indeterminate = indeterminate;
    }, [checked, indeterminate]);

    return (
        <input type="checkbox" checked={checked} ref={inputRef} onChange={onClick}/>
    );
};

HeaderCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    indeterminate: PropTypes.bool,
};

export default HeaderCheckbox;