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
  deleteRole,
  setFilterData,
  setViewColumns,
} from "../../../redux/slice/rolesSlice";
import ModalBox from "../../components/modal-box";
import AddRoleModal from "./add-role/add-role";
import EditRoleModal from "./add-role/edit-role";
import ViewRole from "./view-role/view-role";
import { setNotification } from "../../../redux/slice/notificationSlice";
import { exportFile } from "../../../utility/export";

function Roles() {
  const dispatch = useAppDispatch();
  const { totalCount, roles, filterData, viewColumns } = useAppSelector(
    (state) => state.roles
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

  const consumerAdd = () => {
    setModalContent({
      status: true,
      content: <AddRoleModal closeModal={closeModal} />,
      title: "Add Role",
      header: true,
    });
  };

  const consumerEdit = (id: string) => {
    const oldData = roles.find((item) => item.id === id);
    if (!oldData) return;
    setModalContent({
      status: true,
      content: <EditRoleModal closeModal={closeModal} oldData={oldData} />,
      title: "Edit Role",
      header: true,
    });
  };

  const consumerView = (id: string) => {
    const oldData = roles.find((item) => item.id === id);
    if (!oldData) return;
    setSidePanelContent(
      <ViewRole
        closeSidebar={() => setSidePanelContent(null)}
        currentConsumer={oldData}
      />
    );
  };

  const consumerDelete = (id: string) => {
    dispatch(deleteRole(id));
    dispatch(
      setNotification({
        notificationStatus: true,
        message: "Role deleted",
        type: "error",
      })
    );
  };

  const moreButton = [
    {
      label: "Edit",
      icon: <EditIcon />,
      function: consumerEdit,
    },
    {
      label: "Delete",
      icon: <TrashIcon color="#f00" />,
      function: consumerDelete,
    },
  ];

  const header = [
    {
      name: "Role Name",
      key: "roleName",
      sortable: true,
      Call: (value: any) => (
        <div>
          <div className="link-button" onClick={() => consumerView(value.id)}>
            {value.roleName}
          </div>
        </div>
      ),
    },
    {
      name: "Permissions",
      key: "permissions",
      sortable: true,
      Call: (value: any) => <div>{value.permissions.length} Permissions</div>,
    },
    {
      name: "Total Users",
      key: "totalUsers",
      sortable: true,
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
    const exportData = roles.map((data) => ({
      "Role Name": data.roleName,
      Permissions: data.permissions.join(", "),
      "Total Users": data.totalUsers,
    }));
    exportFile(exportData, key, "role");
  };

  useEffect(() => {
    // saveJsonFile();
  }, []);

  return (
    <div className="roles-wrap">
      <ModalBox
        openStatus={modalContent.status}
        content={modalContent.content}
        title={modalContent.title}
        header={modalContent.header}
        closeFunction={closeModal}
      />
      <div className="roles-header">
        <div className="header-left">
          <HeaderTitle title="Roles" />
        </div>
        <div className="header-right">
          Total Roles: <b>{totalCount}</b>
        </div>
      </div>
      <div className="roles-body white-box">
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
              onClick={consumerAdd}
            />
          </div>
        </div>
        <div className="full-table">
          <DataTable
            header={header}
            values={roles}
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

export default Roles;
