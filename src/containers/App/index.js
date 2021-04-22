import React from 'react';
import SelectableTable from "../../components/selectable-table";
import payload from "../../utils/payload";
import DownloadButton from "../../components/download-button";

const columns = [
    {
        accessor: 'name',
        title: 'Name'
    },
    {
        accessor: 'device',
        title: 'Device'
    },
    {
        accessor: 'path',
        title: 'Path'
    },
    {
        accessor: 'status',
        title: 'Status',
        style: {paddingLeft: 29},
        render: (item) => <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{
                marginRight: 10,
                width: 15,
                height: 15,
                borderRadius: 10,
                backgroundColor: String(item.status).toLowerCase() === 'available' ? 'green' : 'transparent'
            }}/>
            <div>{`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</div>
        </div>
    },
];


const App = () => {

    const downloadHandler = (selected) =>
        alert(selected.reduce((acc, s) => `${acc}Device: ${s.device}\nPath: ${s.path}\n`, ''));

    const isSelectDisabled = (item) => String(item.status).toLowerCase() !== 'available';

    return (
        <SelectableTable
            isSelectDisabled={isSelectDisabled}
            data={payload} columns={columns}
            actions={[{
                component: DownloadButton,
                componentProps: {className: 'download-button'},
                handler: downloadHandler,
                isDisabled: (selected) => selected.length > 0,
            }]}/>
    );
};

export default App;