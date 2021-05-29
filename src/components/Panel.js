function Panel() {
    return (
      <div className="container">
        <button className="btn btn-success float-end">+ Add Coupon</button>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" width="5%">#</th>
              <th scope="col" width="60%">Code</th>
              <th scope="col" width="15%">Amount</th>
              <th scope="col" width="20%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>S123GB12</td>
              <td>1/1</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>AG2614VV</td>
              <td>0/1</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>11KP94VV</td>
              <td>1/1</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Panel;
  