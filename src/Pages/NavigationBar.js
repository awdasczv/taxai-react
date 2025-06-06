import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import logo from '../image/taxai-logo.svg';
import './NavigationBar.css';

/**
 * 네비게이션 바 컴포넌트
 * 사이트 상단에 위치하며 로고, 메뉴, Contact Us 버튼을 포함합니다.
 */
function NavigationBar() {
  // 네비게이션 메뉴 항목들
  const navMenu = [
    '양도소득세 환급예상액 조회', 
    '세금 계산 & 시뮬레이션', 
    'TAX AI 소개', 
    'TAX AI 정보센터', 
    '연산 API', 
    '마이페이지',
  ];

  return (
    <div className="bg-white border-bottom">
      <Container>
        <Row className="align-items-center py-3">
          
          {/* 로고 영역 */}
          <Col xs="auto">
            <img src={logo} height="30" alt="TAXAI 로고" />
          </Col>

          {/* 메인 네비게이션 영역 */}
          <Col className="d-flex align-items-center">
            {/* 네비게이션 메뉴 (데스크탑에서만 표시) */}
            <Nav className="d-none d-xl-flex">
              {navMenu.map((item, index) => (
                <Nav.Link
                  key={index}
                  href="#"
                  className="nav-menu-item"
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>

            {/* 공간 확장을 위한 spacer */}
            <div className="flex-grow-1" />

            {/* Contact Us 버튼 */}
            <Button variant="outline-primary">CONTACT US</Button>
          </Col>

        </Row>
      </Container>
    </div>        
  );
}

export default NavigationBar;