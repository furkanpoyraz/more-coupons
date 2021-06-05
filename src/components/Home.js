import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Home() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-4 offset-sm-4 text-center">
                <Form.Group controlId="formCode">
                    <Form.Label>Coupon</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" name="code" className="text-uppercase" />
                        <InputGroup.Append>
                            <Button variant="secondary">
                                <svg className="d-block" width="18" height="18" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path></svg>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <Button variant="primary">Check Coupon</Button>
                </Form.Group>
            </div>
        </div>
    </div>
  );
}

export default Home;
