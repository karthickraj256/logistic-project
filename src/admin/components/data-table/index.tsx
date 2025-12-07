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
  viewColumns?: string[];
}

function DataTable(props: DataTableInterface) {
  const { header, values, sidePanel, filterOptions, setFilterData, viewColumns } = props;
  const filterOptionClose = (name: string) => {
    const balancedFilters = filterOptions.map((filter) => {
      if (filter.name === name) {
        return { ...filter, value: "", value1: "" };
      }
      return filter;
    });
    setFilterData(balancedFilters);
  };

  const filterOptionsClear = () => {
    setFilterData(filterOptions.map(item => ({ ...item, value: "", value1: "" })));
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
                  {filter.label} : {filter.value} {filter.value1 ? `to ${filter.value1}` : ""}
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
              {header.map((item: DataTableColumnInterface) => viewColumns?.includes(item.key) || item.key === 'action' ? (
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
              ) : null)}
            </tr>
          </thead>
          <tbody>
            {values.map((value: any) => (
              <tr>
                {header.map((item: DataTableColumnInterface) => viewColumns?.includes(item.key) || item.key === 'action' ? (
                  <td>
                    <div className="col">
                      {item.Call ? item.Call(value) : value[item.key]}
                    </div>
                  </td>
                ) : null)}
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
