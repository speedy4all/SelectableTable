import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import TableHeader from "./table-header";
// Styles
import './style.css';

const SelectableTable = ({data, columns, actions, isSelectDisabled = () => false}) => {

    const [selected, setSelected] = useState([]);

    const allSelectedState = useMemo(() => {
        const selectable = data.filter((item) => !isSelectDisabled(item));

        if (selected.length > 0 && selected.length === selectable.length) {
            return {checked: true, indeterminate: false};
        }
        if (selected.length > 0 && selected.length < selectable.length) {
            return {checked: false, indeterminate: true};
        }
        return {checked: false, indeterminate: false};
    }, [selected, data]);

    const onAllSelected = useCallback(({target: {checked, indeterminate}}) => {
            setSelected(((checked || indeterminate) &&
                [...data.filter((item) => !isSelectDisabled(item))]) || []);
        }, [data, setSelected]
    );

    const handleRowClick = (item) => {
        const selectedItem = selected.find(i => i === item);
        if (selectedItem) {
            setSelected(selected.filter(i => i !== selectedItem));
        } else {
            setSelected([...selected, item]);
        }
    }

    const renderRow = (item, index) => {
        const selectionDisabled = isSelectDisabled(item);
        const checked = selected.some((i) => i === item);

        return (
            <tr key={`${item.name}_${index}`}
                className={`row ${checked && 'selected' || ''}`}
                onClick={() => !selectionDisabled && handleRowClick(item)}
            >
                <td>
                    <input
                        type='checkbox'
                        disabled={selectionDisabled}
                        checked={checked}
                        onChange={({target: {checked}}) => {
                            if (checked) {
                                setSelected([...selected, item])
                            } else {
                                setSelected(selected.filter((i) => i !== item));
                            }
                        }}/>
                </td>
                {columns.map(({accessor, render}) => (
                    <td key={`${accessor}`}>
                        {render ? render(item) : item[accessor]}
                    </td>
                ))}
            </tr>
        );
    }

    return (
        <table className="selectable-table">
            <TableHeader
                actions={actions}
                onAllSelected={onAllSelected}
                selected={selected}
                columns={columns}
                allSelectedState={allSelectedState}/>

            <tbody className="body">
            {data.map(renderRow)}
            </tbody>
        </table>
    );
};

SelectableTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    actions: PropTypes.array,
    isSelectDisabled: PropTypes.func,
};

export default SelectableTable;