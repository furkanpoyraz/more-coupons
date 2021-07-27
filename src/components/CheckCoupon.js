import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

function CheckCoupon() {
  const [success, setSuccess] = useState(false);
  const [couponData, setCouponData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const checkCoupon = (data) => {
    fetch(`http://localhost:3001/coupons/${data.code}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setCouponData(data);
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  }

  const onSubmit = (data) => {
    checkCoupon(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 offset-sm-4">
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formCode">
              <Form.Label>Coupon</Form.Label>
              <InputGroup className="mb-3" hasValidation>
                <Form.Control type="text" isInvalid={errors.code} className="text-uppercase" {...register("code", {required:true})} />
                <Button variant="secondary">
                    <svg className="d-block" width="18" height="18" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path></svg>
                  </Button>
                {errors.code && <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="primary">Check Coupon</Button>
          </Form>
        </div>
      </div>
      <div className="row">
        {success &&
        <table className="table table-hover table-coupons">
          <thead>
            <tr>
              <th scope="col" width="60">#</th>
              <th scope="col">Code</th>
              <th scope="col" width="200">Expire Date</th>
            </tr>
          </thead>
          <tbody>
          { success &&
            couponData.map((coupon, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{coupon.code}</td>
                  <td>{coupon.expireDate ? coupon.expireDate : 'No Expire Date'}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        }
      </div>
    </div>
  );
}

export default CheckCoupon;
