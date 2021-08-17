import React from "react";

import { Card, Avatar } from "antd";
import {
  HeartOutlined,
  EllipsisOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

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
  return (
    <FeedWrapper>
      <Feed
        cover={
          <FeedImage
            src="https://img.insight.co.kr/static/2021/06/10/700/img_20210610080035_f201a223.webp"
            alt=""
          />
        }
        actions={[
          <HeartOutlined key="heart" />,
          <EllipsisOutlined key="ellips" />,
          <CommentOutlined key="comment" />,
        ]}
        extra={<CommentOutlined></CommentOutlined>}
      >
        <Feed.Meta
          avatar={<Avatar>O</Avatar>}
          title="나는 에스파"
          description="에스파 짱짱짱"
        />
      </Feed>
    </FeedWrapper>
  );
};

export default FeedForm;
