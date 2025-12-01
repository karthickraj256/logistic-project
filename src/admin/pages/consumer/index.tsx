import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import HeaderTitle from "../../components/header-title";
import DataTable from "../../components/data-table";

import TableColumnDropDown from "../../components/table-column-dropdown";
import FilterDropDown from "../../components/filter-dropdown";
import ExportButtonDropDown from "../../components/export-button-dropdown";
import Button from "../../components/botton";
import { DashboardIcon, UserAdd } from "../../../assets/icons/normal-svg";
import MoreButtonDropDown from "../../components/more-button-dropdown";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  FilterDataInterface,
  ModalContentInterface,
} from "../../interface/common";
import { deleteConsumer, setFilterData } from "../../../redux/slice/consumerSlice";
import ModalBox from "../../components/modal-box";
import AddConsumerModal from "./add-consumer/add-consumer";
import EditConsumerModal from "./add-consumer/edit-consumer";
import ViewConsumer from "./view-consumer/view-consumer";
import { setNotification } from "../../../redux/slice/notificationSlice";

function Consumer() {
  const dispatch = useAppDispatch();
  const { totalCount, consumers, filterData } = useAppSelector(
    (state) => state.consumer
  );
  const [modalContent, setModalContent] = useState<ModalContentInterface>({
    status: false,
    content: <div></div>,
    header: true,
    title: "",
  });
  const [sidePanelContent, setSidePanelContent] = useState<React.ReactNode>(null);

  const closeModal = () => {
    setModalContent({ ...modalContent, status: false });
  };

  const consumerAdd = () => {
    setModalContent({
      status: true,
      content: <AddConsumerModal closeModal={closeModal} />,
      title: "Add Consumer",
      header: true,
    });
  };

  const consumerEdit = (id: string) => {
    const oldData = consumers.find(item => item.id === id);
    if (!oldData) return;
    setModalContent({
      status: true,
      content: <EditConsumerModal closeModal={closeModal} oldData={oldData} />,
      title: "Add Consumer",
      header: true,
    });
  };

  const consumerView = (id: string) => {
    const oldData = consumers.find(item => item.id === id);
    if (!oldData) return;
    setSidePanelContent(<ViewConsumer closeSidebar={() => setSidePanelContent(null)} currentConsumer={oldData} />);
  };

  const consumerDelete = (id: string) => {
    dispatch(deleteConsumer(id));
    dispatch(setNotification({ notificationStatus: true, message: 'Consumer deleted', type: 'error' }));
  };

  const moreButton = [
    {
      label: "Edit",
      icon: <DashboardIcon />,
      function: consumerEdit,
    },
    {
      label: "View",
      icon: <DashboardIcon />,
      function: consumerView,
    },
    {
      label: "Delete",
      icon: <DashboardIcon />,
      function: consumerDelete,
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
          <div className="link-button" onClick={() => consumerView(value.id)}>{value.fullName}</div>
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
        <MoreButtonDropDown buttonList={moreButton} value={value.id} />
      ),
    },
  ];

  const handleFilterData = (filters: FilterDataInterface[]) => {
    dispatch(setFilterData(filters));
  };

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
      <ModalBox
        openStatus={modalContent.status}
        content={modalContent.content}
        title={modalContent.title}
        header={modalContent.header}
        closeFunction={closeModal}
      />
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
            <FilterDropDown
              filterData={filterData}
              onChange={handleFilterData}
            />
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
              onClick={consumerAdd}
            />
          </div>
        </div>
        <div className="full-table">
          <DataTable
            header={header}
            values={consumers}
            filterOptions={filterData}
            setFilterData={handleFilterData}
            sidePanel={sidePanelContent}
          />
        </div>
      </div>
    </div>
  );
}

export default Consumer;
