import './App.css';

import React from "react";
import { Container, Row, Col, Nav, Form, Button, InputGroup } from "react-bootstrap";
import NavigationBar from './pages/NavigationBar';
import BasicInfo from './pages/BasicInfo';
import OwnedHouseInfo from './pages/OwnedHouseInfo';

export default function App() {
  return (
    <Container fluid className="p-0">
      {/* 네비게이션 바 */}
      <NavigationBar/>

      {/* 본문 */}
      <Container className="pt-5 mb-5 ps-5 pe-5" style={{backgroundColor: '#f6f6f8'}}>
        <Row>
          {/* 입력 영역 */}
          <Col md={8}>
            <h2 className="mb-4"><strong>양도소득세 시뮬레이션</strong></h2>

            {/* 1. 기초정보 */}
            <BasicInfo/>
            

            {/* 2. 보유주택 기본정보 */}
            <hr />
            <OwnedHouseInfo/>

            <hr />
            
            <Button variant="primary" className="w-100">계산결과 확인하기</Button>
          </Col>

          {/* 정보 입력 가이드 */}
          <Col md={4}>
            <div className="border rounded bg-white p-4">
              <h5 className="mb-3"><strong>정보 입력 가이드</strong></h5>
              <div>
                <p className="mb-1"><strong>1. 기초정보</strong></p>
                <small>세대의 총 보유주택 수를 입력해 주세요.<br />1세대 4주택 이상의 경우, 별도상담 일정 필요.</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

