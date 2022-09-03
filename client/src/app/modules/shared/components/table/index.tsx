/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { useTable, useSortBy, Column } from 'react-table';

interface IPropGetter {
  className?: string;
  style?: React.CSSProperties;
}

const defaultPropGetter = (props: { value: string }) => ({} as IPropGetter);

interface Props {
  columns: Column<any>[];
  data: any[];
  getHeaderProps?: typeof defaultPropGetter;
  getColumnProps?: typeof defaultPropGetter;
  getRowProps?: typeof defaultPropGetter;
  getCellProps?: typeof defaultPropGetter;
}

const Table: React.FC<Props> = ({
  data,
  columns,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps([
                  {
                    className: column.className,
                    style: column.style,
                  },
                  getColumnProps(column),
                  getHeaderProps(column),
                  column.getSortByToggleProps(),
                ])}
              >
                {column.render('Header')}
                <span>{column.isSorted ? column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps(getRowProps(row as any))}>
              {row.cells.map((cell: any) => {
                return (
                  <td
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ])}
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

export { Table };
