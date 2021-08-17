import React, { useMemo } from "react";
import { Row, Col, Input } from "antd";
import styled from "styled-components";

const HeadRow = styled(Row)`
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ececec;
  text-align: center;
  box-shadow: 3px 3px 10px #ececec;
`;

const TotalSearchInput = styled(Input.Search)`
  width: 360px;
  vertical-align: middle;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 25px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileRoundImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  border-bottom: 2px solid #e6e6e6;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    border-bottom: 2px solid #e6e6e6;
  }
`;

const AppHeader = () => {
  return (
    <HeadRow>
      <Col span={6}>logo</Col>
      <Col span={12}>
        <TotalSearchInput placeholder="검색어를 입력하세요" enterButton />
      </Col>
      <Col span={6}>
        <ProfileWrapper
          style={{ width: `50px`, height: "50px", backgroundColor: `#eee` }}
        >
          <ProfileRoundImage src="" alt="" />
        </ProfileWrapper>
      </Col>
    </HeadRow>
  );
};

export default AppHeader;
