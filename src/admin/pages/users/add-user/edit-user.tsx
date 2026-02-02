import React, { useState } from "react";
import Button from "../../../components/botton";
import InputBox from "../../../components/input-box";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateUser } from "../../../../redux/slice/usersSlice";
import { setNotification } from "../../../../redux/slice/notificationSlice";
import { FormUserInterface, UserInterface } from "../../../interface/user";
import TabMenus from "../../../components/tab-menus";
import { SelectBoxListItem } from "../../../interface/common";

interface AddUserModalInterface {
  closeModal: () => void;
  oldData: UserInterface;
}

function EditUserModal(props: AddUserModalInterface) {
  const { closeModal, oldData } = props;
  const tabs = [
    { label: "User Details", key: "userDetails" },
    { label: "Account Details", key: "account" },
  ];
  const [activeTabKey, setActiveTabKey] = useState<string>("userDetails");
  const dispatch = useAppDispatch();
  const { roles } = useAppSelector((state) => state.roles);
  const [formData, setFormData] = useState<FormUserInterface>(oldData || {
    name: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
    address: "",
    salary: 0,
    role: "",
    roleName: '',
    accountDetails: {
      accountNumber: "",
      bankName: "",
      ifcNumber: "",
      branch: "",
    },
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAccountChanges = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      accountDetails: {
        ...formData.accountDetails,
        [name]: value,
      },
    });
  };

  const onAutoCompleteClick = (name: string, value: SelectBoxListItem) => {
    setFormData({
      ...formData,
      [name]: value.id,
      roleName: value.name,
    });
  };

  const handleSubmit = () => {
    dispatch(updateUser({
      ...formData,
      id: oldData.id,
      status: true,
    }));
    dispatch(
      setNotification({
        notificationStatus: true,
        message: "User Updated",
        type: "success",
      })
    );
    closeModal();
  };

  return (
    <div className="add-user-wrap">
      <div className="add-user-header">
        <TabMenus
          tabs={tabs}
          onTabClick={setActiveTabKey}
          activeTabKey={activeTabKey}
        />
      </div>
      {activeTabKey === "userDetails" ? (
        <div className="add-user-form">
          <div className="form-field">
            <InputBox
              label="User Name"
              name="name"
              id="name"
              placeholder="Enter user name"
              onChange={handleChange}
              required
              type="text"
              value={formData.name}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="Email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
              type="text"
              value={formData.email}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter phone number"
              onChange={handleChange}
              required
              type="text"
              value={formData.phoneNumber}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="Role"
              name="role"
              id="role"
              placeholder="Enter role name"
              onAutoCompleteClick={onAutoCompleteClick}
              onChange={() => {}}
              required
              type="select"
              dataList={roles.map((role) => ({
                name: role.roleName,
                id: role.id,
              }))}
              value={formData.roleName}
            />
          </div>
          <div className="form-field address-field">
            <InputBox
              label="Address"
              name="address"
              id="address"
              placeholder="Enter Address"
              onChange={handleChange}
              required
              type="textarea"
              value={formData.address}
            />
          </div>
        </div>
      ) : (
        <div className="add-user-form">
          <div className="form-field">
            <InputBox
              label="Account Number"
              name="accountNumber"
              id="accountNumber"
              placeholder="Enter account number"
              onChange={handleAccountChanges}
              required
              type="text"
              value={formData.accountDetails.accountNumber}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="Bank Name"
              name="bankName"
              id="bankName"
              placeholder="Enter bank name"
              onChange={handleAccountChanges}
              required
              type="text"
              value={formData.accountDetails.bankName}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="IFSC Number"
              name="ifcNumber"
              id="ifcNumber"
              placeholder="Enter ifsc number"
              onChange={handleAccountChanges}
              required
              type="text"
              value={formData.accountDetails.ifcNumber}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="Branch"
              name="branch"
              id="branch"
              placeholder="Enter branch"
              onChange={handleAccountChanges}
              required
              type="text"
              value={formData.accountDetails.branch}
            />
          </div>
          <div className="form-field">
            <InputBox
              label="Salary"
              name="salary"
              id="salary"
              placeholder="Enter salary"
              onChange={handleChange}
              required
              type="number"
              value={formData.salary}
            />
          </div>
        </div>
      )}
      <div className="add-user-footer">
        <div className="footer-buttons">
          <Button label="Cancel" type="default" onClick={closeModal} />
          <Button label="Edit User" type="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
