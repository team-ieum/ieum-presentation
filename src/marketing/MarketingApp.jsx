import React, { useState, useEffect } from 'react';
import MermaidChart from '../components/MermaidChart';

// 본편 15장(0~14) + Appendix 6장(15~20)
const MAIN_SLIDES = 15;
const TOTAL_SLIDES = 21;

export default function MarketingApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [agentTab, setAgentTab] = useState('agent-p1');
  const [flowTab, setFlowTab] = useState('flow-p1');

  // 슬라이드/탭 전환 시 Mermaid 다이어그램 리사이즈 트리거
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSlide, agentTab, flowTab]);

  // 키보드 네비게이션
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 휠 네비게이션 (스로틀)
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
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const isAppendix = currentSlide >= MAIN_SLIDES;

  return (
    <div id="presentation-container">
      {/* 01: Cover */}
      <section className={`slide slide-cover ${currentSlide === 0 ? 'active' : ''}`}>
        <div className="cover-content">
          <div className="logo-area">
            <img src="./resources/symbolNoLine.png" alt="IEUM Symbol" />
          </div>
          <h1 className="cover-title ieum-wordmark">IEUM</h1>
          <div className="cover-subtitle">코딩 없이, AI가 알아서 일하는 자동화</div>
          <div className="cover-phrase">말로 시키면 AI가 워크플로우를 만들고 실행합니다</div>
        </div>
        <div className="slide-header-right" style={{ position: 'absolute', top: '35px', right: '50px', zIndex: 20 }}>
          <div className="header-team-info">화이트기업 | 이음</div>
        </div>
        <div className="cover-footer"></div>
      </section>

      {/* 02: Hook */}
      <section className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-circle-question"></i>
            <div className="slide-title">잠깐, 질문 하나</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Hook</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-hook">
            <div className="mk-hook-eyebrow">매주 금요일, 누군가의 30분</div>
            <div className="mk-hook-question">
              이번 주 머지된 PR,<br />아직도 <span className="accent">직접 훑어</span> 정리하세요?
            </div>
            <div className="mk-hook-sub">
              GitHub에서 PR을 모으고 → 요약하고 → 노션에 적고 → 팀에 공유하는 일.<br />
              사람이 하면 매주 반복, AI가 하면 한 번 설계로 끝납니다.
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 03: The Problem — Before 타임라인 */}
      <section className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-person-walking-arrow-loop-left"></i>
            <div className="slide-title">문제: 반복되는 아침</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">The Problem</div>
          </div>
        </div>
        <div className="slide-body">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="mk-persona">
              <i className="fa-solid fa-user-clock"></i>
              개발팀 리드의 금요일 — 매주 같은 5단계
            </div>
            <div className="mk-timeline">
              {[
                { t: '금 9:00', icon: 'fa-magnifying-glass', label: 'GitHub PR 목록 확인' },
                { t: '9:10', icon: 'fa-code-merge', label: '머지된 PR 추리기' },
                { t: '9:20', icon: 'fa-robot', label: 'AI로 요약' },
                { t: '9:30', icon: 'fa-file-lines', label: '노션에 정리' },
                { t: '9:40', icon: 'fa-bell', label: '디스코드로 공유' },
              ].map((s, i, arr) => (
                <React.Fragment key={s.t}>
                  <div className="mk-timeline-step">
                    <div className="mk-timeline-time">{s.t}</div>
                    <div className="mk-timeline-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                    <div className="mk-timeline-label">{s.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mk-timeline-arrow"><i className="fa-solid fa-chevron-right"></i></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mk-loop-badge">
              <i className="fa-solid fa-rotate-right"></i> 그리고 다음 주에도, 그 다음에도 — 매주 반복
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 04: 기존 도구의 틈새 — 2x2 */}
      <section className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-table-cells-large"></i>
            <div className="slide-title">기존 도구가 못 메운 빈칸</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Positioning</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-matrix-wrap">
            <div className="mk-axis top">자동 (사람 개입 없음)</div>
            <div className="mk-axis bottom">수동 (사람이 매번)</div>
            <div className="mk-axis left">단순 (정해진 규칙)</div>
            <div className="mk-axis right">지능 (스스로 판단)</div>
            <div className="mk-matrix">
              <div className="mk-quadrant dim">
                <div className="q-name">Zapier · Make</div>
                <div className="q-desc">자동이지만 단순<br />트리거-액션, 추론은 불가</div>
              </div>
              <div className="mk-quadrant win">
                <div className="q-name">IEUM</div>
                <div className="q-desc">자동 + 지능<br />AI가 판단하며 무인 실행</div>
              </div>
              <div className="mk-quadrant dim">
                <div className="q-name">엑셀 · 매크로</div>
                <div className="q-desc">단순하고 수동<br />사람이 돌려야 함</div>
              </div>
              <div className="mk-quadrant dim">
                <div className="q-name">ChatGPT</div>
                <div className="q-desc">지능적이지만 수동<br />매번 사람이 복붙</div>
              </div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 05: Solution 한 문장 */}
      <section className={`slide ${currentSlide === 4 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <div className="slide-title">그래서, IEUM</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Solution</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-solution">
            <div className="mk-solution-line">
              <span className="hl">말로 시키면,</span><br />
              AI가 워크플로우를 직접 만들고 실행합니다.
            </div>
            <div className="mk-solution-sub">
              노드를 코딩할 필요가 없습니다. 자연어 한 줄이면 충분합니다.<br />
              — 다음 장에서 바로 보여드리겠습니다.
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 06: ★ 라이브 데모 */}
      <section className={`slide ${currentSlide === 5 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-play"></i>
            <div className="slide-title">직접 보여드립니다</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Live Demo</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-demo">
            <div className="mk-demo-badge">
              <i className="fa-solid fa-desktop"></i> LIVE — 실제 서비스 화면으로 전환
            </div>
            <div className="mk-demo-quote">
              "매주 금요일 9시에 최근 머지된 PR 가져와서 요약하고, 노션에 저장한 뒤 디스코드로 알려줘"
            </div>
            <div className="mk-demo-steps">
              <div className="mk-demo-step">
                <div className="step-num">1</div>
                <div className="step-title">자연어 입력</div>
                <div className="step-desc">AI 어시스턴트 패널에 한 줄로 요청</div>
              </div>
              <div className="mk-demo-step">
                <div className="step-num">2</div>
                <div className="step-title">노드 자동 생성</div>
                <div className="step-desc">Schedule(금 9시) → GitHub PR 조회 → AI 요약 → Notion 저장 → Discord 알림 이 캔버스에 그려짐</div>
              </div>
              <div className="mk-demo-step">
                <div className="step-num">3</div>
                <div className="step-title">실행 · 실시간 로그</div>
                <div className="step-desc">저장·활성화 후 실행 → 노드별 진행이 실시간으로 표시</div>
              </div>
            </div>
            <div className="mk-demo-stat">
              <i className="fa-solid fa-stopwatch"></i> 자연어 한 줄 → AI 설계 응답 <b>중앙값 약 10초</b> <span className="mk-demo-stat-note">(실 사용 채팅 로그 기준)</span>
            </div>
            <div className="mk-demo-backup">
              <i className="fa-solid fa-circle-info"></i> 네트워크 문제 대비 백업 영상 준비됨
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 07: 비개발 페르소나 — 고객 응대팀 */}
      <section className={`slide ${currentSlide === 6 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-headset"></i>
            <div className="slide-title">개발팀만이 아닙니다</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Non-Dev Persona</div>
          </div>
        </div>
        <div className="slide-body">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="mk-persona">
              <i className="fa-solid fa-user-headset"></i>
              고객 응대팀 담당자의 아침 — 코드 한 줄 안 보지만, 똑같이 반복
            </div>
            <div className="mk-timeline">
              {[
                { t: '매일 9:00', icon: 'fa-inbox', label: '문의 메일·폼 확인' },
                { t: '9:15', icon: 'fa-tags', label: '문의 유형 분류' },
                { t: '9:30', icon: 'fa-pen', label: '답변 초안 작성' },
                { t: '9:45', icon: 'fa-user-check', label: '담당자 배정' },
                { t: '10:00', icon: 'fa-paper-plane', label: '회신·기록' },
              ].map((s, i, arr) => (
                <React.Fragment key={s.t}>
                  <div className="mk-timeline-step">
                    <div className="mk-timeline-time">{s.t}</div>
                    <div className="mk-timeline-icon"><i className={`fa-solid ${s.icon}`}></i></div>
                    <div className="mk-timeline-label">{s.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="mk-timeline-arrow"><i className="fa-solid fa-chevron-right"></i></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mk-loop-badge">
              <i className="fa-solid fa-wand-magic-sparkles"></i> 같은 IEUM 엔진이 분류→초안→배정→회신을 무인 처리 — 사람은 검토·발송만
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 08: 로드맵 정리 */}
      <section className={`slide ${currentSlide === 7 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-road"></i>
            <div className="slide-title">다음 단계</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Roadmap</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="card-grid grid-3" style={{ maxWidth: '94%' }}>
            <div className="card">
              <div className="mk-rm-status done"><i className="fa-solid fa-check"></i> 완료</div>
              <div className="card-icon"><i className="fa-solid fa-tower-broadcast"></i></div>
              <div className="card-title">실시간 SSE · 병렬 실행 엔진</div>
              <div className="card-desc">설계·실행 상태를 노드별로 실시간 전송, 독립 노드는 동시 실행. 최근 구현 완료.</div>
            </div>
            <div className="card">
              <div className="mk-rm-status wip"><i className="fa-solid fa-hammer"></i> 개발 중</div>
              <div className="card-icon"><i className="fa-solid fa-server"></i></div>
              <div className="card-title">자체 호스팅 LLM 폴백</div>
              <div className="card-desc">BYOK 키가 없는 사용자도 바로 쓰도록 자체 LLM 라우팅. Bedrock 미지원 등 환경 제약 대비.</div>
            </div>
            <div className="card">
              <div className="mk-rm-status plan"><i className="fa-solid fa-calendar-check"></i> 예정</div>
              <div className="card-icon"><i className="fa-solid fa-plug-circle-plus"></i></div>
              <div className="card-title">사내 도구 MCP 연동</div>
              <div className="card-desc">고객사 그룹웨어·사내 메신저 같은 내부 도구도 MCP 표준으로 연결. 환경에 맞춰 계속 확장.</div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 08: 차별점 3 */}
      <section className={`slide ${currentSlide === 8 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-star"></i>
            <div className="slide-title">우리만의 3가지</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Differentiators</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="card-grid grid-3">
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-key"></i></div>
              <div className="card-title">BYOK — 내 키, 내 비용</div>
              <div className="card-desc">AI 비용은 내 계정으로. 키는 암호화돼 우리도 못 봅니다. <b>특정 벤더에 묶이지 않습니다.</b></div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-brain"></i></div>
              <div className="card-title">AI 자율 추론</div>
              <div className="card-desc"><b>Zapier는 정해진 트리거-액션만.</b> IEUM은 상황을 보고 필요한 도구를 스스로 골라 씁니다 (ReAct).</div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-puzzle-piece"></i></div>
              <div className="card-title">MCP 개방 생태계</div>
              <div className="card-desc"><b>ChatGPT는 매번 복붙.</b> IEUM은 표준(MCP)으로 원하는 도구를 직접 연결·실행합니다.</div>
            </div>
          </div>
          <div className="mk-trust">
            <i className="fa-solid fa-shield-halved"></i>
            <span><b>보안</b> — BYOK 키 <b>AES-256 암호화</b> 저장 · 실행 결과 <b>민감정보 자동 마스킹</b>. B2B/B2G 도입 기준 충족.</span>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 08: ★ 1주일의 진화 */}
      <section className={`slide ${currentSlide === 9 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-rocket"></i>
            <div className="slide-title">그 이후, 17일간</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">17 Days Progress</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-evo">
            <div className="mk-evo-head">
              <span className="mk-evo-date">6/2</span>
              <i className="fa-solid fa-arrow-right-long"></i>
              <span>같은 학생들이 봤던 그 프로젝트, 17일 만에 이만큼</span>
              <i className="fa-solid fa-arrow-right-long"></i>
              <span className="mk-evo-date now">6/19</span>
            </div>
            <div className="mk-evo-grid">
              <div className="mk-evo-card">
                <div className="evo-icon"><i className="fa-solid fa-tower-broadcast"></i></div>
                <div className="evo-title">실시간 SSE 스트리밍</div>
                <div className="evo-desc">설계 진행·실행 상태를 노드별로 실시간 전송. AI가 일하는 과정이 눈앞에서 흐릅니다.</div>
                <div className="evo-tag done"><i className="fa-solid fa-check"></i> 로드맵 '차기 계획' → 이미 완료</div>
              </div>
              <div className="mk-evo-card">
                <div className="evo-icon"><i className="fa-solid fa-diagram-project"></i></div>
                <div className="evo-title">병렬 실행 엔진</div>
                <div className="evo-desc">단일 경로 순회 → 위상 스케줄러 기반 fan-out/fan-in. 여러 작업을 동시에 처리.</div>
                <div className="evo-tag done"><i className="fa-solid fa-check"></i> 신규 구현</div>
              </div>
              <div className="mk-evo-card">
                <div className="evo-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="evo-title">AI 정확도 강화</div>
                <div className="evo-desc">도구 할당을 결정론적으로 강제 + 환각 출력 게이트. AI가 엉뚱한 도구를 고르지 않도록.</div>
                <div className="evo-tag done"><i className="fa-solid fa-check"></i> 신뢰성 개선</div>
              </div>
              <div className="mk-evo-card">
                <div className="evo-icon"><i className="fa-solid fa-plug-circle-plus"></i></div>
                <div className="evo-title">도구 확장</div>
                <div className="evo-desc">Notion DB 조회, 캘린더 수정, 시트 행 추가 등 신규 도구 + 노드 템플릿 체계화.</div>
                <div className="evo-tag done"><i className="fa-solid fa-check"></i> 연동 확대</div>
              </div>
            </div>
            <div className="mk-evo-foot">
              데모가 컨셉이 아니라 <b>지금 돌아갑니다.</b> 저희는 발표 사이에도 계속 만들고 있습니다.
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 09: 누가 쓰나 */}
      <section className={`slide ${currentSlide === 10 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-building-user"></i>
            <div className="slide-title">누가 쓰나</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Use Cases</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="highlight-box" style={{ maxWidth: '90%' }}>
            <div className="highlight-text" style={{ fontSize: '2.1rem' }}>
              백오피스에 <span style={{ color: '#007ba7' }}>반복 업무가 있는 모든 팀</span>이 고객입니다.
            </div>
            <div className="tag-container" style={{ justifyContent: 'center' }}>
              <div className="tag-item">고객 VOC 실시간 분류·회신</div>
              <div className="tag-item">산업동향 자동 요약 메일링</div>
              <div className="tag-item">사내 문서 사전 검토</div>
              <div className="tag-item">GitHub 이슈 자동 분류·배정</div>
              <div className="tag-item">공공 민원 라우팅 처리</div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 10: Before / After */}
      <section className={`slide ${currentSlide === 11 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
            <div className="slide-title">달라지는 것</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Before / After</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-ba">
            <div className="mk-ba-col before">
              <div className="mk-ba-tag">BEFORE</div>
              <div className="mk-ba-headline">사람이 매번 직접</div>
              <ul className="mk-ba-list">
                <li><i className="fa-solid fa-xmark"></i> 매주 수집·판단·실행을 손으로 반복</li>
                <li><i className="fa-solid fa-xmark"></i> 도구 사이를 사람이 복붙으로 연결</li>
                <li><i className="fa-solid fa-xmark"></i> 빠뜨리거나 늦어지는 실수 발생</li>
              </ul>
            </div>
            <div className="mk-ba-mid"><i className="fa-solid fa-arrow-right-long"></i></div>
            <div className="mk-ba-col after">
              <div className="mk-ba-tag">AFTER</div>
              <div className="mk-ba-headline">한 번 설계 → 트리거가 알아서</div>
              <ul className="mk-ba-list">
                <li><i className="fa-solid fa-check"></i> Manual · Webhook · Schedule 자동 실행</li>
                <li><i className="fa-solid fa-check"></i> AI가 도구를 직접 연결·판단</li>
                <li><i className="fa-solid fa-check"></i> 실시간 로그로 실행을 추적</li>
              </ul>
            </div>
            <div className="mk-ba-punch">
              노동을 줄이는 게 아니라, <span style={{ color: '#007ba7' }}>반복 자체를 없앱니다.</span>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 11: ROI — 속도·비용·구조 */}
      <section className={`slide ${currentSlide === 12 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-gauge-high"></i>
            <div className="slide-title">그래서, 얼마나</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">ROI</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="mk-roi">
            <div className="mk-roi-top">
              <div className="mk-roi-card speed">
                <div className="mk-roi-label"><i className="fa-solid fa-bolt"></i> 실행 속도</div>
                <div className="mk-roi-big">33<span className="unit">초</span></div>
                <div className="mk-roi-desc">
                  5단계 PR 자동화(수집→요약→기록→공유)를<br />
                  <b>사람 개입 0</b>으로 평균 33초에 완주
                </div>
                <div className="mk-roi-chip">
                  <i className="fa-solid fa-microchip"></i> 엔진 오버헤드 <b>0.1초 미만</b> — 총 시간의 99%는 AI 추론
                </div>
              </div>
              <div className="mk-roi-card cost">
                <div className="mk-roi-label"><i className="fa-solid fa-wallet"></i> 내 이용 비용</div>
                <div className="mk-roi-big"><span className="approx">≈</span>600<span className="unit">원<span className="sub">1회 실행</span></span></div>
                <div className="mk-roi-desc">
                  <b>BYOK</b>로 내 AI 키에 쓴 만큼만 결제.<br />
                  매주 자동화 1건이면 <b>월 약 2,500원</b>
                </div>
                <div className="mk-roi-cache">
                  <i className="fa-solid fa-bolt-lightning"></i> 프롬프트 캐싱 적용 시 <b>≈300원/회</b> (월 약 1,200원) — 약 <b>50% 절감</b>
                </div>
                <div className="mk-roi-chip">
                  <i className="fa-solid fa-mug-hot"></i> 사람 <b>월 2시간</b> 반복 노동을 <b>월 커피 한 잔 값</b>으로 대체
                </div>
              </div>
            </div>
            <div className="mk-roi-bar">
              <span className="mk-roi-bar-strong">한 번 설계</span>
              <i className="fa-solid fa-arrow-right-long"></i>
              <span>트리거가 무인 반복</span>
              <i className="fa-solid fa-arrow-right-long"></i>
              <span className="mk-roi-bar-strong">추가 노동 0 · 비용은 커피값</span>
            </div>
            <div className="mk-roi-foot">
              <i className="fa-solid fa-circle-info"></i> 실측 토큰 · Gemini 3.5 Flash($1.50/$9.00, 캐시 $0.15 per 1M) · 환율 1,400원 · 캐시 적중 70% 가정
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 12: 팀 */}
      <section className={`slide ${currentSlide === 13 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-users"></i>
            <div className="slide-title">만든 사람들</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Team</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="team-page-container">
            <div className="team-page-title">기획부터 인프라까지, 직접 다 만들었습니다</div>
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
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 13: Closing + CTA */}
      <section className={`slide slide-cover closing-slide ${currentSlide === 14 ? 'active' : ''}`}>
        <div className="cover-content">
          <div className="mk-cta">
            <div className="mk-cta-headline">
              방금 보신 건 시제품이 아니라,<br /><span className="hl">지금 접속되는 서비스</span>입니다.
            </div>
            <a className="mk-cta-url" href="https://green.kiacms.co.kr" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
              green.kiacms.co.kr
            </a>
            <div className="mk-cta-hint">한번 직접 써보세요. — 감사합니다.</div>
          </div>
        </div>
      </section>

      {/* ===== Appendix (질문 대응용, 본편에서 분리) ===== */}

      {/* A1: 백엔드 아키텍처 */}
      <section className={`slide ${currentSlide === 15 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-server"></i>
            <div className="slide-title">[Appendix] 백엔드 구성도</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Architecture</div>
          </div>
        </div>
        <div className="slide-body" style={{ flexDirection: 'row', gap: '20px', alignItems: 'stretch' }}>
          <div className="diagram-container" style={{ flex: 1.2 }}>
            <MermaidChart chartCode={`
            flowchart LR
                FE["Frontend"] --> API["Spring Boot API"]
                API --> AUTH["Auth / JWT"]
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
          </div>
          <div className="card" style={{ flex: 0.8, justifyContent: 'center', padding: '25px' }}>
            <div className="card-title" style={{ fontSize: '1.7rem' }}>
              <i className="fa-solid fa-database" style={{ color: '#007ba7' }}></i> 데이터 계층
            </div>
            <div className="card-desc" style={{ fontSize: '1.15rem', lineHeight: 1.75 }}>
              <ul style={{ marginLeft: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li>Spring Boot 비즈니스 레이어</li>
                <li>정형 데이터 — PostgreSQL</li>
                <li>실행 로그 등 비정형 — MongoDB</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* A2: 실행 시퀀스 */}
      <section className={`slide ${currentSlide === 16 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-shuffle"></i>
            <div className="slide-title">[Appendix] 워크플로우 실행 흐름</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Sequence</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="diagram-container">
            <MermaidChart chartCode={`
            sequenceDiagram
                participant User
                participant Frontend
                participant Backend
                participant Runtime
                participant Pub as EventPublisher
                participant Agent
                participant DB
                User->>Frontend: 워크플로우 실행 요청
                Frontend->>Backend: POST /api/v1/workflows/{id}/execute
                Backend->>DB: 실행 레코드 PENDING 생성
                Backend->>Runtime: 비동기 실행 시작
                Backend-->>Frontend: executionId 반환
                Frontend->>Backend: GET .../executions/{eid}/events 구독 (SSE)
                Backend->>Pub: subscribe(executionId)
                Runtime->>DB: RUNNING 전환 · nodes/edges 로드
                loop 노드별 (TRIGGER→순차/병렬)
                    Runtime->>Agent: AI 노드 실행 요청
                    Agent-->>Runtime: AI 실행 결과 반환
                    Runtime->>Pub: 노드 진행 이벤트 publish
                    Pub-->>Frontend: SSE 이벤트 전송
                end
                Runtime->>DB: 실행 상태 SUCCESS/FAILED 저장
                Runtime->>Pub: 완료 이벤트 publish
                Pub-->>Frontend: 완료 SSE 전송
            `} />
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* A3: AI 에이전트 내부 */}
      <section className={`slide ${currentSlide === 17 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-brain"></i>
            <div className="slide-title">[Appendix] AI 에이전트 처리</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">AI Agent</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="split-diagram-wrapper">
            <div className="split-tabs">
              <button className={`tab-btn ${agentTab === 'agent-p1' ? 'active' : ''}`} onClick={() => setAgentTab('agent-p1')}>
                <i className="fa-solid fa-arrow-down-short-wide"></i> 1부: 요청 수집
              </button>
              <button className={`tab-btn ${agentTab === 'agent-p2' ? 'active' : ''}`} onClick={() => setAgentTab('agent-p2')}>
                <i className="fa-solid fa-diagram-project"></i> 2부: 추론 및 결과
              </button>
            </div>
            {agentTab === 'agent-p1' && (
              <div className="split-content">
                <div className="diagram-container" style={{ padding: 0 }}>
                  <MermaidChart chartCode={`
                  flowchart TD
                      U["사용자 자연어 요청"] --> FE["Frontend AI Assistant"]
                      FE --> BE["Backend Chat/Workflow API"]
                      BE --> CRED["Credential Service BYOK 복호화"]
                      BE --> CTX["Workflow Context 구성"]
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
                      AG["AI Agent Server"] --> GUARD["Execution Guard"]
                      GUARD --> MODE{"Agent Type"}
                      MODE -->|simple| SIMPLE["Simple Agent"]
                      MODE -->|react| REACT["ReAct Agent"]
                      REACT --> TOOLS["Tools: Web, Notion MCP·HTTP,<br/>Google, GitHub, Slack"]
                      SIMPLE --> MF["Model Factory<br/>role·키 기반 라우팅"]
                      TOOLS --> MF
                      MF --> LLM["Claude Sonnet 4.6 / GPT-4o /<br/>Gemini 3.5 Flash"]
                      MF -.->|키 없는 ADMIN·TESTER| SELF["자체 호스팅 LLM<br/>준비 중"]
                      LLM --> MASK["민감정보 마스킹"]
                      SELF --> MASK
                      MASK --> BE["Backend 반환"]
                      style AG fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px;
                      style REACT fill:#fff7ed,stroke:#ea580c,stroke-width:2px;
                      style MF fill:#eff6ff,stroke:#2563eb,stroke-width:2px;
                      style LLM fill:#f0fdf4,stroke:#16a34a,stroke-width:2px;
                      style SELF fill:#f8fafc,stroke:#94a3b8,stroke-width:2px,stroke-dasharray:4 3;
                  `} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* A4: 인프라 */}
      <section className={`slide ${currentSlide === 18 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-network-wired"></i>
            <div className="slide-title">[Appendix] 배포 · 인프라</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Infra</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="diagram-container">
            <MermaidChart chartCode={`
            flowchart LR
                USER["User"] --> HTTPS["HTTPS"]
                HTTPS --> NGINX["NGINX + WAF"]
                NGINX --> FE["Frontend"]
                NGINX --> BE["Backend :8080"]
                BE --> REDIS["Redis"]
                BE --> PG["PostgreSQL"]
                BE --> AGENT["AI Agent :8000"]
                BE --> MONGO["MongoDB"]
                AGENT --> NMCP["Notion MCP Gateway<br/>(HTTP · Bearer)"]
                GHA["GitHub Actions"] --> FE
                GHA --> BE
                GHA --> AGENT
                GHA --> NMCP
                style NMCP fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px;
            `} />
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* A5: 전체 유저 플로우 */}
      <section className={`slide ${currentSlide === 19 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-route"></i>
            <div className="slide-title">[Appendix] 전체 유저 플로우</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">User Flow</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="split-diagram-wrapper">
            <div className="split-tabs">
              <button className={`tab-btn ${flowTab === 'flow-p1' ? 'active' : ''}`} onClick={() => setFlowTab('flow-p1')}>
                1부: 인입 및 설정
              </button>
              <button className={`tab-btn ${flowTab === 'flow-p2' ? 'active' : ''}`} onClick={() => setFlowTab('flow-p2')}>
                2부: 실행 및 피드백
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
                      D --> E["대시보드"]
                      E --> F["AI Key 등록 (BYOK)"]
                      F --> G["외부 서비스 연동"]
                      G --> H["워크플로우 캔버스"]
                      H --> I["AI Assistant 자연어 설계"]
                      style H fill:#ecfdf5,stroke:#16a34a,stroke-width:3px;
                      style I fill:#f5f3ff,stroke:#7c3aed,stroke-width:3px;
                  `} />
                </div>
              </div>
            )}
            {flowTab === 'flow-p2' && (
              <div className="split-content">
                <div className="diagram-container" style={{ padding: 0 }}>
                  <MermaidChart chartCode={`
                  flowchart LR
                      J["자연어 편집"] --> K["저장 및 활성화"]
                      K --> L{"실행 트리거"}
                      L --> T1["Manual"]
                      L --> T2["Webhook"]
                      L --> T3["Schedule"]
                      T1 --> P["실시간 로그 확인"]
                      T2 --> P
                      T3 --> P
                      P --> Q["피드백 기반 재편집"]
                      Q --> J
                      style J fill:#f5f3ff,stroke:#7c3aed,stroke-width:3px;
                      style P fill:#f3fbff,stroke:#007ba7,stroke-width:2px;
                  `} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* A6: 최근 추가 백엔드 기능 (질문 대응용) */}
      <section className={`slide ${currentSlide === 20 ? 'active' : ''}`}>
        <div className="slide-header">
          <div className="slide-title-area">
            <i className="fa-solid fa-layer-group"></i>
            <div className="slide-title">[Appendix] 최근 추가 기능 (6/11~6/19)</div>
          </div>
          <div className="slide-header-right">
            <div className="header-team-info">화이트기업 | 이음</div>
            <div className="slide-meta">Recent</div>
          </div>
        </div>
        <div className="slide-body">
          <div className="card-grid grid-2" style={{ maxWidth: '94%' }}>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-database"></i></div>
              <div className="card-title">동시 실행 안정화 (BE)</div>
              <div className="card-desc">
                워크플로우 병렬 실행 시 DB 커넥션 풀 고갈을 완화. 고정 크기 풀과
                워크플로우 스레드풀(core=max)을 정합시켜 동시 부하에서도 안정 동작.
              </div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-microchip"></i></div>
              <div className="card-title">기본 모델 최신화 (AI)</div>
              <div className="card-desc">
                기본 LLM을 Gemini 3.5 Flash · Claude Sonnet 4.6으로 상향, 구형 모델은 자동 승격.
                은퇴된 구버전 호출 실패를 사전 차단.
              </div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-plug"></i></div>
              <div className="card-title">MCP 게이트웨이 HTTP 전환 (AI·Infra)</div>
              <div className="card-desc">
                Notion MCP를 stdio→HTTP로 전환하고 인증 토큰을 적용. 컨테이너 간 표준 연결로
                외부 도구 확장의 기반을 정비.
              </div>
            </div>
            <div className="card">
              <div className="card-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <div className="card-title">생성·실행 애니메이션 + SSE 안정화 (FE)</div>
              <div className="card-desc">
                노드 등장·실행 상태를 애니메이션으로 시각화하고, SSE 정상 종료·구독 로직을
                API 계층으로 분리해 실시간 표시를 견고화.
              </div>
            </div>
          </div>
        </div>
        <div className="slide-footer">
          <span className="project-info"><span className="ieum-inline-wordmark ieum-footer-wordmark">IEUM</span> 플랫폼</span>
        </div>
      </section>

      {/* 공통 파도 애니메이션 */}
      <div className="global-waves-container" id="global-waves" aria-hidden="true">
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

      {/* 컨트롤바 */}
      <div className="controls" aria-label="슬라이드 네비게이션">
        <button className="control-btn" onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))} title="이전 (←)">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="progress-indicator">
          {isAppendix
            ? `APX ${currentSlide - MAIN_SLIDES + 1} / ${TOTAL_SLIDES - MAIN_SLIDES}`
            : `${currentSlide + 1} / ${MAIN_SLIDES}`}
        </div>
        <button className="control-btn" onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1))} title="다음 (→ / Space)">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
