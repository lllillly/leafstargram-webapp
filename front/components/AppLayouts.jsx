import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AppHeader from "./AppHeader";
import { Row, Col } from "antd";

const MainCol = styled(Col)`
  padding: 20px;
  text-align: center;
`;

const AppLayout = ({ children }) => {
  return (
    <div>
      <header>
        <AppHeader />
      </header>
      <main>
        <Row>
          <Col span={3}></Col>
          <MainCol span={18}></MainCol>
          <Col span={3}></Col>
        </Row>
        {children}
      </main>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
