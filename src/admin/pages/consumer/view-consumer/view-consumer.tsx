import React from "react";
import { ConsumerInterface } from "../../../interface/consumer";
import { CloseIcon } from "../../../../assets/icons/normal-svg";

interface ViewConsumerProps {
  currentConsumer: ConsumerInterface;
  closeSidebar: () => void;
}

function ViewConsumer(props: ViewConsumerProps) {
  const { currentConsumer, closeSidebar } = props;
  return (
    <div className="view-consumer-wrap">
      <div className="view-consumer-header">
        <div className="title">{currentConsumer.fullName}</div>
        <div className="close-icon" onClick={closeSidebar} role="button">
          <CloseIcon />
        </div>
      </div>
      <div className="view-consumer-content">
        <div className="field">
          <div className="label">Phone Number : </div>
          <div className="value">{currentConsumer.phoneNumber}</div>
        </div>
        <div className="field">
          <div className="label">GST Number : </div>
          <div className="value">{currentConsumer.gstNumber}</div>
        </div>
        <div className="field">
          <div className="label">Pan Number : </div>
          <div className="value">{currentConsumer.panNumber}</div>
        </div>
        <div className="field">
          <div className="label">Address : </div>
          <div className="value">{currentConsumer.address}</div>
        </div>
        <div className="field">
          <div className="label">Total Orders : </div>
          <div className="value">{currentConsumer?.totalOrder || "0"}</div>
        </div>
        <div className="field">
          <div className="label">total Amount : </div>
          <div className="value">{currentConsumer.totalOrder}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewConsumer;
