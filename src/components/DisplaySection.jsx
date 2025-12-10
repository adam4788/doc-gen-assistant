import React from 'react';

const DisplaySection = ({ generatedContent, isGenerating, setGeneratedImage }) => {

  // generatedContent is now expected to be a data URI string (the image)

  // Pass explicit image up for saving
  React.useEffect(() => {
    if (generatedContent && typeof generatedContent === 'string' && generatedContent.startsWith('data:')) {
      setGeneratedImage(generatedContent);
    }
  }, [generatedContent, setGeneratedImage]);

  return (
    <div className="display-section">
      <div className="header">
        <h2>Generated Output</h2>
      </div>
      <div className="content-area">
        {isGenerating ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Generating Image (Gemini 2.5)...</p>
          </div>
        ) : generatedContent ? (
          <div className="output-wrapper">
            <img
              src={generatedContent}
              alt="Generated Document"
              className="generated-image-result"
            />
            <div className="status-bar">
              <small>Generated Image by Gemini 2.5 Flash Image</small>
            </div>
          </div>
        ) : (
          <div className="empty-state">
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
        }
        .header h2 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--color-text-main);
        }
        .content-area {
          flex: 1;
          overflow-y: auto;
          min-height: 300px;
          background: #f0f2f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .output-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .generated-image-result {
           max-width: 95%;
           max-height: 90%;
           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
           border-radius: 4px;
        }
        .empty-state, .loading-state {
          flex-direction: column;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-light);
          font-style: italic;
          width: 100%;
        }
        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid var(--color-cream);
          border-top: 3px solid var(--color-forest-orange);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        .status-bar {
          margin-top: 1rem;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
          background: rgba(255,255,255,0.8);
          color: #999;
          font-size: 0.8rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DisplaySection;
