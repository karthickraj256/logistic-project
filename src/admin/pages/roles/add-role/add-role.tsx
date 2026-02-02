import React, { useState } from "react";
import Button from "../../../components/botton";
import InputBox from "../../../components/input-box";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { createRole } from "../../../../redux/slice/rolesSlice";
import { setNotification } from "../../../../redux/slice/notificationSlice";
import { FormRoleInterface } from "../../../interface/role";
import RadioButton from "../../../components/radio-button";

interface AddRoleModalInterface {
  closeModal: () => void;
}

function AddRoleModal(props: AddRoleModalInterface) {
  const { closeModal } = props;
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.roles);
  const [formData, setFormData] = useState<FormRoleInterface>({
    roleName: "",
    permissions: [],
    totalUsers: 0,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePermission = (value: string) => {
    if (formData.permissions.includes(value)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((permission) => permission !== value),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, value],
      });
    }
  };

  const handleSubmit = () => {
    dispatch(createRole(formData));
    dispatch(
      setNotification({
        notificationStatus: true,
        message: "Role added",
        type: "success",
      })
    );
    closeModal();
  };

  return (
    <div className="add-role-wrap">
      <div className="add-role-form">
        <div className="form-field">
          <InputBox
            label="Role Name"
            name="roleName"
            id="roleName"
            placeholder="Enter role name"
            onChange={handleChange}
            required
            type="text"
            value={formData.roleName}
          />
        </div>
        <div className="permissions">
          {permissions.map((permissionSession) => (
            <div className="permission-session">
              <div className="permission-header">{permissionSession.name}</div>
              <div className="permission-content">
                <RadioButton
                  activeValue={formData.permissions}
                  buttonList={permissionSession.subPermissions}
                  onChange={handlePermission}
                  type="row"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="add-role-footer">
        <div className="footer-buttons">
          <Button label="Cancel" type="default" onClick={closeModal} />
          <Button
            label="Add Role"
            type="primary"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AddRoleModal;
