import React, { useCallback, useEffect } from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import styled from "styled-components";
import useInput from "./hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOG_IN_REQUEST } from "../reducers/user";

const LoginRow = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

const LoginWrapper = styled(Col)`
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  border: 1px solid #ebebeb;
`;

const LoginImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;

  &:hover {
    opacity: 0.6;
  }
`;

const LoginForm = () => {
  const { st_loginLoading, st_loginError } = useSelector((state) => state.user);

  const email = useInput(``);
  const password = useInput(``);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_loginError) {
      message.error(st_loginError);
    }
  }, [st_loginError]);

  const onLoginSubmit = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email: email.value,
        password: password.value,
      },
    });
  }, [email, password]);

  return (
    <LoginRow>
      <LoginWrapper span={7}>
        <LoginImage
          src="https://picsum.photos/500/500"
          alt="LoginPage_Normal_Image"
        />
      </LoginWrapper>
      <LoginWrapper span={7}>
        <Form
          onFinish={onLoginSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input {...email} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password {...password} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={st_loginLoading}>
            LOG IN
          </Button>
        </Form>
      </LoginWrapper>
    </LoginRow>
  );
};

export default LoginForm;
