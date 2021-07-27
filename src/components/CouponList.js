import React, {useState, useEffect, useCallback} from 'react';
import CouponRow from './CouponRow';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [couponsLoaded, setCouponsLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fetchCoupons = () => {
    fetch(`http://localhost:3001/coupons/`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setCoupons(data);
        setCouponsLoaded(true);
      });
  }

  const deleteCoupon = useCallback((coupon) => {
    return () => {
      fetch(`http://localhost:3001/coupons/${coupon._id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
          const newCouponList = coupons.filter((item) => item._id !== coupon._id);
          setCoupons(newCouponList);
          setShowToast(true);
        });
    }
  }, [coupons]);

  useEffect(() => {
    fetchCoupons();
  }, [])

  return (
    <>
    <table className="table table-hover table-coupons">
      <thead>
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Code</th>
          <th scope="col" width="200">Expire Date</th>
          <th scope="col" width="150">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          coupons && coupons.map((coupon, index) => {
            return(
              <CouponRow key={index} index={index} coupon={coupon} deleteCoupon={deleteCoupon} />
            )
          })
        }
      </tbody>
    </table>
    { !couponsLoaded &&
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    }
    <ToastContainer className="p-3" position="bottom-end">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">more-coupons</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>Coupon deleted successfully.</Toast.Body>
      </Toast>
    </ToastContainer>
    </>
  );
}

export default CouponList;
