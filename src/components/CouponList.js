import React, {useState, useEffect} from 'react'; 

function CouponList() {
    const [coupons, setCoupons] = useState([])

    const fetchCoupons = () => {
        fetch(`http://localhost:3001/coupons`)
            .then(res => res.json())
            .then(json => setCoupons(json));
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="container">
            <button className="btn btn-success float-end">+ Add Coupon</button>
            <table className="table table-hover">
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
                            <td></td>
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
