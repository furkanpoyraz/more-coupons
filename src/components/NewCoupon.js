import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function NewCoupon({show, handleClose}) {
    const [success, setSuccess] = useState(false);
    const initialFormData = Object.freeze({
        code: "",
    });
    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
          ...formData,
    
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addCoupon();
    };

    const addCoupon = () => {
        fetch(`http://localhost:3001/coupons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(json => json.result.ok ? setSuccess(true) : setSuccess(false));
    }

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>New Coupon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { success ? <Alert variant="success">Success!</Alert> : null }
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCode">
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" name="code" onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Add Coupon</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewCoupon;