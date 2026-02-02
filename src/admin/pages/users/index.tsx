import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/header-title";
import DataTable from "../../components/data-table";

import TableColumnDropDown from "../../components/table-column-dropdown";
import FilterDropDown from "../../components/filter-dropdown";
import ExportButtonDropDown from "../../components/export-button-dropdown";
import Button from "../../components/botton";
import { EditIcon, TrashIcon, UserAdd } from "../../../assets/icons/normal-svg";
import MoreButtonDropDown from "../../components/more-button-dropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  FilterDataInterface,
  ModalContentInterface,
} from "../../interface/common";
import {
  deleteUser,
  setFilterData,
  setViewColumns,
} from "../../../redux/slice/usersSlice";
import ModalBox from "../../components/modal-box";
import AddUserModal from "./add-user/add-user";
import EditUserModal from "./add-user/edit-user";
import ViewUser from "./view-user/view-user";
import { setNotification } from "../../../redux/slice/notificationSlice";
import { exportFile } from "../../../utility/export";

function Users() {
  const dispatch = useAppDispatch();
  const { totalCount, users, filterData, viewColumns } = useAppSelector(
    (state) => state.users
  );
  const [modalContent, setModalContent] = useState<ModalContentInterface>({
    status: false,
    content: <div></div>,
    header: true,
    title: "",
  });
  const [sidePanelContent, setSidePanelContent] =
    useState<React.ReactNode>(null);

  const closeModal = () => {
    setModalContent({ ...modalContent, status: false });
  };

  const userAdd = () => {
    setModalContent({
      status: true,
      content: <AddUserModal closeModal={closeModal} />,
      title: "Add User",
      header: true,
    });
  };

  const userEdit = (id: string) => {
    const oldData = users.find((item) => item.id === id);
    if (!oldData) return;
    setModalContent({
      status: true,
      content: <EditUserModal closeModal={closeModal} oldData={oldData} />,
      title: "Edit User",
      header: true,
    });
  };

  const userView = (id: string) => {
    const oldData = users.find((item) => item.id === id);
    if (!oldData) return;
    setSidePanelContent(
      <ViewUser
        closeSidebar={() => setSidePanelContent(null)}
        currentConsumer={oldData}
      />
    );
  };

  const userDelete = (id: string) => {
    dispatch(deleteUser(id));
    dispatch(
      setNotification({
        notificationStatus: true,
        message: "User Deleted",
        type: "error",
      })
    );
  };

  const moreButton = [
    {
      label: "Edit",
      icon: <EditIcon />,
      function: userEdit,
    },
    {
      label: "Delete",
      icon: <TrashIcon color="#f00" />,
      function: userDelete,
    },
  ];

  const header = [
    {
      name: "User Name",
      key: "name",
      sortable: true,
      Call: (value: any) => (
        <div className="profile-column">
          <img src={value.profileImage} alt="" />
          <div className="link-button" onClick={() => userView(value.id)}>
            {value.name}
          </div>
        </div>
      ),
    },
    {
      name: "email",
      key: "email",
      sortable: true,
    },
    {
      name: "Phone Number",
      key: "phoneNumber",
      sortable: true,
    },
    {
      name: "Address",
      key: "address",
      sortable: true,
    },
    {
      name: "Salary Amount",
      key: "salary",
      sortable: true,
    },
    {
      name: "Role",
      key: "role",
      sortable: true,
      Call: (value: any) => (
        <div>{value.roleName}</div>
      )
    },
    {
      name: "Action",
      key: "action",
      width: "100px",
      Call: (value: any) => (
        <MoreButtonDropDown buttonList={moreButton} value={value.id} />
      ),
    },
  ];

  const handleFilterData = (filters: FilterDataInterface[]) => {
    dispatch(setFilterData(filters));
  };

  const handleViewColumns = (list: string[]) => {
    dispatch(setViewColumns(list));
  };

  const toExportFile = (key: string) => {
    const exportData = users.map((data) => ({
      "User Name": data.name, 
      "Email": data.email, 
      "Phone Number": data.phoneNumber, 
      "Address": data.address, 
      "status": data.status ? 'Active' : 'Inactive', 
      "Role": data.role,
      "Account Number": data.accountDetails.accountNumber,
      "Salary": data.salary,
      "Bank Name": data.accountDetails.bankName,
      "Branch Name": data.accountDetails.branch,
      "IFSC Number": data.accountDetails.ifcNumber,
    }));
    exportFile(exportData, key, "users");
  };

  useEffect(() => {
    // saveJsonFile();
  }, []);

  return (
    <div className="users-wrap">
      <ModalBox
        openStatus={modalContent.status}
        content={modalContent.content}
        title={modalContent.title}
        header={modalContent.header}
        closeFunction={closeModal}
      />
      <div className="users-header">
        <div className="header-left">
          <HeaderTitle title="Users" />
        </div>
        <div className="header-right">
          Total Users: <b>{totalCount}</b>
        </div>
      </div>
      <div className="users-body white-box">
        <div className="more-options">
          <div className="left-options flax-wrap">
            <FilterDropDown
              filterData={filterData}
              onChange={handleFilterData}
            />
            <ExportButtonDropDown onClick={toExportFile} />
          </div>
          <div className="right-options flax-wrap">
            <TableColumnDropDown
              columnList={header
                .map((item) => ({
                  name: item.key,
                  label: item.name,
                }))
                .filter((item) => item.name !== "action")}
              selectedKeys={viewColumns}
              onChange={handleViewColumns}
            />
            <Button
              label="Add"
              icon={<UserAdd color="#ffffff" />}
              type="primary"
              onClick={userAdd}
            />
          </div>
        </div>
        <div className="full-table">
          <DataTable
            header={header}
            values={users}
            filterOptions={filterData}
            setFilterData={handleFilterData}
            sidePanel={sidePanelContent}
            viewColumns={viewColumns}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;
