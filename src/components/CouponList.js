import React, {useState, useEffect, useCallback} from 'react';
import CouponRow from './CouponRow';
import Spinner from 'react-bootstrap/Spinner';

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [couponsLoaded, setCouponsLoaded] = useState(false);

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
          alert('Coupon deleted');
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
          <th scope="col" width="150">Action</th>
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
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    }
    </>
  );
}

export default CouponList;
