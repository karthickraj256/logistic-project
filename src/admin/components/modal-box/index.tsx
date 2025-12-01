import React from "react";
import { CircleCloseIcon } from "../../../assets/icons/normal-svg";

interface ModalBoxInterface {
  openStatus: boolean;
  content: React.ReactNode;
  header?: boolean;
  closeFunction?: () => void;
  title?: string;
}

function ModalBox(props: ModalBoxInterface) {
  const { openStatus, content, header = true, closeFunction = () => {}, title = "" } = props;
  return openStatus ? (
    <div className="modal-box-wrap">
      <div className="modal-box">
        {header && (
          <div className="modal-box-header">
            <div className="title">{title}</div>
            <div className="close" onClick={closeFunction}>
              <CircleCloseIcon width="22" height="22" color="#000" />
            </div>
          </div>
        )}
        <div className="modal-box-body">{content}</div>
      </div>
    </div>
  ) : null;
}

export default ModalBox;
