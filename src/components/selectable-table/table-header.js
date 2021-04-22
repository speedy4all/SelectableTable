import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import HeaderCheckbox from "./header-checkbox";

const TableHeader = ({allSelectedState, onAllSelected, columns, selected, actions}) => {
    return (
        <thead className="header">
        <tr className="row actions" key="actions-row">
            <th>
                <HeaderCheckbox {...allSelectedState} onClick={onAllSelected}/>
            </th>
            <th colSpan={columns.length}>
                <div className="actions-container">
                    <span className="selected-text">
                        {`${selected.length ? `Selected ${selected.length}` : 'None selected'}`}
                    </span>
                    {actions.map((action, index) =>
                        <action.component key={`action_${index}`}
                            onClick={() => action.handler(selected)}
                            {...action.componentProps}
                            disabled={!action.isDisabled(selected)}/>
                    )}
                </div>
            </th>
        </tr>
        <tr className="row" key="title-row">
            <th>&nbsp;</th>
            {columns.map(({accessor, title, style = {}}, index) => (
                <th key={`${accessor}_${index}`} style={style}>
                    {title}
                </th>
            ))}
        </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    allSelectedState: PropTypes.object,
    onAllSelected: PropTypes.func,
    columns: PropTypes.array,
    selected: PropTypes.array,
    actions: PropTypes.array,
};

export default TableHeader;