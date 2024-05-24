import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './TableComponent.css';

const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' , width: '100%'}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/predict');
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'cloudcover',
        accessor: 'cloudcover',
      },
      {
        Header: 'humidity',
        accessor: 'humidity',
      },
      {
        Header: 'precip',
        accessor: 'precip',
      },
      {
        Header: 'precipcover',
        accessor: 'precipcover',
      },
      {
        Header: 'precipprob',
        accessor: 'precipprob',
      },
      {
        Header: 'sealevelpressure',
        accessor: 'sealevelpressure',
      },
      {
        Header: 'temp',
        accessor: 'temp',
      },
      {
        Header: 'tempmax',
        accessor: 'tempmax',
      },
      {
        Header: 'tempmin',
        accessor: 'tempmin',
      },
      {
        Header: 'windgust',
        accessor: 'windgust',
      },
      // Add more columns as needed
    ],
    []
  );

  return (
    <div>
    <div>
      <h2>Data Table</h2>
      <DataTable columns={columns} data={data} />
    </div>
    <div className="row">
    <div>
    <img src="/download (1).png" alt="Jupyter Notebook Graph" />
    </div>
    <div>
    <img src="/download.png" alt="Jupyter Notebook Graph" />
    </div>
    <div>
    <img src="/download (2).png" alt="Jupyter Notebook Graph" />
    </div>

    </div>
    <div className="row">
    <div>
    <img className='image_width' src="/download (3).png" alt="Jupyter Notebook Graph" />
    </div>


    </div>
    </div>
  );
};

export default TableComponent;
