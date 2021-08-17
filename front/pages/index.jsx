import React from "react";
import AppLayout from "../components/AppLayouts";
import FeedForm from "../components/FeedForm";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

const Home = () => {
  const { me } = useSelector((state) => state.user);

  return <AppLayout>{me ? <FeedForm /> : <LoginForm />}</AppLayout>;
};

export default Home;
