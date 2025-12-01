import React, { useState } from "react";
import Button from "../../../components/botton";
import InputBox from "../../../components/input-box";
import { useAppDispatch } from "../../../../redux/hooks";
import { createConsumer } from "../../../../redux/slice/consumerSlice";
import { FormConsumerInterface } from "../../../interface/consumer";
import { setNotification } from "../../../../redux/slice/notificationSlice";

interface AddConsumerModalInterface {
  closeModal: () => void;
}

function AddConsumerModal(props: AddConsumerModalInterface) {
  const { closeModal } = props;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormConsumerInterface>({
    fullName: "",
    phoneNumber: "",
    gstNumber: "",
    panNumber: "",
    address: "",
    totalOrder: 0,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(createConsumer(formData));
    dispatch(setNotification({ notificationStatus: true, message: 'Consumer added', type: 'success' }));
    closeModal();
  };

  return (
    <div className="add-consumer-wrap">
      <div className="add-consumer-form">
        <div className="form-field">
          <InputBox
            label="Full Name"
            name="fullName"
            id="fullName"
            placeholder="Enter full name"
            onChange={handleChange}
            required
            type="text"
            value={formData.fullName}
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
            label="GST Number"
            name="gstNumber"
            id="gstNumber"
            placeholder="Enter GST number"
            onChange={handleChange}
            required
            type="text"
            value={formData.gstNumber}
          />
        </div>
        <div className="form-field">
          <InputBox
            label="PAN Number"
            name="panNumber"
            id="panNumber"
            placeholder="Enter PAN number"
            onChange={handleChange}
            required
            type="text"
            value={formData.panNumber}
          />
        </div>
        <div className="form-field address-field">
          <InputBox
            label="Address"
            name="address"
            id="address"
            placeholder="Enter address"
            onChange={handleChange}
            required
            type="textarea"
            value={formData.address}
          />
        </div>
      </div>
      <div className="add-consumer-footer">
        <div className="footer-buttons">
          <Button label="Cancel" type="default" onClick={closeModal} />
          <Button label="Add Consumer" type="primary" disabled={true} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default AddConsumerModal;
