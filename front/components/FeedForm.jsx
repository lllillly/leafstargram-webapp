import React, { useState, useRef, useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FEED_IMAGE_UPLOAD_REQUEST } from "../reducers/feed";

const FeedWrapper = styled.div`
  width: 100%;
  padding: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Feed = styled(Card)`
  width: 600px;
  margin-bottom: 50px;
`;
const FeedMeta = styled(Feed.Meta)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const FeedImage = styled.img`
  width: 600px;
  height: 700px;
  object-fit: cover;
  transition: 0.5s;
  &:hover {
    opacity: 0.7;
  }
`;

const FeedForm = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();

  const { st_feedImageUploadLoading, previewImage } = useSelector(
    (state) => state.feed
  );

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

  return (
    <FeedWrapper>
      <Feed
        cover={
          <FeedImage
            src="http://file.osen.co.kr/article/2021/05/25/202105251919779242_60accf8e7b605.jpg"
            alt="에스파_카리나"
          />
        }
        actions={[
          <HeartOutlined key="heart" />,
          <CommentOutlined key="ellips" />,
          <EllipsisOutlined key="setting" />,
        ]}
        extra={<EllipsisOutlined />}
      >
        <FeedMeta
          avatar={<Avatar>Y</Avatar>}
          title="에스파 카리나..."
          description="에스파 카리나가 요즘 대세죠?"
        />
      </Feed>
      {previewImage && (
        <img src={`http://localhost:4000/${previewImage}`} alt="preview" />
      )}

      <input type="file" hidden ref={fileRef} onChange={imageFileChange} />
      <Button
        type="primary"
        onClick={imageButtonClick}
        loading={st_feedImageUploadLoading}
      >
        IMAGE
      </Button>
    </FeedWrapper>
  );
};
export default FeedForm;
