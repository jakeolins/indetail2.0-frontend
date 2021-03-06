import React from 'react';

function TableView(props) {
    
    const rows = [];

    for (const rowNumber in props.rows) {
        const row = props.rows[rowNumber];

        rows.push(<ViewRow
            rowNumber={rowNumber}
            row={row}
            columns={props.columns}
            title={props.title}
            key={`${props.title}-${rowNumber}-row`}
        />);
    }

    return (
        <div className="container">
            <div className="table-view">
                <div className='table-view-header'>
                    <h2>{props.title}</h2>
                    <div className="table-view-header-button-wrapper">
                        {(() => {
                            if (props.createButton) {
                                return <button onClick={props.createButton.onClick}>+</button>
                            }
                            return '';
                        })()}
                    </div>
                </div>
                <hr/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {columnHeaders(props)}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function columnHeaders(props) {
    const headerCells = [];

    for (const column of props.columns) {
        headerCells.push(
            <th key={`${props.title}-${column.label}-header`}>{column.label}</th>
        )
    }

    return headerCells;
}

function ViewRow(props) {
    const cells = [];

    for (const column of props.columns) {
        const value = props.row[column.propertyName];

        if (Array.isArray(value)) {
            cells.push(
                <td 
                    key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                >
                    <ul>
                        {(() => {
                            const listItems = [];

                            for (const itemIndex in value) {
                                const item = value[itemIndex];
                                listItems.push(
                                    <li 
                                        key={`${props.title}-${props.rowNumber}-${column.propertyName}-${itemIndex}`}
                                    >
                                        {item}
                                    </li>
                                )
                            }

                            return listItems;
                        })()}
                    </ul>
                </td>
            )
        }
        else {
            if (column.onClick) {
                cells.push(
                    <td 
                        key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                    >
                        <button 
                            className='button-link'
                            onClick={() => column.onClick(props.rowNumber)}
                        >
                            {value}
                        </button>
                    </td>
                )
            }
            else {
                cells.push(
                    <td 
                        key={`${props.title}-${props.rowNumber}-${column.propertyName}`}
                    >
                        {value}
                    </td>
                )
            }
        }
    }

    return (
        <tr>
            {cells}
        </tr>
    );
}

export default TableView;