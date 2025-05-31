import { Container, Row, Col, Nav, Form, Button, InputGroup } from 'react-bootstrap';
import logo from '../image/taxai-logo.svg';
import './NavigationBar.css'; // CSS 파일 추가


/* 네비게이션 바 */
// 현재이슈 해결됨 : 네비게이션 메뉴들 위에 마우스를 올렸을 때 색이 바뀌지 않음
function NavigationBar() {
  const navMenu = ['양도소득세 환급예상액 조회', '세금 계산 & 시뮬레이션', 'TAX AI 소개', 'TAX AI 정보센터', '연산 API', '마이페이지'];

  return (
    <div className="bg-white border-bottom">
      <Container >
        <Row className="align-items-center py-3">

          {/* 로고부분입니다 */}
          <Col xs="auto">
            <img src={logo} height="30" />
          </Col>

          {/* 네비게이션 메뉴들 입니다. */}
          <Col className="d-flex align-items-center">
            <Nav className="d-none d-xl-flex">
              {navMenu.map((item, i) => (
                <Nav.Link
                  key={i}
                  href="#"
                  className="nav-menu-item">
                  {item}
                </Nav.Link>
              ))}
            </Nav>

            {/* spacer 입니다.*/}
            <div className="flex-grow-1" />

            {/* 우측 Contact us 버튼부분입니다. */}
            <Col xs="auto">
            <Button variant="outline-primary">CONTACT US</Button>
          </Col>
          </Col>

        </Row>
      </Container>
    </div>        
  );
}

export default NavigationBar;