import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with original theme configurations
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: false
  },
  themeVariables: {
    fontFamily: 'Pretendard, sans-serif',
    primaryColor: '#f3fbff',
    primaryTextColor: '#29537c',
    primaryBorderColor: '#007ba7',
    lineColor: '#007ba7',
    secondaryColor: '#e0f6ff',
    tertiaryColor: '#ffffff',
    edgeLabelBackground: '#ffffff'
  }
});

let chartIdCounter = 0;

export default function MermaidChart({ chartCode }) {
  const [svgContent, setSvgContent] = useState('');
  const [error, setError] = useState(null);
  const [chartId] = useState(() => `mermaid-chart-${chartIdCounter++}`);

  useEffect(() => {
    let isMounted = true;
    
    const renderChart = async () => {
      if (!chartCode) return;
      try {
        setError(null);
        const cleanCode = chartCode.trim();
        
        // Render the diagram to svg content
        const { svg } = await mermaid.render(chartId, cleanCode);
        
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        // Clear any bad SVG element if parsing failed
        const badElement = document.getElementById(chartId);
        if (badElement) {
          badElement.remove();
        }
        if (isMounted) {
          setError(err);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chartCode, chartId]);

  if (error) {
    return (
      <div className="mermaid-error" style={{ color: '#ef4444', padding: '15px', fontSize: '0.95rem', fontWeight: 600 }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '6px' }}></i>
        다이어그램 렌더링에 실패했습니다. (Syntax 오류 확인 필요)
      </div>
    );
  }

  return (
    <div 
      className="mermaid" 
      dangerouslySetInnerHTML={{ __html: svgContent || '<div style="color: #64748b;">Rendering diagram...</div>' }} 
    />
  );
}
