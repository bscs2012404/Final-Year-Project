import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

import { Row, Col, Form, Input, Button, Checkbox, message, Spin } from "antd";

import LeftContent from "../leftContent";
import Footer from "../footer";
import { loginUser, registerUser } from "../../../../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

const bgColor = '#1eaae3';
const password = 'Abc123456@'

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state);
  const [form] = Form.useForm();
  const history = useHistory();

  const loading = useSelector((state) => state.auth.loading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    if (isLoggedIn) {
      history.push('/')
    }
  }, [isLoggedIn])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const login = async () => {
    await dispatch(loginUser({ email, password }));
  };

  async function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    jsonPayload = JSON.parse(jsonPayload)
    const response  = await dispatch(registerUser({ firstName: jsonPayload.given_name, lastName: jsonPayload.family_name, email: jsonPayload.email, password: 'Abc123456@'}, true));
    await dispatch(loginUser({ email:jsonPayload.email, password: 'Abc123456@' }));
  }
  return (
    <Row gutter={[32, 0]} className="hp-authentication-page">
      <Col lg={12} span={24} className="hp-py-sm-0 hp-py-md-64">
        <Row className="hp-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="hp-px-sm-8 hp-pt-24 hp-pb-48"
          >
            <h1 style={{ color: bgColor }} className="hp-mb-sm-0">Login</h1>
            <p className="hp-mt-sm-0 hp-mt-8 hp-text-color-black-60">
              <FormattedMessage id="login-welcome-back" />
            </p>

            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              className="hp-mt-sm-16 hp-mt-32"
              onFinish={login}
              form={form}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email :"
                className="hp-mb-16"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password :"
                className="hp-mb-8"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                  {
                    type: "string",
                    min: 8,
                  },
                  {
                    validator: (_, value) =>
                      /^(?=.*[A-Z])(?=.*\d).+$/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(
                          new Error(
                            "Password must contain at least one uppercase letter and one number."
                          )
                        ),
                  },
                ]}
              >
                <Input.Password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Row align="middle" justify="space-between">
                <Form.Item className="hp-mb-0">
                  <Checkbox name="remember"><FormattedMessage id="remember-me" /></Checkbox>
                </Form.Item>
                {/* 
                <Link
                  className="hp-button hp-text-color-black-80 hp-text-color-dark-40"
                  to="/pages/authentication/recover-password"
                >
                  <FormattedMessage id="forgot-password" />
                </Link> */}
              </Row>

              <Form.Item className="hp-mt-16 hp-mb-8">
                <Button style={{ backgroundColor: bgColor, border: 0 }} loading={loading} block type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  decodeJwtResponse(credentialResponse.credential)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Box>

            <Col className="hp-form-info hp-text-center">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                <FormattedMessage id="login-have-account" />
              </span>
              <Link
                className="hp-text-color-primary-3 hp-text-color-dark-primary-2 hp-caption"
                to="/pages/authentication/register"

              >
                <FormattedMessage id="create-an-account" />

              </Link>
            </Col>

          </Col>
        </Row>
      </Col>
      <LeftContent />
    </Row>
  );
}
