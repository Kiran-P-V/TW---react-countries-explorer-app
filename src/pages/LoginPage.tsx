import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "../store/authSlice";
import LoginPageIllustration from "../assets/LoginPageIllustration.png";
import SocialAuthRow from "../components/common/SocialAuthRow";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const validationSchema = Yup.object({
  username: Yup.string().trim().required("Username or email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      passwordRegex,
      "Password must be at least 8 characters and include 1 capital letter, 1 number, and 1 symbol.",
    ),
  rememberMe: Yup.boolean(),
});

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <Container className="px-0">
        <div className="mx-auto" style={{ maxWidth: 960 }}>
          <Row className="g-0 justify-content-center">
            <Col
              md={7}
              className="p-4 p-md-5 d-flex justify-content-center text-md-start text-center"
            >
              <div className="w-100" style={{ maxWidth: 360 }}>
                <h2 className="h4 fw-bold mb-2">Sign In</h2>
                <p className="mb-3 small text-muted">
                  <span className="me-1 text-body">New user?</span>
                  <a
                    href="#"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Create an account
                  </a>
                </p>

                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    rememberMe: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    dispatch(signIn({ username: values.username }));
                    navigate("/");
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit} noValidate className="mb-4">
                      <Form.Group className="mb-3" controlId="loginUsername">
                        <Form.Control
                          placeholder="Username or email"
                          name="username"
                          type="text"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.username && Boolean(errors.username)
                          }
                          className="rounded-0 border-2 border-black"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Control
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.password && Boolean(errors.password)
                          }
                          className="rounded-0 border-2 border-black"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="mb-3 d-flex align-items-center justify-content-start"
                        controlId="loginRemember"
                      >
                        <Form.Check
                          type="checkbox"
                          name="rememberMe"
                          checked={values.rememberMe}
                          onChange={(e) =>
                            setFieldValue("rememberMe", e.target.checked)
                          }
                          className="me-2"
                        />
                        <Form.Label className="mb-0 small text-body">
                          Keep me signed in
                        </Form.Label>
                      </Form.Group>

                      <Button
                        variant="dark"
                        type="submit"
                        className="w-100 rounded-0"
                      >
                        Sign In
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="d-flex align-items-center my-4">
                  <div className="flex-grow-1 border-top" />
                  <span className="px-3 small text-muted fw-bold">
                    Or Sign In With
                  </span>
                  <div className="flex-grow-1 border-top" />
                </div>

                <SocialAuthRow />
              </div>
            </Col>

            <Col
              md={5}
              className="d-none d-md-flex align-items-center justify-content-center bg-light"
            >
              <img
                src={LoginPageIllustration}
                alt="Login illustration"
                className="img-fluid p-4"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
