import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
import reduxWrapper from "../store/configureStore";

const Leaf = ({ Component }) => {
  return (
    <div className>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>LEAF | SS</title>
      </Head>
      <Component />
    </div>
  );
};

Leaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default reduxWrapper.withRedux(Leaf);

//pages안에 공통으로 가진 코드
