import React, { useEffect } from "react";
import { saveAs } from 'file-saver';
import HeaderTitle from "../../components/header-title";
import DataTable from "../../components/data-table";

import TableColumnDropDown from "../../components/table-column-dropdown";
import FilterDropDown from "../../components/filter-dropdown";
import ExportButtonDropDown from "../../components/export-button-dropdown";
import Button from "../../components/botton";
import { DashboardIcon, UserAdd } from "../../../assets/icons/normal-svg";
import MoreButtonDropDown from "../../components/more-button-dropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

function Consumer() {
  const dispatch = useAppDispatch();
  const { totalCount, consumers } = useAppSelector((state) => state.consumer);
  const moreButton = [
    {
      label: "Edit",
      icon: <DashboardIcon />,
      function: () => {},
    },
    {
      label: "View",
      icon: <DashboardIcon />,
      function: () => {},
    },
    {
      label: "Delete",
      icon: <DashboardIcon />,
      function: () => {},
    },
  ];

  const filterData = [
    {
      label: "Start Date",
      name: "startDate",
      value: "",
      type: "date" as "date",
    },
    {
      label: "End Date",
      name: "endDate",
      value: "",
      type: "date" as "date",
    },
  ];
  const header = [
    {
      name: "Full Name",
      key: "fullName",
      width: "100px",
      sortable: true,
      Call: (value: any) => (
        <div>
          <div>{value.fullName}</div>
        </div>
      ),
    },
    {
      name: "Phone Number",
      key: "phoneNumber",
      width: "100px",
      sortable: true,
    },
    {
      name: "Address",
      key: "address",
      width: "100px",
      sortable: true,
    },
    {
      name: "GST Number",
      key: "gstNumber",
      width: "100px",
      sortable: true,
    },
    {
      name: "Pan Number",
      key: "panNumber",
      width: "100px",
      sortable: true,
    },
    {
      name: "Total Order",
      key: "totalOrder",
      width: "100px",
      sortable: true,
    },
    {
      name: "Action",
      key: "action",
      width: "100px",
      Call: (value: any) => (
        <MoreButtonDropDown buttonList={moreButton} value={String(value)} />
      ),
    },
  ];

  // const saveJsonFile = () => {
  //   const arrayData = [
  //     { id: 1, name: "John", age: 30 },
  //     { id: 2, name: "Jane", age: 25 },
  //   ];
  //   const jsonString = JSON.stringify(arrayData, null, 2);
  //   const blob = new Blob([jsonString], {
  //     type: "application/json;charset=utf-8",
  //   });

  //   saveAs(blob, "my-data.json");
  // };

  useEffect(() => {
    // saveJsonFile();
  }, []);

  return (
    <div className="consumer-wrap">
      <div className="consumer-header">
        <div className="header-left">
          <HeaderTitle title="Consumer" />
        </div>
        <div className="header-right">
          Total Consumer: <b>{totalCount}</b>
        </div>
      </div>
      <div className="consumer-body white-box">
        <div className="more-options">
          <div className="left-options flax-wrap">
            <FilterDropDown filterData={filterData} onChange={() => {}} />
            <ExportButtonDropDown onClick={() => {}} />
          </div>
          <div className="right-options flax-wrap">
            <TableColumnDropDown
              columnList={header.map((item) => ({
                name: item.key,
                label: item.name,
              }))}
              selectedKeys={header.map((item) => item.key)}
              onChange={() => {}}
            />
            <Button
              label="Add"
              icon={<UserAdd color="#ffffff" />}
              type="primary"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="full-table">
          <div className="filter-options"></div>
          <DataTable header={header} values={consumers} />
          <div className="view-tab"></div>
        </div>
      </div>
    </div>
  );
}

export default Consumer;
