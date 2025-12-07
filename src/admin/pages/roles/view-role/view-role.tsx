import React from "react";
import { CloseIcon } from "../../../../assets/icons/normal-svg";
import { RoleInterface } from "../../../interface/role";
import RadioButton from "../../../components/radio-button";
import { useAppSelector } from "../../../../redux/hooks";

interface ViewRoleProps {
  currentConsumer: RoleInterface;
  closeSidebar: () => void;
}

function ViewRole(props: ViewRoleProps) {
  const { permissions } = useAppSelector(state => state.roles)
  const { currentConsumer, closeSidebar } = props;
  return (
    <div className="view-role-wrap">
      <div className="view-role-header">
        <div className="title">{currentConsumer.roleName}</div>
        <div className="close-icon" onClick={closeSidebar} role="button">
          <CloseIcon />
        </div>
      </div>
      <div className="view-role-content">
        <div className="permissions">
          {permissions.map((permissionSession) => (
            <div className="permission-session">
              <div className="permission-header">{permissionSession.name}</div>
              <div className="permission-content">
                <RadioButton
                  activeValue={currentConsumer.permissions}
                  buttonList={permissionSession.subPermissions}
                  onChange={() => {}}
                  type="row"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewRole;
