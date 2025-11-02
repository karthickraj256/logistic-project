import React from "react";
import { UpDownArrowIcon } from "../../../assets/icons/normal-svg";

interface DataTableColumnInterface {
  name: string;
  key: string;
  Call?: (value: any) => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

interface DataTableInterface {
  header: DataTableColumnInterface[];
  values: any[];
  height: string;
}

function DataTable(props: DataTableInterface) {
  const { header, values, height } = props;
  return (
    <div className="table-card">
      <div className="table-wrap" style={{ height: "450px" }}>
        <table aria-label="Sample sticky table">
          <thead>
            <tr>
              {header.map((item: DataTableColumnInterface) => (
                <th key={item.key} style={{ width: item.width || "auto" }}>
                  <div className="header-content">
                    {item.name}

                    {item.sortable && (
                      <span className="sort-icon">
                        <UpDownArrowIcon />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((value: any) => (
              <tr>
                {header.map((item: DataTableColumnInterface) => (
                  <td>
                    <div className="col">
                      {item.Call ? item.Call(value) : value[item.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
