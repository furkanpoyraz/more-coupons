import CouponList from '../components/CouponList';
import NewCoupon from '../components/NewCoupon';

function Panel() {
  return (
    <div className="container">
      <NewCoupon />
      <CouponList />
    </div>
  );
}

export default Panel;
