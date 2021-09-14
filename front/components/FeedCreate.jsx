import React, { useRef, useCallback, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FEED_CREATE_REQUEST,
  FEED_IMAGE_UPLOAD_REQUEST,
  FEED_PREVIEW_IMAGE_RESET,
} from "../reducers/feed";

const FeedCreate = () => {
  const fileRef = useRef();
  const formFef = useRef();
  const dispatch = useDispatch();

  const { st_feedImageUploadLoading, previewImage, st_feedCreateDone } =
    useSelector((state) => state.feed);

  useEffect(() => {
    if (st_feedCreateDone) {
      message.success("새로운 피드가 등록되었습니다.");
      formFef.current.resetFields();

      dispatch({
        type: FEED_PREVIEW_IMAGE_RESET,
      });
    }
  }, [st_feedCreateDone]);

  const imageButtonClick = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  const imageFileChange = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: FEED_IMAGE_UPLOAD_REQUEST,
      data: formData,
    });
  });

  const layout = {
    labelCol: { xs: 24, sm: 8 },
    wrapperCol: { xs: 24, sm: 10 },
  };

  const onSubmit = useCallback((values) => {
    const sendData = {
      content: values.content,
      filePath: previewImage,
    };

    dispatch({
      type: FEED_CREATE_REQUEST,
      data: sendData,
    });
  });

  return (
    <>
      {previewImage && (
        <img
          width={250}
          height={250}
          src={`http://localhost:4000/${previewImage}`}
          alt="preview"
        />
      )}

      <input type="file" hidden ref={fileRef} onChange={imageFileChange} />

      <br />

      <Button
        type="primary"
        onClick={imageButtonClick}
        loading={st_feedImageUploadLoading}
      >
        IMAGE
      </Button>

      <Form {...layout} name="feedForm" onFinish={onSubmit} ref={formFef}>
        <Form.Item
          label="CONTENT"
          name="content"
          rules={[{ required: true, message: "You Must write this content!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17, span: 1 }}>
          <Button type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FeedCreate;
