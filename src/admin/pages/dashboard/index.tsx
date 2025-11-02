import React, { useState } from "react";

// Components
import HeaderTitle from "../../components/header-title";
import InputBox from "../../components/input-box";
import DateInputBox from "../../components/date-input-box";
import DataTable from "../../components/data-table";

// Interface
import { SelectBoxListItem } from "../../interface/common";

// assets files
import {
  DashboardOrderIcon,
  DashboardPendingIcon,
  DashboardSalesIcon,
  DashboardUserIcon,
  PercentageDownIcon,
  PercentageUpIcon,
} from "../../../assets/icons/color-svg";
import { SearchIconInput } from "../../../assets/icons/normal-svg";
import usersList from "../../../assets/json/admin/users.json";
import usersLists from "../../../assets/json/admin/userlist.json";
import Button from "../../components/botton";
import FilterDropDown from "../../components/filter-dropdown";

function Dashboard() {
  const [values, setValues] = useState<any>({});

  const handleChange = (name: string, value: string | number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAutoCompleteChange = (name: string, value: SelectBoxListItem) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value.name,
    }));
  };

  const header = [
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
      Call: (value: any) => (
        <div>
          <div>{value.firstName}</div>
        </div>
      )
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
      sortable: true,
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
    {
      name: "First Name",
      key: "firstName",
      width: "100px",
    },
  ];

  const filterData = [
    {
      label: "Filter 1",
      name: "filter1",
      value: "",
      placeholder: "Select Filter 1",
      type: "text" as "text",
    },
    {
      label: "Filter 2",
      name: "filter2",
      value: "",
      placeholder: "Select Filter 2",
      type: "select" as "select",
      dataList: usersList,
    },
    {
      label: "Filter 3",
      name: "filter3",
      value: "",
      placeholder: "Select Filter 3",
      type: "date" as "date",
    },
  ]


  return (
    <div className="dashboard-wrap">
      <div className="dashboard-header">
        <div className="header-left">
          <HeaderTitle title="Dashboard" />
        </div>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-content">
          <div className="dashboard-cards-list">
            <div className="dashboard-card">
              <div className="card-content">
                <div className="card-title">Total Users</div>
                <div className="card-value">40,689</div>
              </div>
              <div className="card-icon">
                <DashboardUserIcon />
              </div>
              <div className="card-message">
                <div className="message">
                  <span style={{ color: "#00B69B" }}>
                    <PercentageUpIcon /> 8.5%
                  </span>{" "}
                  Up from yesterday
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-content">
                <div className="card-title">Total Order</div>
                <div className="card-value">10,293</div>
              </div>
              <div className="card-icon">
                <DashboardOrderIcon />
              </div>
              <div className="card-message">
                <div className="message">
                  <span style={{ color: "#00B69B" }}>
                    <PercentageUpIcon /> 1.3%
                  </span>{" "}
                  Up from past week
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-content">
                <div className="card-title">Total Sales</div>
                <div className="card-value">$ 89,000</div>
              </div>
              <div className="card-icon">
                <DashboardSalesIcon />
              </div>
              <div className="card-message">
                <div className="message">
                  <span style={{ color: "#F93C65" }}>
                    <PercentageDownIcon /> 4.3%
                  </span>{" "}
                  Down from yesterday
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-content">
                <div className="card-title">Total Pending</div>
                <div className="card-value">2040</div>
              </div>
              <div className="card-icon">
                <DashboardPendingIcon />
              </div>
              <div className="card-message">
                <div className="message">
                  <span style={{ color: "#00B69B" }}>
                    <PercentageUpIcon /> 1.6%
                  </span>{" "}
                  Up from yesterday
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-components white-box">
            <div className="chart-item flax-wrap">
              <div>
                <InputBox
                  label="Input Label"
                  name="input"
                  placeholder="Type here to search..."
                  onChange={handleChange}
                  frontIcon={<SearchIconInput />}
                  backIcon={<SearchIconInput />}
                  type="text"
                  required
                  readOnly={false}
                  disabled={false}
                  value={values.input || ""}
                />
              </div>
              <div>
                <InputBox
                  label="Input Label"
                  name="password"
                  placeholder="Type here to search..."
                  onChange={handleChange}
                  required
                  type="password"
                  readOnly={false}
                  disabled={false}
                  value={values.password || ""}
                />
              </div>
              <div>
                <InputBox
                  label="Input Label"
                  name="autocomplete"
                  placeholder="Type here to search..."
                  onChange={handleChange}
                  type="autocomplete"
                  required
                  readOnly={false}
                  disabled={false}
                  dataList={usersList}
                  onAutoCompleteClick={handleAutoCompleteChange}
                  value={values.autocomplete || ""}
                />
              </div>
              <div>
                <InputBox
                  label="Input Label"
                  name="select"
                  placeholder="Type here to search..."
                  onChange={handleChange}
                  type="select"
                  required
                  readOnly={false}
                  disabled={false}
                  dataList={usersList}
                  onAutoCompleteClick={handleAutoCompleteChange}
                  value={values.select || ""}
                />
              </div>
              <div>
                <InputBox
                  label="Input Label"
                  name="number"
                  placeholder="Type here to search..."
                  onChange={handleChange}
                  type="number"
                  required
                  readOnly={false}
                  disabled={false}
                  value={values.number || 0}
                />
              </div>
              <div>
                <DateInputBox
                  label="Input Label"
                  name="textarea"
                  onChange={handleChange}
                  required
                  disabled={false}
                  value={values.textarea || ""}
                />
              </div>
              <div>
                <InputBox
                  label="Input Label"
                  name="textarea"
                  placeholder="Type here to address..."
                  onChange={handleChange}
                  type="textarea"
                  required
                  readOnly={false}
                  disabled={false}
                  value={values.textarea || ""}
                />
              </div>
              <div><Button label="Submit" type="primary" onClick={() => {}} /></div>
              <div><Button label="Submit" type="warning" onClick={() => {}} /></div>
              <div><Button label="Submit" type="success" onClick={() => {}} /></div>
              <div><Button label="Submit" type="danger" onClick={() => {}} /></div>
              <div><Button label="Submit" type="default" onClick={() => {}} /></div>
              <div><FilterDropDown filterData={filterData} onChange={handleChange} /></div>
            </div>
          </div>
          <div className="white-box">
            <DataTable header={header} values={usersLists} height="30vh" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
