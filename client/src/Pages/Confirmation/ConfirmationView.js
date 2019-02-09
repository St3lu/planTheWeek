import React from "react";
import { Form, Icon, Input, Button, Alert } from "antd";
import { withFormik } from "formik";

const ConfirmationView = ({ values, handleSubmit, handleChange, error }) => {
  return (
    <div
      style={{
        width: "400px",
        marginTop: "40px",
        textAlign: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      <h1>Confirm your email</h1>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            size="large"
            value={values.email}
            prefix={<Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>

        {error ? (
          <Alert
            message="There is a problem with your submit"
            description={error}
            type="error"
          />
        ) : null}

        <Form.Item>
          <Button
            style={{
              marginTop: "10px"
            }}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Confirm Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues({ email }) {
    return {
      email: ""
    };
  },
  handleSubmit(values, { props }) {
    console.log(props);
    props.getValues(values);
  }
})(ConfirmationView);
