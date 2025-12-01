import React from "react";
import {
  CloseIcon,
  UpDownArrowIcon,
  CircleCloseIcon,
  ClearFilterIcon,
} from "../../../assets/icons/normal-svg";
import { FilterDataInterface } from "../../interface/common";

interface DataTableColumnInterface {
  name: string;
  key: string;
  Call?: (value: any) => React.ReactNode;
  headerCall?: () => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

interface DataTableInterface {
  header: DataTableColumnInterface[];
  values: any[];
  sidePanel?: React.ReactNode;
  filterOptions: FilterDataInterface[];
  setFilterData: (filters: FilterDataInterface[]) => void;
}

function DataTable(props: DataTableInterface) {
  const { header, values, sidePanel, filterOptions, setFilterData } = props;
  const filterOptionClose = (name: string) => {
    const balancedFilters = filterOptions.map((filter) => {
      if (filter.name === name) {
        return { ...filter, value: "" };
      }
      return filter;
    });
    setFilterData(balancedFilters);
  };

  const filterOptionsClear = () => {
    console.log("Cleared All Filter Options");
    setFilterData(filterOptions.map(item => ({ ...item, value: "" })));
  };  
  return (
    <div className="table-card">
      {filterOptions?.filter((option) => option.value != '').length > 0 && (
        <div className="filter-options">
          {/* Filter options can be added here in the future */}
          <div className="filter-options-header">
            <div className="title">Filters</div>
            <div className="close-icon" onClick={filterOptionsClear} role="button">
              <ClearFilterIcon />
            </div>
          </div>
          <div className="filter-options-content">
            {filterOptions?.map((filter, index) => filter.value && (
              <div className="option-content" key={index}>
                <div className="label">
                  {filter.label} : {filter.value}
                </div>
                <div
                  className="close-icon"
                  onClick={() => filterOptionClose(filter.name)}
                >
                  <CircleCloseIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="table-wrap">
        <table aria-label="Sample sticky table">
          <thead>
            <tr>
              {header.map((item: DataTableColumnInterface) => (
                <th key={item.key} style={{ width: item.width || "auto" }}>
                  <div className="header-content">
                    {item.headerCall ? item.headerCall() : item.name}

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
      {sidePanel && <div className="view-tab">{sidePanel}</div>}
    </div>
  );
}

export default DataTable;
