import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../../components/AppLayouts";
import { Skeleton, Switch, Card, Avatar, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";

const { Meta } = Card;

const CardCustom = styled(Card)`
  width: 100%;
`;

const RowCustom = styled(Row)`
  margin-top: 70px;
`;

const FeedImg = styled.img`
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
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    box-shadow: 0px 0px 7px #919191;
  }
`;

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const { me } = useSelector((state) => state.user);

  const loadingCompleted = useCallback(() => {
    setLoading((prevState) => !prevState);
  }, [loading]);

  return (
    <AppLayout>
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
            title={me.nickname}
            description="Status Message"
          />
        </Skeleton>
      </CardCustom>

      <Wrapper>
        <FollowBox> Follower 42 </FollowBox>
        <FollowBox> Following 13</FollowBox>
      </Wrapper>

      <RowCustom gutter={[15, 15]}>
        {me &&
          me.Feeds.map((data) => {
            return (
              <Col span={8}>
                <FeedImg
                  src={`http://localhost:4000/${data.imagePath}`}
                  alt="feed"
                />
              </Col>
            );
          })}
      </RowCustom>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
