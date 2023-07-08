import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <div className="Footer">
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >


        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  ElWiz
                </h6>
                <p>
                  The one stop solution to manage students and electives and the mappings between them. Perfect for administrators of academic settings like schools and colleges.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p className="text-reset">
                  Student Management
                </p>
                <p className="text-reset">
                  Elective Management
                </p>
                <p className="text-reset">
                  Enrollment of Students in Electives
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/login" className="text-reset">
                    Log In
                  </a>
                </p>
                <p>
                  <a href="/signup" className="text-reset">
                    Sign Up
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  IIIT Bangalore, Bengaluru, KA
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  quackquackquad@gmail.com
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright &nbsp; &nbsp;
          <a className="text-reset fw-bold" href="https://ElWiz.com/">
            ElWiz.com
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
