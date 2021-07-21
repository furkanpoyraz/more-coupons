import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useForm } from "react-hook-form";

function NewCoupon() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const addCoupon = (data) => {
    fetch(`http://localhost:3001/coupons`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.ok) {
          setSuccess(true);
          reset();
        } else {
          setSuccess(false);
        }
      });
  }

  const onSubmit = (data) => {
    addCoupon(data);
  };

  const randomCode = () => {
    let code = Math.random().toString(36).substr(2, 8).toUpperCase();
    setValue('code', code, { shouldValidate: true });
  }

  return (
    <>
      <Button variant="primary" className="float-end mb-4" onClick={handleShow}>+ Add Coupon</Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>New Coupon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { success && <Alert variant="success">Success!</Alert> }
              <Form.Group controlId="formCode">
                <Form.Label>Code</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <Form.Control type="text" isInvalid={errors.code} {...register("code", {required:true})} />
                  <Button variant="secondary" onClick={randomCode}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 105.71" className="d-block" width="18" height="18"><path fill="currentColor" d="M0 79.45c-.02-1.95.76-3.06 2.51-3.18h14.08c5.98 0 8.89.16 13.98-3.91 1.08-.86 2.1-1.86 3.06-3 4.55-5.41 6.17-11.96 7.87-18.9C44.79 37 50.03 22.78 63.98 17.15c7.94-3.2 18.82-2.59 27.41-2.59h5.27l.01-10.05c0-5.01 1.18-5.88 4.79-2.45l19.55 18.58c2.36 2.24 2.03 3.7-.22 5.86L101.49 45c-3.37 3.41-4.89 2.45-4.82-2.26v-11.8c-34-.52-32.57 1.67-42.05 34.09-3.5 10.04-8.81 17.08-15.59 21.69-7.09 4.82-13.68 6.39-22.02 6.39H6.65C.71 93.11 0 92.83 0 86.75v-7.3zm.23-53.19c-.02 1.95.76 3.06 2.51 3.18h14.7c5.98 0 8.89-.16 13.98 3.91 1.08.86 2.1 1.86 3.06 3 1.16 1.38 2.13 2.84 2.96 4.35 1.5-4.69 3.36-9.29 5.82-13.5.7-1.19 1.44-2.35 2.23-3.48-1.74-1.8-3.61-3.37-5.61-4.73-7.09-4.82-13.68-6.39-22.02-6.39H6.88c-5.94 0-6.65.28-6.65 6.36v7.3zm53.34 54.19c2.96 3.42 6.63 6.24 11.27 8.11 7.94 3.2 18.21 2.59 26.8 2.59h5.27l.01 10.05c0 5.01 1.18 5.88 4.79 2.45l19.55-18.58c2.36-2.24 2.03-3.7-.22-5.86l-19.3-18.5c-3.37-3.41-4.89-2.45-4.82 2.26v11.8c-24.78.38-30.42-.69-35.32-13.84-.27.94-.64 2.23-1.93 6.65-.03.1-.06.19-.09.28-1.67 4.76-3.68 8.93-6.01 12.59z" fillRule="evenodd" clipRule="evenodd"/></svg>
                  </Button>
                  {errors.code && <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>}
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formCode">
                <Form.Label>Expire Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control type="date" {...register("expireDate")} />
                </InputGroup>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>Close</Button>
            <Button variant="primary" type="submit">Add Coupon</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default NewCoupon;
