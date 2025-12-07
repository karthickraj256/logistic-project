import React, { useState } from "react";
import Button from "../../../components/botton";
import InputBox from "../../../components/input-box";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setNotification } from "../../../../redux/slice/notificationSlice";
import { FormRoleInterface, RoleInterface } from "../../../interface/role";
import { updateRole } from "../../../../redux/slice/rolesSlice";
import RadioButton from "../../../components/radio-button";

interface AddRoleModalInterface {
  closeModal: () => void;
  oldData: RoleInterface;
}

function EditRoleModal(props: AddRoleModalInterface) {
  const { closeModal, oldData } = props;
  const { permissions } = useAppSelector((state) => state.roles);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormRoleInterface>({
    roleName: oldData?.roleName || "",
    permissions: oldData?.permissions || [],
    totalUsers: oldData?.totalUsers || 0,
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
    dispatch(updateRole({ ...formData, id: oldData.id }));
    dispatch(
      setNotification({
        notificationStatus: true,
        message: "Role updated",
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
          <Button label="Edit Consumer" type="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default EditRoleModal;
