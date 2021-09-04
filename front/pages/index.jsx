import React, { useEffect } from "react";
import AppLayout from "../components/AppLayouts";
import FeedForm from "../components/FeedForm";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

const Home = () => {
  const { me } = useSelector((state) => state.user);

  return <AppLayout>{me ? <FeedForm /> : <LoginForm />}</AppLayout>;
};

// ssr 작업

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

///

export default Home;
