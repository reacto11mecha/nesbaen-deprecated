import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

import { UserContext } from "../../Context/User";
import styles from "./Styles/LoginComponent.module.css";

const ErrorDanger = ({ message }) => (
  <small className="text-danger">{message}</small>
);

export default function LoginComponent() {
  const [, { submitLogin }] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Container>
      <Row className={`justify-content-center ${styles.verticalCenter}`}>
        <Col lg={8} md={12}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(submitLogin)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: true,
                    })}
                    readOnly={isSubmitting}
                  />
                  {errors.email?.type === "required" && (
                    <ErrorDanger message="Email is required" />
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Masukan kata sandi</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    readOnly={isSubmitting}
                  />
                  {errors.password?.type === "required" && (
                    <ErrorDanger message="Password is required" />
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-5"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
