import React, { useState, useEffect } from 'react';
import MermaidChart from '../components/MermaidChart';

// 공통 헤더/푸터를 감싸는 슬라이드 틀 (졸작 최종 발표자료와 동일한 마크업)
function Slide({ active, icon, title, meta, children, bodyStyle }) {
  return (
    <section className={`slide ${active ? 'active' : ''}`}>
      <div className="slide-header">
        <div className="slide-title-area">
          <i className={icon}></i>
          <div className="slide-title">{title}</div>
        </div>
        <div className="slide-header-right">
          <div className="header-team-info">화이트기업 | 이음</div>
          <div className="slide-meta">{meta}</div>
        </div>
      </div>
      <div className="slide-body" style={bodyStyle}>{children}</div>
      <div className="slide-footer">
        <span className="project-info">
          <span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 중간발표
        </span>
      </div>
    </section>
  );
}

const Done = ({ children }) => (
  <li className="status-item"><i className="fa-solid fa-check-circle"></i> <span>{children}</span></li>
);
const Next = ({ children }) => (
  <li className="status-item"><i className="fa-solid fa-arrow-circle-right"></i> <span>{children}</span></li>
);

const slides = [
  // 01 표지
  (active) => (
    <section className={`slide slide-cover ${active ? 'active' : ''}`}>
      <div className="cover-content">
        <div className="logo-area">
          <img src="./resources/symbolNoLine.png" alt="IEUM Symbol" />
        </div>
        <h1 className="cover-title ieum-wordmark">IEUM</h1>
        <div className="cover-subtitle">AI 에이전트 기반 워크플로우 자동화 플랫폼</div>
        <div className="cover-phrase">졸업작품 중간발표 · 프로토타입 이후 진척과 남은 계획</div>
      </div>
      <div className="slide-header-right" style={{ position: 'absolute', top: '35px', right: '50px', zIndex: 20 }}>
        <div className="header-team-info">화이트기업 | 이음</div>
      </div>
      <div className="cover-footer"></div>
    </section>
  ),

  // 02 팀
  (active) => (
    <Slide active={active} icon="fa-solid fa-users" title="팀원 소개" meta="Team">
      <div className="team-page-container">
        <div className="team-page-title">IEUM 프로젝트 팀 구성</div>
        <div className="team-member-grid">
          {[
            ['fa-user-tie', '윤도훈', 'BE · AI Lead / PM'],
            ['fa-server', '한민정', 'Backend Developer'],
            ['fa-desktop', '임성환', 'Frontend Developer'],
            ['fa-palette', '김수현', 'Frontend Developer'],
            ['fa-cloud', '김광진', 'DevOps Engineer'],
          ].map(([icon, name, role]) => (
            <div className="team-profile-card" key={name}>
              <div className="team-profile-icon"><i className={`fa-solid ${icon}`}></i></div>
              <div className="team-profile-name">{name}</div>
              <div className="team-profile-role">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  ),

  // 03 목차
  (active) => (
    <Slide active={active} icon="fa-solid fa-list-ol" title="Contents" meta="목차">
      <div className="contents-list">
        {[
          '프로토타입 이후 한눈에 보기',
          '정량 지표',
          '주요 진척 ① ~ ④',
          '현재 시스템 아키텍처',
          '1차 프로토타입 대비 변화',
          '남은 로드맵과 베타 오픈 목표',
          '다음 계획: 앱 노드 확장 · 내장 노드',
          '리스크와 대응',
        ].map((t, i) => (
          <div className="contents-item" key={t}>
            <div className="contents-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="contents-text">{t}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 04 한눈 요약
  (active) => (
    <Slide active={active} icon="fa-solid fa-flag-checkered" title="프로토타입 이후 한눈에 보기" meta="Since June">
      <div className="card-grid grid-3">
        <div className="card">
          <div className="card-icon"><i className="fa-solid fa-puzzle-piece"></i></div>
          <div className="card-title">AI 데모 → 직접 조립하는 자동화</div>
          <div className="card-desc">LLM 없이 앱 동작을 실행하는 ACTION 노드, 51종 노드 카탈로그, 앱 트리거(Gmail·GitHub), 노드 단건 테스트</div>
        </div>
        <div className="card">
          <div className="card-icon"><i className="fa-solid fa-shield-heart"></i></div>
          <div className="card-title">운영 수준의 실행 엔진</div>
          <div className="card-desc">재시도·잡 큐·실패 알림, 멈춘 실행 자동 정리, 중복 실행 방지(멱등성), 사람 승인 게이트</div>
        </div>
        <div className="card">
          <div className="card-icon"><i className="fa-solid fa-layer-group"></i></div>
          <div className="card-title">관측 · 보안 · 멀티 LLM 기반</div>
          <div className="card-desc">OTel/Phoenix 트레이싱과 토큰 비용 집계, 크레덴셜 접근 3중 차단, 3사 14개 모델, Google ADK 2.x 전환</div>
        </div>
      </div>
    </Slide>
  ),

  // 05 정량 지표
  (active) => (
    <Slide active={active} icon="fa-solid fa-chart-simple" title="정량 지표" meta="By the Numbers">
      <div className="stat-grid">
        {[
          ['650+', '커밋', 'BE · Agent · FE · Infra'],
          ['110+', '머지된 PR', '1차 프로토타입 이후'],
          ['51', '노드 카탈로그', '트리거 5 · 액션 19 · AI 23 외'],
          ['5 → 7', '노드 타입', 'ACTION · APPROVAL 추가'],
          ['14', '지원 LLM 모델', 'Claude 6 · Gemini 5 · OpenAI 3'],
          ['2,100+', '자동화 테스트', 'BE 1,221 · Agent 940'],
        ].map(([num, label, sub]) => (
          <div className="stat-tile" key={label}>
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-sub">{sub}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 06 진척 ① 노드 카탈로그·ACTION·앱 트리거
  (active) => (
    <Slide active={active} icon="fa-solid fa-cubes" title="주요 진척 ① 직접 조립하는 자동화" meta="Catalog · Action · Trigger"
      bodyStyle={{ flexDirection: 'row', gap: '24px', alignItems: 'stretch' }}>
      <div className="diagram-container" style={{ flex: 1.2 }}>
        <MermaidChart chartCode={`
        flowchart TB
            T["앱 트리거<br/>Gmail 새 메일 · GitHub 새 이슈"] --> A["ACTION 노드<br/>LLM 없이 앱 동작"]
            A --> C{"CONDITION"}
            C --> AI["AI 노드<br/>요약 · 분류"]
            C --> AP["APPROVAL<br/>사람 승인"]
            AI --> S["ACTION<br/>Slack · Notion 전송"]
            AP --> S
            classDef trig fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#7c2d12;
            classDef act fill:#ecfdf5,stroke:#16a34a,stroke-width:2px,color:#14532d;
            classDef ai fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px,color:#4c1d95;
            class T trig;
            class A,S act;
            class AI,AP ai;
        `} />
      </div>
      <div className="split-block" style={{ flex: 1 }}>
        <div className="split-block-title"><i className="fa-solid fa-check-double" style={{ color: '#10b981' }}></i> 완료 · dev 배포</div>
        <ul className="status-list">
          <Done><b>노드 카탈로그</b>를 단일 원본으로: 51종 노드 정의를 agent가 제공, BE·FE가 같은 정의를 사용</Done>
          <Done><b>ACTION 노드</b>: Gmail·Sheets·Notion·Slack 같은 앱 동작을 LLM 호출 없이 바로 실행 → 빠르고 비용 0</Done>
          <Done><b>앱 트리거</b>: Gmail 새 메일(5분 폴링, 실측 73초 내 발화), GitHub 새 이슈(App 웹훅·서명 검증)</Done>
          <Done><b>노드 단건 테스트</b>: 워크플로우 전체를 돌리지 않고 노드 하나만 시험 실행</Done>
          <Done><b>드롭다운 options</b>: 시트·채널·DB 목록을 사용자 계정에서 불러와 선택 (공급원 15종)</Done>
        </ul>
      </div>
    </Slide>
  ),

  // 07 진척 ② 실행 엔진 신뢰성
  (active) => (
    <Slide active={active} icon="fa-solid fa-gears" title="주요 진척 ② 실행 엔진 신뢰성" meta="Execution Reliability">
      <div className="card-grid grid-3" style={{ rowGap: '20px' }}>
        {[
          ['fa-rotate-right', '노드 재시도 + 백오프', '일시적 외부 장애는 자동 재시도, 소진 시 실패 알림'],
          ['fa-list-check', 'Redis 잡 큐', '스케줄·수동·웹훅 실행을 모두 큐로 경유, 유실 차단과 큐 자동 복구'],
          ['fa-fingerprint', '멱등성', '재시도해도 메일·메시지가 두 번 나가지 않도록 Idempotency Key 전달'],
          ['fa-broom', '고립 실행 정리', '서버 재시작 등으로 멈춘 RUNNING 실행을 sweeper가 감지해 정리'],
          ['fa-user-check', '사람 승인 게이트', 'APPROVAL 노드: 승인 · 거부 · 만료 처리 후 이어서 실행'],
          ['fa-tower-broadcast', '실시간 상태 (SSE)', '노드별 실행 상태와 AI 설계 과정을 화면에 스트리밍'],
        ].map(([icon, title, desc]) => (
          <div className="card" key={title}>
            <div className="card-title">
              <i className={`fa-solid ${icon}`} style={{ color: '#007ba7', marginRight: '8px' }}></i> {title}
            </div>
            <div className="card-desc">{desc}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 07-2 진척 ② 드롭다운으로 실행 신뢰성
  (active) => (
    <Slide active={active} icon="fa-solid fa-list-ul" title="주요 진척 ② 드롭다운으로 AI 추측 제거" meta="Dropdown Options">
      <div className="split-container" style={{ height: 'auto' }}>
        <div className="split-block">
          <div className="split-block-title" style={{ color: '#b45309' }}><i className="fa-solid fa-circle-xmark" style={{ color: '#f97316' }}></i> 이전: 문장 속 ID를 AI가 해석</div>
          <div className="quote-box">"<b>1AbC…xyz</b> 시트의 <b>매출</b> 탭에 결과를 추가해줘"</div>
          <ul className="status-list">
            <li className="status-item"><i className="fa-solid fa-triangle-exclamation" style={{ color: '#f97316' }}></i> <span>시트 ID · 채널 · DB를 AI가 프롬프트에서 뽑아내야 함 → 잘못 읽으면 <b>엉뚱한 곳에 기록</b></span></li>
            <li className="status-item"><i className="fa-solid fa-triangle-exclamation" style={{ color: '#f97316' }}></i> <span>사용자는 ID를 직접 찾아 복사해야 함</span></li>
          </ul>
        </div>
        <div className="split-block">
          <div className="split-block-title"><i className="fa-solid fa-circle-check" style={{ color: '#10b981' }}></i> 이후: 내 계정에서 골라 고정</div>
          <div className="quote-box ok">스프레드시트 <b>[2026 매출 ▾]</b> → 워크시트 <b>[매출 ▾]</b></div>
          <ul className="status-list">
            <Done>연결된 계정에서 시트 · 캘린더 · 폴더 · Notion DB 목록을 불러와 선택 (<b>공급원 15종</b>)</Done>
            <Done>고른 값은 도구 인자로 <b>고정 주입</b>, AI가 바꿀 수 없음 (비운 칸만 AI가 결정)</Done>
            <Done>값이 비거나 참조가 안 풀리면 <b>실행을 멈춤</b>: 다른 시트를 덮어쓰는 사고 차단</Done>
            <Done>목록은 본인 계정 기준으로만 조회해 남의 리소스 접근 불가</Done>
          </ul>
        </div>
      </div>
    </Slide>
  ),

  // 08 진척 ③ AI · 멀티 LLM
  (active) => (
    <Slide active={active} icon="fa-solid fa-robot" title="주요 진척 ③ AI 노드 · 멀티 LLM" meta="AI Agent">
      <div className="split-container">
        <div className="split-block">
          <div className="split-block-title"><i className="fa-solid fa-brain" style={{ color: '#7c3aed' }}></i> AI 에이전트</div>
          <ul className="status-list">
            <Done><b>Google ADK 1.31 → 2.3</b> 전환, 커스텀 모델 래퍼 슬림화</Done>
            <Done>워크플로우 생성을 <b>템플릿 레지스트리 + 슬롯 채우기</b> 방식으로 바꿔 결과 안정화</Done>
            <Done>자연어 수정은 <b>draft 방식</b>: 사용자가 확인한 뒤에만 반영</Done>
            <Done>앱별 도구(Google · Notion · Slack · Discord · GitHub)와 <b>MCP</b> 실행</Done>
          </ul>
        </div>
        <div className="split-block">
          <div className="split-block-title"><i className="fa-solid fa-microchip" style={{ color: '#007ba7' }}></i> 모델 · 비용</div>
          <ul className="status-list">
            <Done><b>3사 14개 모델</b> 카탈로그, 사용자가 고른 모델 보존 (폐기 모델만 자동 대체)</Done>
            <Done>사용자 키(<b>BYOK</b>) 기반 호출, 키는 암호화 저장</Done>
            <Done>노드별 <b>토큰 사용량 · 비용</b> 집계</Done>
          </ul>
        </div>
      </div>
    </Slide>
  ),

  // 09 진척 ④ 관측성 · 보안 · 인프라
  (active) => (
    <Slide active={active} icon="fa-solid fa-shield-halved" title="주요 진척 ④ 관측성 · 보안 · 인프라" meta="Ops · Security">
      <div className="card-grid grid-3">
        <div className="card">
          <div className="card-icon"><i className="fa-solid fa-magnifying-glass-chart"></i></div>
          <div className="card-title">관측성</div>
          <div className="card-desc">OpenTelemetry → Phoenix 트레이싱. 실행 기록에 traceId · 노드 id를 붙여 AI 호출 한 건까지 추적</div>
        </div>
        <div className="card">
          <div className="card-icon"><i className="fa-solid fa-lock"></i></div>
          <div className="card-title">보안</div>
          <div className="card-desc">남의 크레덴셜을 쓰는 IDOR 경로 3중 차단, 웹훅 URL 원문 대신 크레덴셜 참조, GitHub 웹훅 서명 검증</div>
        </div>
        <div className="card">
          <div className="card-icon"><i className="fa-solid fa-cloud-arrow-up"></i></div>
          <div className="card-title">인프라</div>
          <div className="card-desc">AWS EC2 분리 배포, dev 브랜치 push 시 GitHub Actions self-hosted runner로 4개 레포 자동 배포</div>
        </div>
      </div>
    </Slide>
  ),

  // 10 아키텍처
  (active) => (
    <Slide active={active} icon="fa-solid fa-diagram-project" title="현재 시스템 아키텍처" meta="Architecture">
      <div className="diagram-container">
        <MermaidChart chartCode={`
        flowchart LR
            U(["사용자"]) --> FE["ieum-frontend<br/>React 19 · Vite"]
            FE -->|"REST · SSE · WS"| BE["ieum-backend<br/>Spring Boot 3.5<br/>실행 엔진 · 잡 큐"]
            BE --> DB[("PostgreSQL 16<br/>Redis 7")]
            EXT["Gmail 폴링<br/>GitHub 웹훅"] -->|"앱 트리거"| BE
            BE -->|"AI · ACTION 노드 위임"| AG["ieum-agent<br/>FastAPI · ADK 2.3<br/>노드 카탈로그"]
            AG --> MG[("MongoDB")]
            AG --> LLM["Gemini · Claude · OpenAI"]
            AG --> APPS["Google · Notion · Slack<br/>Discord · GitHub · MCP"]
            AG -.->|"OTel"| PX["Phoenix 트레이싱"]
            classDef core fill:#e0f6ff,stroke:#007ba7,stroke-width:3px,color:#29537c;
            classDef ext fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#7c2d12;
            class BE,AG core;
            class EXT,APPS,LLM ext;
        `} />
      </div>
    </Slide>
  ),

  // 11 1차 프로토타입 대비 변화
  (active) => (
    <Slide active={active} icon="fa-solid fa-code-compare" title="1차 프로토타입 대비 변화" meta="Prototype → Now">
      <table className="compare-table">
        <thead>
          <tr><th>항목</th><th>1차 프로토타입</th><th>현재</th></tr>
        </thead>
        <tbody>
          {[
            ['노드', '5종 (TRIGGER · AI · HTTP · CONDITION · TRANSFORM)', <><b>7종</b> (+ ACTION · APPROVAL), 카탈로그 <b>51항목</b></>],
            ['앱 동작', 'AI 노드가 LLM으로 도구 호출', <><b>ACTION 노드</b>가 LLM 없이 직접 실행</>],
            ['트리거', '수동 · 웹훅 · 스케줄', <>+ <b>앱 트리거</b> (Gmail 새 메일 · GitHub 새 이슈)</>],
            ['실행 엔진', '순차 실행', <>병렬 분기 + <b>잡 큐 · 재시도 · 멱등성 · 고립 실행 정리</b></>],
            ['실행 확인', '실행 후 로그 조회', <><b>SSE</b>로 노드별 상태 실시간 표시</>],
            ['리소스 지정', '프롬프트 문장에 ID 직접 기입', <>계정 목록 <b>드롭다운</b>으로 선택 · 고정</>],
            ['AI 출력', '자유 문장', <>정해진 칸으로 <b>구조화 출력</b></>],
            ['운영 · 관측', '실행 로그', <><b>OTel · Phoenix</b> 트레이싱, 토큰 비용 집계</>],
          ].map(([k, before, after]) => (
            <tr key={k}><td>{k}</td><td>{before}</td><td>{after}</td></tr>
          ))}
        </tbody>
      </table>
    </Slide>
  ),

  // 12 진행 현황 + 로드맵 (2026-10-13 기준)
  (active) => (
    <Slide active={active} icon="fa-solid fa-road" title="남은 로드맵과 베타 오픈 목표" meta="Roadmap">
      <div className="roadmap">
        {[
          ['done', '앱 동작을 직접 조립하는 자동화', '완료'],
          ['done', '실행 전 오류 검사 · AI 결과 형식 고정', '완료 (10/12)'],
          ['done', '외부 서비스 웹훅 그대로 받기', '완료 (10/13)'],
          ['now', '앱 → 이벤트 순으로 고르는 노드 구조', '설계 검토 중'],
          ['todo', '9개 앱 노드 확장 · 파일 주고받기', '예정'],
          ['todo', '분기 · 승인 · 대기 등 흐름 제어', '예정'],
          ['todo', '자연어로 요청하면 같은 노드로 자동 조립', '예정'],
          ['goal', '베타 테스트 오픈', '11월 말 목표'],
        ].map(([state, title, label]) => (
          <div className={`roadmap-step ${state}`} key={title}>
            <div className="roadmap-dot">{state === 'goal' && <i className="fa-solid fa-flag"></i>}</div>
            <div className="roadmap-title">{title}</div>
            <div className="roadmap-label">{label}</div>
          </div>
        ))}
      </div>
      <div className="split-container" style={{ height: 'auto', marginTop: '30px' }}>
        <div className="split-block" style={{ padding: '24px 28px' }}>
          <div className="split-block-title" style={{ fontSize: '1.3rem' }}><i className="fa-solid fa-user" style={{ color: '#007ba7' }}></i> 베타까지 사용자가 얻게 될 것</div>
          <ul className="status-list">
            <Next><b>더 많은 앱 작업</b>: Calendar · Slack · Notion · GitHub부터, Gmail 첨부 · Drive 업로드처럼 파일을 주고받는 자동화까지</Next>
            <Next><b>흐름 제어</b>: 조건별로 나누기, 데이터 형식 정리, 담당자 승인 후 진행, 정해진 시간 뒤 실행</Next>
            <Next><b>AI로 만들기</b>: 자연어 요청을 직접 조립할 때와 똑같은 노드로 만들어 그대로 수정 · 검증 가능</Next>
          </ul>
        </div>
        <div className="split-block" style={{ padding: '24px 28px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
          <div className="highlight-text" style={{ fontSize: '1.7rem' }}>🚀 <b>11월 말 베타 테스트 오픈</b></div>
          <div className="sub-explanation">남은 단계를 마친 뒤 실제 사용자 대상 베타 진행 · FE 화면 연동은 FE팀과 병행</div>
        </div>
      </div>
    </Slide>
  ),

  // 13 다음 계획: 앱 노드 확장
  (active) => (
    <Slide active={active} icon="fa-solid fa-grip" title="다음 계획: 앱 노드 확장" meta="App Nodes"
      bodyStyle={{ gap: '26px' }}>
      <div className="app-flow">
        {['Zapier 이벤트 = 노드', 'Action · Search로 분류', '공식 API 문서로 검증', '입력 칸 유형 분류', '앱별 결정 확정'].map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <i className="fa-solid fa-chevron-right app-flow-arrow"></i>}
            <div className="app-flow-step"><span>{i + 1}</span>{t}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="app-grid">
        {[
          // [아이콘, 앱, 현재 노드 수, Action, Search, Trigger] — 옵시디언 앱-노드-확장-설계 기준 (Slack·Discord 웹훅 노드는 Action에 포함)
          ['fa-brands fa-google', 'Gmail', 2, 11, 4, 0],
          ['fa-solid fa-table', 'Google Sheets', 3, 20, 11, 0],
          ['fa-solid fa-calendar', 'Google Calendar', 3, 8, 6, 0],
          ['fa-brands fa-google-drive', 'Google Drive', 2, 14, 7, 0],
          ['fa-solid fa-n', 'Notion', 6, 12, 11, 0],
          ['fa-brands fa-github', 'GitHub', 3, 8, 12, 1],
          ['fa-brands fa-slack', 'Slack', 1, 14, 10, 0],
          ['fa-brands fa-discord', 'Discord', 1, 8, 2, 0],
          ['fa-solid fa-clipboard-list', 'Google Forms', 0, 1, 3, 2],
        ].map(([icon, name, now, action, search, trigger]) => (
          <div className="app-card" key={name}>
            <i className={icon}></i>
            <div className="app-name">{name}<div className="app-now">현재 {now}개</div></div>
            <div className="app-badges">
              <span className="badge action">Action {action}</span>
              <span className="badge search">Search {search}</span>
              {trigger > 0 && <span className="badge trigger">Trigger {trigger}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="app-rules">
        <div><b>9개 앱 · Action 96 · Search 66 · Trigger 3</b> 설계 확정</div>
        <div><b>Action</b> = 만들기 · 보내기 · 수정 / <b>Search</b> = 찾기 · 조회</div>
        <div>드롭다운 = 목록 20개 + 검색 + ID 직접 입력</div>
        <div>검색 0건은 멈추지 않고 "결과 없음"으로 진행</div>
        <div>삭제 기본값은 되돌릴 수 있는 휴지통</div>
        <div>Slack · Discord는 OAuth 봇 전환 전제</div>
      </div>
    </Slide>
  ),

  // 13-2 다음 계획: 내장 노드 (옵시디언 내장-노드-설계 기준)
  (active) => (
    <Slide active={active} icon="fa-solid fa-toolbox" title="다음 계획: 내장 노드" meta="Built-in Nodes"
      bodyStyle={{ gap: '16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 25px', width: '100%' }}>
        {[
          ['fa-code-branch', '① 분기', 'CONDITION 확장', '여러 갈래 중 선택 + "조건이 맞을 때만 계속" 필터 · "1,000원"도 숫자로 비교', 'todo'],
          ['fa-wand-magic-sparkles', '② 포맷터', '새 FORMATTER', '텍스트 · 숫자 · 날짜 변환 약 25종, 노드 1개 = 변환 1개', 'todo'],
          ['fa-user-check', '③ 사람 확인', 'APPROVAL 확장', '승인 요청 + 값 입력받기 · 기한 5분~7일 · IEUM · Slack · Discord 알림', 'todo'],
          ['fa-clock', '④ 기다리기', '새 DELAY', '정해진 시간 동안 / 특정 시각까지 / 순서대로 대기, 최대 30일', 'todo'],
          ['fa-plug', '⑤ AI · HTTP · 웹훅', '기존 노드 보강', 'AI 템플릿 4종 · 출력 칸 자동 제안 · HTTP PATCH · Basic 인증 · 웹훅 원문 수신(완료)', 'part'],
        ].map(([icon, title, type, desc, state]) => (
          <div className="card" key={title} style={{ padding: '18px 22px', gap: '6px', justifyContent: 'flex-start', width: 'calc((100% - 50px) / 3)' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className={`fa-solid ${icon}`} style={{ color: '#007ba7' }}></i> {title}
              <span className={`badge ${state === 'part' ? 'action' : 'search'}`} style={{ marginLeft: 'auto' }}>
                {state === 'part' ? '일부 완료' : '설계 확정'}
              </span>
            </div>
            <div className="app-now" style={{ fontSize: '0.95rem' }}>{type}</div>
            <div className="card-desc">{desc}</div>
          </div>
        ))}
      </div>
      <div className="app-rules">
        <div><b>구현 순서</b>: 분기 → 포맷터 → 사람 확인 → 기다리기 → AI · HTTP 보강</div>
        <div>LLM · 앱을 쓰는 노드만 agent, 나머지 내장 노드는 BE에서 실행</div>
      </div>
    </Slide>
  ),

  // 14 리스크
  (active) => (
    <Slide active={active} icon="fa-solid fa-triangle-exclamation" title="리스크와 대응" meta="Risks">
      <div className="card-grid grid-3" style={{ width: '100%' }}>
        {[
          ['FE 화면 연동 지연', '카탈로그 · ACTION · 트리거가 백엔드에만 있고 화면에는 아직 미노출', '로드맵 ⑥에서 FE팀과 연동 명세 확정 후 우선 반영'],
          ['운영(main) 미반영', '모든 기능이 dev 서버 기준으로만 배포됨', '최종 발표 전 main 릴리스와 운영 배포 진행'],
          ['외부 연동 검증', 'OpenAI 모델 실호출 미검증, 일반 수신 웹훅의 WAF 통과 미확인', '실계정으로 검증 후 별도 이슈로 처리'],
        ].map(([title, risk, plan]) => (
          <div className="card" key={title} style={{ padding: '24px', gap: '10px' }}>
            <div className="card-title">{title}</div>
            <div className="card-desc"><b>현황</b> {risk}</div>
            <div className="card-desc" style={{ color: '#007ba7' }}><b>대응</b> {plan}</div>
          </div>
        ))}
      </div>
    </Slide>
  ),

  // 15 마무리
  (active) => (
    <section className={`slide slide-cover closing-slide final-thanks-slide ${active ? 'active' : ''}`} aria-label="마무리 페이지">
      <h1 className="final-thanks-text">감사합니다</h1>
    </section>
  ),
];

const TOTAL_SLIDES = slides.length;

export default function MidtermApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => setCurrentSlide((p) => Math.min(p + 1, TOTAL_SLIDES - 1));
  const prev = () => setCurrentSlide((p) => Math.max(p - 1, 0));

  // Mermaid 다이어그램이 활성 슬라이드 크기에 맞게 다시 그려지도록
  useEffect(() => {
    const timer = setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    };
    let last = 0;
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 1000 || e.deltaY === 0) return;
      last = now;
      e.deltaY > 0 ? next() : prev();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div id="presentation-container">
      {slides.map((render, i) => <React.Fragment key={i}>{render(i === currentSlide)}</React.Fragment>)}

      <div className="global-waves-container" aria-hidden="true">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
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

      <div className="controls" aria-label="슬라이드 네비게이션">
        <button className="control-btn" onClick={prev} title="이전 슬라이드"><i className="fa-solid fa-chevron-left"></i></button>
        <div className="progress-indicator">{currentSlide + 1} / {TOTAL_SLIDES}</div>
        <button className="control-btn" onClick={next} title="다음 슬라이드"><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  );
}
