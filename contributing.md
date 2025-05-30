# ✨ React 프로젝트 코딩 컨벤션

본 문서는 본 프로젝트에서 사용하는 코드 스타일과 작성 규칙을 정의합니다. 

---
## 1. 📄 파일 및 컴포넌트 네이밍 규칙

모든 코드 요소의 이름은 아래 규칙을 따릅니다:

### ✅ 디렉터리 & 파일명

| 구분 | 규칙 | 예시 |
|------|------|------|
| 디렉터리명 |**소문자** | `pages/`, `components/` |
| 컴포넌트 파일 | **PascalCase** (컴포넌트명과 동일) | `NavigationBar.js`, `BasicInfo.js` |
| 일반 파일 | **camelCase** | `reportWebVitals.js`, `setupTests.js` |
| 이미지 파일 | **소문자 + 하이픈(-)** | `taxai-logo.svg` |
| CSS 파일 | 컴포넌트명 기준으로 `PascalCase.css` 또는 `kebab-case.module.css` | `NavigationBar.css`, `form-field.module.css` |

---

### ✅ 변수, 함수, 클래스, 컴포넌트 네이밍

| 요소 | 규칙 | 예시 |
|------|------|------|
| 변수 | **camelCase** | `ownedHouseCount`, `userAge` |
| 함수 | **camelCase**, 동사로 시작 | `handleSubmit()`, `getResult()` |
| React 컴포넌트 | **PascalCase** | `OwnedHouseInfo`, `FieldTitle` |
| 클래스명 (CSS) | **kebab-case** | `input-field`, `nav-bar-wrapper` |

---

### ✅ 기타 규칙

- **약어는 대문자로 시작하지 않음**: `userId`, `apiUrl` (❌ `UserID`, `APIURL`)
- 파일명은 **컴포넌트와 동일하게**: `FieldTitle.js` 파일 안에는 `FieldTitle` 컴포넌트

## 2. 🧠 코드 스타일

본 프로젝트의 JavaScript 및 React 코드는 아래 스타일 가이드를 따릅니다.

---

### ✅ 들여쓰기 (Indentation)

- **스페이스 2칸**

~~~
function calculateTax() {
  const rate = 0.22;
  return amount * rate;
}
~~~

---

### ✅ 세미콜론 (Semicolon)

- **항상 사용**
- 모든 문장의 끝에는 세미콜론(`;`)을 붙입니다.

~~~
const taxRate = 0.22;
~~~

---

### ✅ 따옴표 (Quotes)

