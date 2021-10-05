import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayouts";
import { Button, Form, Input, message } from "antd";
import useInput from "../components/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../reducers/user";
import { useRouter } from "next/router";

const JoinUs = () => {
  const joinForm = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const { st_signUpDone, st_signUpError } = useSelector((state) => state.user);

  const [passwordCheck, setPasswordCheck] = useState(null);

  const email = useInput(``);
  const password = useInput(``);
  const nickname = useInput(``);
  const birth = useInput(``);

  const passwordCheckChange = useCallback(
    (e) => {
      if (e.target.value === password.value) {
        setPasswordCheck(true);
      } else {
        setPasswordCheck(false);
      }
    },
    [password.value]
  );

  const finish = useCallback(() => {
    if (!passwordCheck) {
      return message.error("비밀번호가 일치하지 않습니다.");
    }

    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
        birth: birth.value,
      },
    });
  }, [email.value, password.value, nickname.value, birth.value]);

  useEffect(() => {
    if (st_signUpDone) {
      message.success("회원가입이 완료되었습니다.");
      router.push("/");
    }
  }, [st_signUpDone]);

  useEffect(() => {
    if (st_signUpError) {
      message.error(st_signUpError);
    }
  }, [st_signUpError]);

  return (
    <AppLayout>
      <Form
        from={joinForm}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={finish}
      >
        <Form.Item label="Email" name="email" ruls={[{ required: true }]}>
          <Input type="email" {...email} />
        </Form.Item>

        <Form.Item label="Password" name="password" ruls={[{ required: true }]}>
          <Input type="password" {...password} />
        </Form.Item>

        <Form.Item
          label="Password2"
          name="password2"
          ruls={[{ required: true }]}
        >
          <Input type="password" onChange={passwordCheckChange} />
          {passwordCheck === null
            ? null
            : passwordCheck
            ? `비밀번호가 일치합니다.`
            : `비밀번호가 일치하지 않습니다.`}
        </Form.Item>

        <Form.Item label="Nickname" name="nickname" ruls={[{ required: true }]}>
          <Input {...nickname} />
        </Form.Item>

        <Form.Item label="Birth" name="birth" ruls={[{ required: true }]}>
          <Input placeholder="YYYY/MM/DD" {...birth} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          JOIN
        </Button>
      </Form>
    </AppLayout>
  );
};

export default JoinUs;
