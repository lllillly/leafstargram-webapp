import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../../components/AppLayouts";
import { Skeleton, Switch, Card, Avatar, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Meta } = Card;

const CardCustom = styled(Card)`
  width: 100%;
`;

const RowCustom = styled(Row)`
  margin-top: 70px;
`;

const FeedImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: 0.5s;

  &:hover {
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  margin: 15px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FollowBox = styled.div`
  width: 200px;
  margin: 0 15px;
  color: #4e4e4e;
  padding: 3px 10px;
  border: 1px solid #eaeaea;
  border-radius: 5px;

  transition: 0.5s;

  &:hover {
    box-shadow: 0px 0px 7px #919191;
  }
`;

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const loadingCompleted = useCallback(() => {
    setLoading((prevState) => !prevState);
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      loadingCompleted();
    }, 1000);
  }, []);

  return (
    <AppLayout>
      {/* <Switch checked={!loading} onChange={loadingCompleted}></Switch> */}

      <CardCustom
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </CardCustom>
      <Wrapper>
        <FollowBox>Follower 42</FollowBox>
        <FollowBox>Following 13</FollowBox>
      </Wrapper>
      <RowCustom gutter={[15, 15]}>
        <Col span={8}>
          <FeedImage src="https://picsum.photos/300/301" alt="feed" />
        </Col>
        <Col span={8}>
          <FeedImage src="https://picsum.photos/301/300" alt="feed" />
        </Col>
        <Col span={8}>
          <FeedImage src="https://picsum.photos/300/302" alt="feed" />
        </Col>

        <Col span={8}>
          <FeedImage src="https://picsum.photos/302/300" alt="feed" />
        </Col>
        <Col span={8}>
          <FeedImage src="https://picsum.photos/303/300" alt="feed" />
        </Col>
        <Col span={8}>
          <FeedImage src="https://picsum.photos/300/303" alt="feed" />
        </Col>
      </RowCustom>
    </AppLayout>
  );
};

export default Profile;
