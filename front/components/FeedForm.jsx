import React, { useState, useRef, useCallback, useEffect } from "react";
import { Card, Avatar, Button } from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FEED_IMAGE_UPLOAD_REQUEST, FEED_LIST_REQUEST } from "../reducers/feed";

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
  const dispatch = useDispatch();

  const { mainFeeds, st_feedCreateDone } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch({
      type: FEED_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_feedCreateDone) {
      dispatch({
        type: FEED_LIST_REQUEST,
      });
    }
  }, [st_feedCreateDone]);

  return (
    <>
      {mainFeeds.map((data) => {
        return (
          <FeedWrapper>
            <Feed
              cover={
                <FeedImage
                  src={`http://localhost:4000/${data.imagePath}`}
                  alt="FEED_IMAGE"
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
                avatar={<Avatar>{data.User.nickname.substring(0, 1)}</Avatar>}
                title={data.title}
                description={data.content}
              />
            </Feed>
          </FeedWrapper>
        );
      })}
    </>
  );
};

export default FeedForm;
