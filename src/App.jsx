import React, { useState, useEffect } from 'react';
import MermaidChart from './components/MermaidChart';

const TOTAL_SLIDES = 17;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [agentTab, setAgentTab] = useState('agent-p1');
  const [flowTab, setFlowTab] = useState('flow-p1');

  // Trigger window resize event on slide/tab changes to force Mermaid diagrams to fit properly
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSlide, agentTab, flowTab]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle scroll wheel navigation (debounced/throttled)
  useEffect(() => {
    let lastScrollTime = 0;
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < 1000) return;

      if (e.deltaY > 0) {
        setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
        lastScrollTime = now;
      } else if (e.deltaY < 0) {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
        lastScrollTime = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div id="presentation-container">
      {/* 슬라이드 01: Cover */}
      <section className={`slide slide-cover ${currentSlide === 0 ? 'active' : ''}`}>
        <div className="cover-content">
          <div className="logo-area">
            <img src="./resources/symbolNoLine.png" alt="IEUM Symbol" />
          </div>
          <h1 className="cover-title ieum-wordmark">IEUM</h1>
          <div className="cover-subtitle">AI 에이전트 기반 워크플로우 자동화 플랫폼</div>
          <div className="cover-phrase">코딩 없이 완성하는 AI 자동화 워크플로우 플랫폼</div>
        </div>
        <div className="slide-header-right" style={{ position: 'absolute', top: '35px', right: '50px', zIndex: 20 }}>
          <div className="header-team-info">화이트기업 | 이음</div>
        </div>
        <div className="cover-footer"></div>
      </section>

      {/* 슬라이드 02: Team Introduction */}
      <section className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-users"></i>
            <div className="slide-title">팀원 소개</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Team Introduction</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="team-page-container">
            <div className="team-page-title">IEUM 프로젝트 팀 구성</div>
            <div className="team-page-subtitle">AI 에이전트 기반 워크플로우 자동화 플랫폼 개발팀</div>
            <div className="team-member-grid">
              <div className="team-profile-card">
                <div className="team-profile-icon"><i className="fa-solid fa-user-tie"></i></div>
                <div className="team-profile-name">윤도훈</div>
                <div className="team-profile-role">BE Lead / AI / PM</div>
              </div>
              <div className="team-profile-card">
                <div className="team-profile-icon"><i className="fa-solid fa-server"></i></div>
                <div className="team-profile-name">한민정</div>
                <div className="team-profile-role">Backend Developer</div>
              </div>
              <div className="team-profile-card">
                <div className="team-profile-icon"><i className="fa-solid fa-desktop"></i></div>
                <div className="team-profile-name">임성환</div>
                <div className="team-profile-role">Frontend Developer</div>
              </div>
              <div className="team-profile-card">
                <div className="team-profile-icon"><i className="fa-solid fa-palette"></i></div>
                <div className="team-profile-name">김수현</div>
                <div className="team-profile-role">Frontend Developer</div>
              </div>
              <div className="team-profile-card">
                <div className="team-profile-icon"><i className="fa-solid fa-cloud"></i></div>
                <div className="team-profile-name">김광진</div>
                <div className="team-profile-role">DevOps Engineer</div>
              </div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 03: Contents */}
      <section className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-list-ol"></i>
            <div className="slide-title">Contents</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">목차</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="contents-list">
            <div className="contents-item"><div className="contents-num">01</div><div className="contents-text">개요 및 플랫폼 배경</div></div>
            <div className="contents-item"><div className="contents-num">02</div><div className="contents-text">개발 동기 및 필요성 분석</div></div>
            <div className="contents-item"><div className="contents-num">03</div><div className="contents-text">시스템 구성 및 코어 동작 아키텍처</div></div>
            <div className="contents-item"><div className="contents-num">04</div><div className="contents-text">핵심 가치 및 주요 기능 메트릭</div></div>
            <div className="contents-item"><div className="contents-num">05</div><div className="contents-text">사용자 비주얼 워크플로우 루프</div></div>
            <div className="contents-item"><div className="contents-num">06</div><div className="contents-text">프론트엔드 정보 구조 (IA) 파이프라인</div></div>
            <div className="contents-item"><div className="contents-num">07</div><div className="contents-text">백엔드 및 AI 에이전트 인프라 구성</div></div>
            <div className="contents-item"><div className="contents-num">08</div><div className="contents-text">전체 배포 환경 및 비즈니스 기대효과</div></div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 04: Background */}
      <section className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-lightbulb"></i>
            <div className="slide-title">개발 동기 및 필요성</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Background</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="card-grid grid-3">
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-hourglass-half"></i></div>
              <div className="card-title">반복 업무의 비효율성</div>
              <div className="card-desc">데이터 크롤링 수집, 정형 보고서 생성, 단순 알림 발송 업무의 인적 휴먼 소요 코스트 과다 분산 방지 필요</div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-code-branch"></i></div>
              <div className="card-title">AI 활용의 높은 진입장벽</div>
              <div className="card-desc">이기종 LLM 인터페이스 연동 기술, 복잡한 토큰 프롬프트 제어 및 실시간 예외 에러 핸들링 역량 한계</div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-ban"></i></div>
              <div className="card-title">기존 자동화 도구의 한계</div>
              <div className="card-desc">Zapier, Make 등 기성 제품은 일차원적인 트리거-액션 결합에 그쳐 자율 추론형 분기 연동이 불가능</div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 05: Core Value */}
      <section className={`slide ${currentSlide === 4 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-star"></i>
            <div className="slide-title">핵심 가치</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Core Value</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="highlight-box">
            <div className="highlight-text">
              “사용자는 코드를 작성하지 않고도<br />AI가 포함된 업무 자동화 흐름을 직접 설계할 수 있다.”
            </div>
            <div className="sub-explanation">
              IEUM은 인라인 비주얼 에디터, BYOK 키 보안 암호화 아키텍처, 지능형 자율 추론 에이전트, 고성능 실행 코어 엔진을 유기적으로 융합하여 업무 무인화를 실현합니다.
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 06: Key Features */}
      <section className={`slide ${currentSlide === 5 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-cubes"></i>
            <div className="slide-title">주요 기능</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Key Features</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="card-grid grid-3" style={{ rowGap: '20px' }}>
            <div className="card">
              <div className="card-title">
                <i className="fa-solid fa-border-all" style={{ color: '#007ba7', marginRight: '8px' }}></i> 비주얼 캔버스 에디터
              </div>
              <div className="card-desc">React Flow 엔진을 결합하여 가독성과 제어 편의성을 극대화한 그래프 인터페이스</div>
            </div>
            <div className="card">
              <div className="card-title">
                <i className="fa-solid fa-key" style={{ color: '#007ba7', marginRight: '8px' }}></i> BYOK 보안 크리덴셜
              </div>
              <div className="card-desc">개별 API Key 주입 구조 기반 커널 스페이스 보안 등급 AES-256 대칭 암호화 모델링</div>
            </div>
            <div className="card">
              <div className="card-title">
                <i className="fa-solid fa-circle-nodes" style={{ color: '#007ba7', marginRight: '8px' }}></i> 5대 프리셋 모듈
              </div>
              <div className="card-desc">다양한 시나리오 확장을 충족하는 TRIGGER, AI, HTTP, CONDITION, TRANSFORM 규격 수립</div>
            </div>
            <div className="card">
              <div className="card-title">
                <i className="fa-solid fa-gears" style={{ color: '#007ba7', marginRight: '8px' }}></i> 순차 실행 커널 엔진
              </div>
              <div className="card-desc">ExecutionCursor 스레딩 추적을 기반으로 다중 파이프라인의 비동기 안전 분기 로직 처리</div>
            </div>
            <div className="card">
              <div className="card-title">
                <i className="fa-solid fa-robot" style={{ color: '#007ba7', marginRight: '8px' }}></i> 듀얼 에이전트 모드
              </div>
              <div className="card-desc">단발형 질의의 Simple 통신 인터페이스 및 무인 자율 조율을 보장하는 ReAct 가속 엔진 구동</div>
            </div>
            <div className="card">
              <div className="card-title">
                <i className="fa-solid fa-file-lines" style={{ color: '#007ba7', marginRight: '8px' }}></i> 실시간 분석 런타임 로그
              </div>
              <div className="card-desc">토폴로지 노드 실행 라이프사이클 기반 세션 추적 및 인터랙티브 디버깅 타임라인 연동</div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 07: User Workflow */}
      <section className={`slide ${currentSlide === 6 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-route"></i>
            <div className="slide-title">사용자 워크플로우</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">User Workflow</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="diagram-container">
            {currentSlide === 6 && (
              <MermaidChart chartCode={`
              flowchart LR
                  A["회원가입 / 로그인"] --> B["AI API Key 등록"]
                  B --> C["외부 서비스 연동"]
                  C --> D["워크플로우 생성"]
                  D --> E["노드 배치 / 자연어 생성"]
                  E --> F["저장 및 활성화"]
                  F --> G["수동 / Webhook / Schedule 실행"]
                  G --> H["실행 로그 확인"]
                  H --> E
                  style A fill:#f3fbff,stroke:#007ba7,stroke-width:2px;
                  style E fill:#e0f6ff,stroke:#007ba7,stroke-width:2px;
                  style G fill:#f0fdf4,stroke:#16a34a,stroke-width:2px;
              `} />
            )}
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 08: Frontend IA */}
      <section className={`slide ${currentSlide === 7 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-sitemap"></i>
            <div className="slide-title">프론트엔드 정보 구조 (IA)</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Frontend IA</div>
          </div>
        </div>
        <div className="slide-body" style={{ flexDirection: 'row', gap: '20px', alignItems: 'stretch' }}>
          <div className="diagram-container" style={{ flex: 1.2 }}>
            {currentSlide === 7 && (
              <MermaidChart chartCode={`
              flowchart TD
                  A["/ Landing"] --> B["/auth 로그인·회원가입"]
                  B --> C["/main 대시보드"]
                  C --> D["/workflow 워크플로우 목록"]
                  D --> E["/workflow/new 새 캔버스"]
                  D --> F["/workflow/:workflowId 편집 캔버스"]
                  C --> G["/inter-setting 통합 설정"]
                  C --> H["/user 계정 설정"]
                  E --> I["React Flow Editor"]
                  F --> I
                  I --> J["AI Assistant Panel"]
                  style I fill:#fff7ed,stroke:#ea580c,stroke-width:2px;
                  style J fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px;
              `} />
            )}
          </div>
          <div className="card" style={{ flex: 0.8, justifyContent: 'center', padding: '25px' }}>
            <div className="card-title" style={{ fontSize: '1.9rem', lineHeight: 1.35 }}>
              <i className="fa-solid fa-layer-group" style={{ color: '#007ba7' }}></i> 라우팅 설계 특징
            </div>
            <div className="card-desc" style={{ fontSize: '1.28rem', lineHeight: 1.75 }}>
              <ul style={{ marginLeft: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li>Header, Sidebar, Outlet 구조의 일관성 유지</li>
                <li>Zustand 독립 컨텍스트 기반 캔버스 토폴로지 보존</li>
                <li>대화형 패널 인터페이스 결합을 통한 실시간 빌드</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 09: Backend Architecture */}
      <section className={`slide ${currentSlide === 8 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-server"></i>
            <div className="slide-title">백엔드 구성도</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Backend Architecture</div>
          </div>
        </div>
        <div className="slide-body" style={{ flexDirection: 'row', gap: '20px', alignItems: 'stretch' }}>
          <div className="diagram-container" style={{ flex: 1.2 }}>
            {currentSlide === 8 && (
              <MermaidChart chartCode={`
              flowchart LR
                  FE["Frontend"] --> API["Spring Boot API"]
                  API --> AUTH["Auth / JWT"]
                  API --> USER["User"]
                  API --> CRED["Credential / BYOK"]
                  API --> WF["Workflow"]
                  API --> CHAT["Chat"]
                  API --> WEBHOOK["Webhook"]
                  WF --> CORE["workflow-core<br/>Execution Engine"]
                  CORE --> PG["PostgreSQL"]
                  CORE --> MG["MongoDB"]
                  AUTH --> RD["Redis"]
                  CHAT --> AG["AI Agent Server"]
              `} />
            )}
          </div>
          <div className="card" style={{ flex: 0.8, justifyContent: 'center', padding: '25px' }}>
            <div className="card-title" style={{ fontSize: '1.9rem', lineHeight: 1.35 }}>
              <i className="fa-solid fa-database" style={{ color: '#007ba7' }}></i> 영속성 계층 토폴로지
            </div>
            <div className="card-desc" style={{ fontSize: '1.28rem', lineHeight: 1.75 }}>
              <ul style={{ marginLeft: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li>Spring Boot API 독립 비즈니스 레이어 아키텍처</li>
                <li>정형 메타 분리 관리 시스템(PostgreSQL)</li>
                <li>비정형 런타임 추적 전용 고속 클러스터(MongoDB)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 10: Sequence Timeline */}
      <section className={`slide ${currentSlide === 9 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-shuffle"></i>
            <div className="slide-title">워크플로우 실행 흐름</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Sequence Timeline</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="diagram-container">
            {currentSlide === 9 && (
              <MermaidChart chartCode={`
              sequenceDiagram
                  participant User
                  participant Frontend
                  participant Backend
                  participant Runtime
                  participant Agent
                  participant DB
                  User->>Frontend: 워크플로우 실행 요청
                  Frontend->>Backend: POST /api/v1/workflows/{id}/execute
                  Backend->>DB: 실행 레코드 PENDING 생성
                  Backend->>Runtime: 비동기 실행 시작
                  Runtime->>DB: MongoDB에서 nodes/edges 로드
                  Runtime->>Runtime: TRIGGER부터 노드 순차 실행
                  Runtime->>Agent: AI 노드 실행 요청
                  Agent-->>Runtime: AI 실행 결과 반환
                  Runtime->>DB: 노드별 실행 로그 저장
                  Runtime->>DB: 실행 상태 SUCCESS/FAILED 저장
                  Backend-->>Frontend: 실행 결과 조회 가능
              `} />
            )}
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 11: AI Agent Deep-Dive */}
      <section className={`slide ${currentSlide === 10 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-brain"></i>
            <div className="slide-title">AI 에이전트 작업 과정</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">AI Agent Deep-Dive</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="split-diagram-wrapper">
            <div className="split-tabs">
              <button
                className={`tab-btn ${agentTab === 'agent-p1' ? 'active' : ''}`}
                onClick={() => setAgentTab('agent-p1')}
              >
                <i className="fa-solid fa-arrow-down-short-wide"></i> 1부: 요청 수집 및 전처리
              </button>
              <button
                className={`tab-btn ${agentTab === 'agent-p2' ? 'active' : ''}`}
                onClick={() => setAgentTab('agent-p2')}
              >
                <i className="fa-solid fa-diagram-project"></i> 2부: 자율 추론 및 실행 결과
              </button>
            </div>

            {agentTab === 'agent-p1' && (
              <div className="split-content">
                <div className="diagram-container" style={{ padding: 0 }}>
                  <MermaidChart chartCode={`
                  flowchart TD
                      U["사용자 자연어 요청"] --> FE["Frontend AI Assistant Canvas"]
                      FE --> BE["Backend Chat API Workflow API"]
                      BE --> CRED["Credential Service BYOK Key 복호화"]
                      BE --> CTX["Workflow Context 구성 현재상태"]
                      CRED --> AG["AI Agent Server FastAPI"]
                      CTX --> AG
                      style U fill:#f3fbff,stroke:#007ba7,stroke-width:2px;
                      style AG fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px;
                  `} />
                </div>
              </div>
            )}

            {agentTab === 'agent-p2' && (
              <div className="split-content">
                <div className="diagram-container" style={{ padding: 0 }}>
                  <MermaidChart chartCode={`
                  flowchart LR
                      AG["AI Agent Server<br/>FastAPI"] --> GUARD["Execution Guard<br/>요청 검증 / WAF 위험 차단"]
                      GUARD --> MODE{"Agent Type"}
                      MODE -->|simple| SIMPLE["Simple Agent<br/>단일 LLM 호출"]
                      MODE -->|react| REACT["ReAct Agent<br/>자율 자원 추론"]
                      REACT --> TOOLS["Tools: Web, Notion, Google,<br/>GitHub, Slack, MCP, Transform"]
                      SIMPLE --> LLM["LLM Providers<br/>Claude / GPT / Gemini"]
                      TOOLS --> LLM
                      LLM --> RESULT["응답 파싱"] --> MASK["민감정보 마스킹"]
                      MASK --> MONGO["MongoDB 저장"]
                      MASK --> BE["Backend 반환"]
                      style AG fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px;
                      style REACT fill:#fff7ed,stroke:#ea580c,stroke-width:2px;
                      style LLM fill:#f0fdf4,stroke:#16a34a,stroke-width:2px;
                  `} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 12: Infra Structure */}
      <section className={`slide ${currentSlide === 11 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-network-wired"></i>
            <div className="slide-title">전체 배포 및 인프라 구성도</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Infra Structure</div>
          </div>
        </div>
        <div className="slide-body" style={{ flexDirection: 'row', gap: '25px', alignItems: 'stretch' }}>
          <div className="diagram-container" style={{ flex: 1.1 }}>
            {currentSlide === 11 && (
              <MermaidChart chartCode={`
              flowchart LR
                  USER["User"] --> HTTPS["HTTPS"]
                  HTTPS --> NGINX["NGINX + WAF"]
                  NGINX --> FE["Frontend<br/>10.10.10.10"]
                  NGINX --> BE["Backend<br/>10.10.10.11:8080"]
                  BE --> REDIS["Redis"]
                  BE --> PG["PostgreSQL"]
                  BE --> AGENT["AI Agent"]
                  BE --> MONGO["MongoDB"]
                  GHA["GitHub Actions"] --> FE
                  GHA --> BE
                  GHA --> AGENT
              `} />
            )}
          </div>
          <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'space-between' }}>
            <div className="card" style={{ padding: '20px', gap: '6px' }}>
              <div className="card-title" style={{ fontSize: '1.3rem' }}>
                <i className="fa-solid fa-shield-halved" style={{ color: '#007ba7' }}></i> 역프록시 보안 URL
              </div>
              <div className="card-desc" style={{ fontSize: '1.1rem', color: '#007ba7', fontWeight: 700 }}>
                https://green.kiacms.co.kr
              </div>
            </div>
            <div className="card" style={{ padding: '25px', gap: '8px', flex: 1, justifyContent: 'flex-start' }}>
              <div className="card-title" style={{ fontSize: '1.4rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>
                <i className="fa-solid fa-server" style={{ color: '#007ba7' }}></i> 커널 클러스터 자원 배정 명세
              </div>
              <div className="infra-info-grid">
                <div className="infra-badge"><span className="label">Frontend 클러스터</span><span class="val">10.10.10.10</span></div>
                <div className="infra-badge"><span className="label">Backend Core API</span><span class="val">10.10.10.11:8080</span></div>
                <div className="infra-badge"><span className="label">Redis 고속캐싱세션</span><span class="val">10.10.10.12:6379</span></div>
                <div className="infra-badge"><span className="label">PostgreSQL 메인RDB</span><span class="val">10.10.10.13:5432</span></div>
                <div className="infra-badge"><span className="label">AI Agent 독립엔진</span><span class="val">10.10.10.14:8000</span></div>
                <div className="infra-badge"><span className="label">MongoDB 비정형분산</span><span class="val">10.10.10.15:27017</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 13: User Flow */}
      <section className={`slide ${currentSlide === 12 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-route"></i>
            <div className="slide-title">전체 유저 플로우</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">User Flow</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="split-diagram-wrapper">
            <div className="split-tabs">
              <button
                className={`tab-btn ${flowTab === 'flow-p1' ? 'active' : ''}`}
                onClick={() => setFlowTab('flow-p1')}
              >
                1부: 인입 및 환경 설계
              </button>
              <button
                className={`tab-btn ${flowTab === 'flow-p2' ? 'active' : ''}`}
                onClick={() => setFlowTab('flow-p2')}
              >
                2부: 조건 실행 및 피드백
              </button>
            </div>

            {flowTab === 'flow-p1' && (
              <div className="split-content">
                <div className="diagram-container" style={{ padding: 0 }}>
                  <MermaidChart chartCode={`
                  flowchart LR
                      A["서비스 접속"] --> B{"계정 보유?"}
                      B --> C["회원가입"]
                      B --> D["로그인"]
                      C --> D
                      D --> E["대시보드 인입"]
                      E --> F["AI Key 등록<br/>(BYOK)"]
                      F --> G["외부 서비스 연동<br/>Notion · Google · GitHub"]
                      G --> H["워크플로우<br/>생성 캔버스"]
                      G --> H
                      H --> I["AI Assistant<br/>자연어 설계 준비"]

                      classDef entry fill:#f3fbff,stroke:#007ba7,stroke-width:2px,color:#29537c;
                      classDef auth fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#312e81;
                      classDef config fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#7c2d12;
                      classDef canvas fill:#ecfdf5,stroke:#16a34a,stroke-width:3px,color:#14532d;
                      classDef ai fill:#f5f3ff,stroke:#7c3aed,stroke-width:3px,color:#4c1d95;
                      class A,E entry;
                      class B,C,D auth;
                      class F,G config;
                      class H canvas;
                      class I ai;
                  `} />
                </div>
              </div>
            )}

            {flowTab === 'flow-p2' && (
              <div className="split-content">
                <div className="diagram-container" style={{ padding: 0 }}>
                  <MermaidChart chartCode={`
                  flowchart LR
                      H["워크플로우 생성"] --> I["시각적 노드 배치"]
                      I --> J["AI 어시스턴트 패널<br/>자연어 편집"]
                      J --> K["저장 및 활성화"]
                      K --> L{"실행 트리거 감지"}

                      L --> T1["Manual"]
                      L --> T2["Webhook"]
                      L --> T3["Schedule"]

                      T1 --> M["수동 실행"]
                      T2 --> N["외부 엔드포인트 수집"]
                      T3 --> O["크론 스케줄러 런타임"]

                      M --> P["실시간 타임라인<br/>로그 분석 확인"]
                      N --> P
                      O --> P
                      P --> Q["피드백 기반 재편집"]
                      Q --> J

                      classDef build fill:#f3fbff,stroke:#007ba7,stroke-width:2px,color:#29537c;
                      classDef ai fill:#f5f3ff,stroke:#7c3aed,stroke-width:3px,color:#4c1d95;
                      classDef active fill:#ecfdf5,stroke:#16a34a,stroke-width:3px,color:#14532d;
                      classDef trigger fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#7c2d12;
                      classDef result fill:#f8fafc,stroke:#475569,stroke-width:2px,color:#1e293b;
                      class H,I build;
                      class J ai;
                      class K,L active;
                      class T1,T2,T3,M,N,O trigger;
                      class P,Q result;
                  `} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 14: 시연 영상 */}
      <section className={`slide ${currentSlide === 13 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-brands fa-youtube"></i>
            <div className="slide-title">서비스 시연 영상</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Demo Video</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="demo-video-container">
            <div className="demo-video-title">IEUM 워크플로우 자동화 시연</div>
            <div className="demo-video-desc">
              실제 서비스 시연 영상은 추후 업로드 예정입니다.<br />
              발표 자료에서는 아래 링크를 통해 시연 영상 페이지로 연결되는 구조를 먼저 제공합니다.
            </div>
            <a className="demo-video-link" href="https://youtu.be/yKhBYic2I_E" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
              시연 영상 바로가기
            </a>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 15: Value Creation */}
      <section className={`slide ${currentSlide === 14 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-chart-line"></i>
            <div className="slide-title">기대효과 및 활용 분야</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Value Creation</div>
          </div>
        </div>
        <div className="slide-body" style={{ flexDirection: 'row', gap: '20px', alignItems: 'stretch' }}>
          <div className="card-grid grid-2" style={{ flex: 1.2 }}>
            <div className="card" style={{ padding: '22px', gap: '8px' }}>
              <div className="card-title">1. AI 자동화 접근성 향상</div>
              <div className="card-desc">개발 지식이 전무한 일반 도메인 실무 실무자도 단시간 내 워크플로우 빌드 프로세스 수립 가능</div>
            </div>
            <div className="card" style={{ padding: '22px', gap: '8px' }}>
              <div className="card-title">2. 백오피스 업무 생산성 혁신</div>
              <div className="card-desc">정형/비정형 반복 가공 데이터의 자동화 처리 순환망 확보를 통한 운영 코스트 감축 효과 보장</div>
            </div>
            <div className="card" style={{ padding: '22px', gap: '8px' }}>
              <div className="card-title">3. BYOK 기반 공급자 독립권 확보</div>
              <div className="card-desc">특정 인프라 벤더 종속을 방지하여 비즈니스 모델 목적에 따른 유연한 상용 모델 기획 자율성 증대</div>
            </div>
            <div className="card" style={{ padding: '22px', gap: '8px' }}>
              <div className="card-title">4. 개방형 에코시스템 및 확장성</div>
              <div className="card-desc">Model Context Protocol 설계 기준에 맞춘 외부 상용 SaaS 인프라 유연 결합 모듈성 지원</div>
            </div>
          </div>
          <div className="card" style={{ flex: 0.8, padding: '25px' }}>
            <div className="card-title">
              <i className="fa-solid fa-building" style={{ color: '#007ba7' }}></i> 비즈니스 현업 적용 분야
            </div>
            <div className="tag-container">
              <div className="tag-item">고객의 VOC 실시간 맥락 분류 및 메일 피드백</div>
              <div className="tag-item">산업동향 자동 요약 정보 인텔리전스 메일링</div>
              <div className="tag-item">사내 문서 사전 승인 검토 완전 무인화 프로세스</div>
              <div className="tag-item">GitHub 이슈 자동 파싱 티켓 배정 및 알림</div>
              <div className="tag-item">행정 공공기관 대량 민원 처리 라우팅 제어</div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 슬라이드 16: Roadmap */}
      <section className={`slide ${currentSlide === 15 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-list-check"></i>
            <div className="slide-title">현재 구현 상태 및 향후 계획</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Roadmap</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="split-container">
            <div className="split-block">
              <div className="split-block-title">
                <i className="fa-solid fa-circle-check" style={{ color: '#10b981' }}></i> 현재 구현 완료 영역
              </div>
              <ul className="status-list">
                <li className="status-item"><i className="fa-solid fa-check-circle"></i> <span>Spring Security 기반 JWT 인증과 BYOK API Key AES-256 암호화 구조 구현</span></li>
                <li className="status-item"><i className="fa-solid fa-check-circle"></i> <span>React Flow + Zustand 기반 비주얼 워크플로우 캔버스 및 노드 편집 흐름 구현</span></li>
                <li className="status-item"><i className="fa-solid fa-check-circle"></i> <span>FastAPI AI Agent 서버에서 Simple / ReAct 에이전트 실행 구조 구성</span></li>
                <li className="status-item"><i className="fa-solid fa-check-circle"></i> <span>사용 도구: Web Search, Notion, Google Drive·Gmail·Calendar·Sheets, GitHub, Slack, Transform 연동 구조 반영</span></li>
                <li className="status-item"><i className="fa-solid fa-check-circle"></i> <span>MCP 기반 외부 도구 확장을 위한 Agent Tool Registry 및 MCP 서버 연결 구조 설계</span></li>
              </ul>
            </div>
            <div className="split-block">
              <div className="split-block-title plan">
                <i className="fa-solid fa-hourglass-start" style={{ color: '#007ba7' }}></i> 차기 고도화 계획
              </div>
              <ul className="status-list">
                <li className="status-item"><i className="fa-solid fa-arrow-circle-right"></i> <span>채팅 응답과 워크플로우 실행 상태를 SSE 기반 실시간 스트리밍 방식으로 전환</span></li>
                <li className="status-item"><i className="fa-solid fa-arrow-circle-right"></i> <span>MCP 템플릿 등록 서비스를 제공해 외부 기업이 자체 MCP 서버를 구성하고 IEUM에서 바로 활용할 수 있도록 확장</span></li>
                <li className="status-item"><i className="fa-solid fa-arrow-circle-right"></i> <span>MCP 및 도구 카탈로그 확대: 사내 API, SaaS, 문서·메일·캘린더·저장소 연동 추가</span></li>
                <li className="status-item"><i className="fa-solid fa-arrow-circle-right"></i> <span>서버 장애·네트워크 타임아웃에 대비한 Retry Policy와 실행 복구 로직 고도화</span></li>
                <li className="status-item"><i className="fa-solid fa-arrow-circle-right"></i> <span>기업별 업무 도메인에 맞춘 워크플로우 프리셋 및 스타터 템플릿 제공</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info">
            <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼
          </span>
        </div>
      </section>

      {/* 마지막 슬라이드: Closing */}
      <section className={`slide slide-cover closing-slide final-thanks-slide ${currentSlide === 16 ? 'active' : ''}`} aria-label="마무리 페이지">
        <h1 className="final-thanks-text">감사합니다</h1>
      </section>

      {/* 전체 페이지 공통 파도 애니메이션: 모든 슬라이드에서 계속 유지 */}
      <div className="global-waves-container" id="global-waves" aria-hidden="true">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave-global" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18s58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave-global" x="48" y="0" fill="rgba(224, 242, 254, 0.66)" />
            <use xlinkHref="#gentle-wave-global" x="48" y="3" fill="rgba(56, 189, 248, 0.46)" />
            <use xlinkHref="#gentle-wave-global" x="48" y="5" fill="rgba(0, 123, 167, 0.28)" />
            <use xlinkHref="#gentle-wave-global" x="48" y="7" fill="#29537c" />
          </g>
        </svg>
      </div>

      {/* 슬라이드 이동 컨트롤바 (인터랙티브 툴바) */}
      <div className="controls" aria-label="슬라이드 네비게이션 및 도구">
        <button 
          className="control-btn" 
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
          title="이전 슬라이드 (좌향 방향키)"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <div className="progress-indicator" id="slide-progress">
          {currentSlide + 1} / {TOTAL_SLIDES}
        </div>

        <button 
          className="control-btn" 
          onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1))}
          title="다음 슬라이드 (우향 방향키 / 스페이스바)"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <button 
          className="control-btn" 
          onClick={() => window.print()}
          title="PDF 내보내기"
          style={{ marginLeft: '6px', backgroundColor: '#007ba7' }}
        >
          <i className="fa-solid fa-file-pdf"></i>
        </button>
      </div>
    </div>
  );
}
