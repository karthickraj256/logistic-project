import React from "react";
import { CloseIcon } from "../../../../assets/icons/normal-svg";
import RadioButton from "../../../components/radio-button";
import { useAppSelector } from "../../../../redux/hooks";
import { UserInterface } from "../../../interface/user";

interface ViewUserProps {
  currentConsumer: UserInterface;
  closeSidebar: () => void;
}

function ViewRole(props: ViewUserProps) {
  const { currentConsumer, closeSidebar } = props;
  return (
    <div className="view-role-wrap">
      <div className="view-role-header">
        <div className="title">{currentConsumer.name}</div>
        <div className="close-icon" onClick={closeSidebar} role="button">
          <CloseIcon />
        </div>
      </div>
      <div className="view-role-content">
        <div className="permissions">
        </div>
      </div>
    </div>
  );
}

export default ViewRole;