- 문자열은 **홑따옴표(')** 사용
- JSX 속성은 **쌍따옴표(")** 사용

~~~
const name = 'TAXAI';
return <div className="main-title">환급 계산</div>;
~~~

---

### ✅ 중괄호 (Braces)

- 블록이 필요한 경우 항상 중괄호 사용
- 단일 if/else 문도 중괄호 필수

~~~
if (isEligible) {
  showResult();
}
~~~

---

### ✅ 화살표 함수 (Arrow Functions)

- 가능한 한 **화살표 함수** 사용

~~~
const handleClick = () => {
  console.log('클릭됨');
};
~~~

---

### ✅ 객체 및 배열 (Trailing Comma)

- 객체나 배열의 마지막 요소에도 쉼표(`,`)를 붙입니다.

~~~
const user = {
  name: 'Kim',
  age: 29,
};

const list = [
  'apple',
  'banana',
  'orange',
];
~~~


---

### ✅ 기타 스타일

- `const`를 기본으로 사용하며, 변경 가능한 값에는 `let` 사용
- `var`는 절대 사용하지 않음
- 연산자 사이에는 공백 삽입: `a + b`, `x === y`
- **불필요한 `console.log`는 커밋 전에 제거**
- 주석은 핵심 로직에만 간결하게 작성


---

## 3. 📚 JSX 작성 규칙

React 컴포넌트에서 JSX를 작성할 때는 다음 규칙을 따릅니다.

---

### ✅ 기본 문법

- JSX는 하나의 부모 요소로 감싸야 합니다.
- 괄호로 JSX를 감싸서 가독성을 높입니다.

~~~
return (
  <div>
    <h1>환급 계산</h1>
  </div>
);
~~~

---

### ✅ 속성 정렬 (Props Formatting)

- props가 2개 이하일 때는 한 줄로 작성 가능
- 3개 이상이면 줄바꿈하여 정렬

~~~
<FormInput id="name" value={name} />

<Button
  className="primary-button"
  onClick={handleClick}
  disabled={isLoading}
>
  제출
</Button>
~~~

---

### ✅ 불린 속성은 축약형으로 작성

- `true`는 생략 가능 (단, `false`는 명시해야 함)

~~~
<input type="checkbox" checked />
<input type="checkbox" disabled={false} />
~~~

---

### ✅ self-closing 태그

- 내용이 없는 태그는 반드시 self-closing 사용

~~~
<input />
<br />
<img src="logo.png" alt="logo" />
~~~

---

### ✅ 중괄호 사용

- JSX 안에서는 JavaScript 표현식을 중괄호로 감쌉니다.
- 불필요한 중괄호는 사용하지 않습니다.

~~~
<p>{userName}</p>        ✅ OK
<p>{'TAXAI'}</p>         ❌ 비권장 (단순 문자열엔 중괄호 생략)
~~~

---

### ✅ 조건부 렌더링

- 삼항 연산자 사용 권장
- 너무 복잡한 조건은 함수로 분리

~~~
{isLoggedIn ? <LogoutButton /> : <LoginButton />}
~~~

## 4. ✨ 스타일링 가이드 (CSS)

본 프로젝트에서는 **일반 CSS 파일**을 사용하며, 아래와 같은 스타일링 규칙을 따릅니다.

---

### ✅ CSS 파일 구성

- 각 컴포넌트에 대응되는 CSS 파일을 분리하여 작성
- 파일명은 컴포넌트명과 동일하게 `PascalCase.css`로 작성

예시:
~~~
components/
├── NavigationBar.js
└── NavigationBar.css
~~~

---

### ✅ 클래스 네이밍

- **kebab-case**를 사용
- 기능 + 역할 기반 네이밍 권장

예시:
~~~
.title-section
.input-wrapper
.nav-bar-container
~~~

---

### ✅ 작성 규칙

- 선택자 중첩 없이 간단하고 명확하게 작성
- 가능하면 **컴포넌트 단위 클래스만 정의**
- 전역 스타일은 최소화
- 중요도 상속(`!important`)은 지양

---

### ✅ 스타일 적용 방식

- 컴포넌트 내부에서 해당 CSS 파일을 import

~~~
import './NavigationBar.css';
~~~

- JSX 내에서는 `className` 속성으로 클래스 적용

~~~
<div className="title-section">양도소득세 계산</div>
~~~

---

### ✅ 색상 및 폰트

- 자주 사용하는 색상은 변수로 정의하여 관리 권장  
  (단, 현재는 일반 CSS 파일 사용 → 추후 SCSS 도입 시 확장 가능)

~~~
/* 예시 */
:root {
  --primary-color: #0d6efd;
  --text-color: #212529;
}
~~~

## 5. 🔎 ESLint / Prettier 설정 기준(TBD)

본 프로젝트에서는 코드 품질과 스타일을 자동으로 유지하기 위해 ESLint와 Prettier 도구를 사용할 예정입니다.

## 6. 💬 주석 작성 방식

코드에 주석을 작성할 때는 아래와 같은 스타일과 규칙을 따릅니다.

---

### ✅ 일반 주석

- **단일 줄 주석**: `//` 사용
- **여러 줄 설명이 필요한 경우**: 블록 주석 `/* */` 사용
- 너무 당연한 코드에는 주석을 달지 않음

예시:
~~~
const isEligible = true; // 환급 조건을 만족하는지 여부

/*
  금액이 1억 초과일 경우
  추가 세율을 적용합니다.
*/
if (amount > 100000000) {
  applyAdditionalRate();
}
~~~

---

### ✅ 주석 위치

- 코드 **위 또는 옆**에 작성 가능하지만, **위에 작성하는 것을 권장**
- 여러 줄 주석은 항상 코드 **블록 위**에 위치

---

### ✅ TODO / FIXME 태그

- 작업 예정 또는 수정 필요 구문에는 명확한 태그를 사용

예시:
~~~
function calculateTax() {
  // TODO: 해외 소득 분리 과세 항목 추가 필요
  // FIXME: 세율 계산 방식에 버그 가능성 있음
  return base * 0.22;
}
~~~

---

### ✅ JSX 내부 주석

- JSX 안에서는 `{/* ... */}` 형식으로 작성

예시:
~~~
return (
  <div>
    {/* 사용자 정보 섹션 */}
    <UserProfile />

    {/* TODO: 알림 기능 추가 */}
  </div>
);
~~~

---

### ✅ 주석 스타일 요약

| 목적           | 예시 구문                                 |
|----------------|--------------------------------------------|
| 일반 설명      | `// 사용자의 나이를 저장`                 |
| 할 일 표시     | `// TODO: 로직 보완`                      |
| 수정 필요 표시 | `// FIXME: 버그 있음`                    |
| JSX 주석       | `{/* 화면 상단 안내문 */}`                |


## 7. 🚀 Git 커밋 메시지 스타일

협업의 일관성을 위해 다음과 같은 커밋 메시지 스타일을 따릅니다.

---

### ✅ 커밋 메시지 형식

~~~
<태그>: <변경 요약 (명령형)>
~~~

예시:
~~~
feat: 양도소득세 계산 기능 추가
fix: form 입력값 초기화 오류 수정
refactor: NavigationBar 컴포넌트 구조 개선
~~~

---

### ✅ 주요 커밋 태그 목록

| 태그        | 설명 |
|-------------|------|
| `feat`      | 새로운 기능 추가 |
| `fix`       | 버그 수정 |
| `docs`      | 문서 추가/수정 (README, 주석 등) |
| `style`     | 코드 포맷 변경 (세미콜론, 들여쓰기 등) |
| `refactor`  | 기능 변화 없는 코드 구조 개선 |
| `test`      | 테스트 코드 추가/수정 |
| `chore`     | 빌드, 패키지, 기타 잡일성 수정 |

---

### ✅ 커밋 작성 예시

~~~
feat: 결과 페이지에 요약 메시지 컴포넌트 추가
fix: 만약 값이 없는 경우 에러나는 현상 수정
docs: README에 프로젝트 실행 방법 추가
style: JSX props 줄바꿈 스타일 통일
~~~

---

### ✅ 커밋 메시지 팁

- 메시지는 **명령형**으로 작성합니다. (`추가함` ❌ → `추가` ✅)
- 커밋은 논리 단위로 쪼개어 명확한 변경 내역을 남깁니다.
- Pull Request 시 변경 사항 목록이 **자동으로 깔끔해짐**

