import React, {useState, useEffect} from 'react';
import NewCoupon from './NewCoupon';

import Button from 'react-bootstrap/Button';

function CouponList() {
    const [coupons, setCoupons] = useState([])
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const fetchCoupons = () => {
        fetch(`http://localhost:3001/coupons`)
            .then(res => res.json())
            .then(json => setCoupons(json));
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div>
            <Button variant="primary" className="float-right mb-4" onClick={handleShow}>+ Add Coupon</Button>
            <NewCoupon show={show} handleClose={handleClose} />
            <table className="table table-hover table-coupons">
            <thead>
                <tr>
                    <th scope="col" width="5%">#</th>
                    <th scope="col" width="60%">Code</th>
                    <th scope="col" width="15%">Used</th>
                    <th scope="col" width="20%">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    coupons && coupons.map((coupon, index) => {
                    return(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{coupon.code}</td>
                            <td>{coupon.used ? 'true' : 'false'}</td>
                            <td>
                                <Button variant="secondary mr-1" size="sm">Edit</Button>
                                <Button variant="danger" size="sm">Remove</Button>
                            </td>
                        </tr>
                    )

                    })
                }
            </tbody>
            </table>
        </div>
    );
}

export default CouponList;
