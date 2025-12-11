import React from 'react';

const DisplaySection = ({ generatedContent, isGenerating, setGeneratedImage, selectedModel }) => {

  // generatedContent is now expected to be a data URI string (the image)

  // Pass explicit image up for saving
  React.useEffect(() => {
    if (generatedContent && typeof generatedContent === 'string' && generatedContent.startsWith('data:')) {
      setGeneratedImage(generatedContent);
    }
  }, [generatedContent, setGeneratedImage]);

  return (
    <div className="display-section fade-in">
      <div className="header">
        <h2>Generated Output</h2>
        {generatedContent && !isGenerating && (
          <button onClick={() => setGeneratedImage(null)} className="reset-btn" title="Clear Output">
            ↺ Reset
          </button>
        )}
      </div>
      <div className="content-area">
        {isGenerating ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p className="pulsing-text">Analzying Document & Generating Image...</p>
            <small>Using {selectedModel || 'Gemini 2.5 Flash Image'}</small>
          </div>
        ) : generatedContent ? (
          <div className="output-wrapper fade-in">
            <img
              src={generatedContent}
              alt="Generated Document"
              className="generated-image-result"
            />
            <div className="status-bar">
              <small>Generated Image via {selectedModel || 'Gemini 2.5'}</small>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <span style={{ fontSize: '3rem', opacity: 0.3 }}>✨</span>
            <p>Generated image will appear here.</p>
          </div>
        )}
      </div>

      <style>{`
        .display-section {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(230, 168, 215, 0.3);
          overflow: hidden;
        }
        .header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .reset-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 4px 8px;
          border-radius: 4px;
          color: #666;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .reset-btn:hover {
          background: #f5f5f5;
          color: #333;
        }
        .pulsing-text {
          animation: pulse 2s infinite;
          margin-bottom: 0.5rem;
        }
        .status-bar {
          margin-top: 1rem;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          color: #888;
          font-size: 0.8rem;
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  );
};

export default DisplaySection;
