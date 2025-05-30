# 🧾 TAXAI - 양도소득세 환급 예측 시스템 (프론트엔드)

**TAXAI**는 사용자가 보유한 부동산의 양도 정보를 입력하면, 복잡한 세법을 자동으로 해석하여 **양도소득세를 계산하고 환급 가능성을 예측**해주는 웹 기반 서비스입니다.

이 저장소는 TAXAI 프로젝트의 **프론트엔드(UI)** 부분을 담당하며, React 기반으로 **정보 입력 및 계산 결과를 제공하는 사용자 인터페이스**를 구현합니다.

---

## 1. 📌 프로젝트 개요

### 1-1. 프로젝트 소개  
사용자가 입력한 부동산 거래 정보를 바탕으로, 세법 규칙에 따라 **자동으로 입력 항목을 구성**하고, **양도소득세를 실시간으로 예측**해주는 도구입니다.

### 1-2. 목표 및 목적  
세법 지식이 없는 사용자도 **몇가지 질문에 답하는 것만으로 세금을 예측**할 수 있도록 설계되었으며, 이를 통해 **일반 사용자의 접근성**을 높이고 **세무사의 상담 효율**을 향상시킵니다.

### 1-3. 타겟 사용자
- 양도소득세를 사전에 확인하고자 하는 개인 납세자
- 상담 과정을 자동화하고자 하는 세무사 및 회계사

### 1-4. 주요 기능 요약
- 조건에 따라 자동 구성되는 **동적 입력 폼**
- CSV 기반 **규칙 분기 처리**
- 입력값에 따른 **세금 예측 결과 제공**
- 입력 내역 **저장 및 재사용**
- **표 및 그래프**를 통한 시각적 결과 출력


---

## 2. 🖥️ 기술 스택

### ✅ Frontend
- **React**: 사용자 인터페이스 구축
- **React-Bootstrap**: UI 컴포넌트 스타일링

### ✅ 상태 관리
- **Redux**: 전역 상태 관리
- **Redux Toolkit**: 액션/리듀서 작성 간소화

### ✅ API 통신
- **Axios**: 백엔드 API와의 데이터 통신

### ✅ 라우팅 및 폼
- **React Router**: 페이지 라우팅

---

## 3. 🧠 코드 스타일

- 코드 작성 가이드라인 및 커밋 메시지 규칙은 [contributing.md](./contributing.md)를 참고해주세요.

---

## 4. 🚀 프로젝트 구조

```bash
taxai-react/
├── public/                         #정적 파일들을 저장하는 디렉터리입니다.
├── src/                            #소스코드를 저장하는 디렉터리입니다.
│   ├── pages/                      #페이지 컴포넌트를 저장합니다.
│   │   ├── BasicInfo.js
│   │   ├── NavigationBar.css
│   │   ├── NavigationBar.js
│   │   └── OwnedHouseInfo.js
│   ├── components/                 #재사용 가능한 UI 컴포넌트를 저장합니다.
│   │   └── FieldTitle.js
│   ├── image/                      #이미지 파일들을 저장하는 디렉터리입니다.
│   │   └── TAXAI_logo.svg
│   ├── App.css
│   ├── App.js                      #최상위 앱 컴포넌트입니다.
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── node_modules/
├── .git/
├── .gitignore
├── package.json                    #프로젝트 의존성과 스크립트를 정의합니다.       
├── package-lock.json
├── README.md                       #프로젝트에 대한 설명을 담은 README 파일입니다.
```

## 5. 🧪 실행 방법

로컬 환경에서 TAXAI 프론트엔드 프로젝트를 실행하려면 다음 단계를 따르세요.

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/taxai-react.git

# 2. 디렉터리 이동
cd taxai-react

# 3. 패키지 설치
npm install

# 4. 개발 서버 실행
npm start
```


