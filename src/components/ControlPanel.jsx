import React from 'react';

const ControlPanel = ({ onGenerate, onSave, isGenerating, canGenerate }) => {
    return (
        <div className="control-panel">
            <button
                className="btn btn-save"
                onClick={onSave}
                disabled={isGenerating}
            >
                Save Output
            </button>
            <button
                className="btn btn-generate"
                onClick={onGenerate}
                disabled={isGenerating || !canGenerate}
            >
                {isGenerating ? 'Generating...' : 'Generate New Example'}
            </button>

            <style>{`
        .control-panel {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: all 0.2s;
          font-size: 0.95rem;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-generate {
          background: var(--color-forest-orange);
          color: var(--color-white);
          box-shadow: 0 2px 4px rgba(191, 87, 0, 0.2);
        }
        .btn-generate:not(:disabled):hover {
          background: #a64b00;
          transform: translateY(-1px);
        }
        .btn-save {
          background: var(--color-pink);
          color: #7a2e5d; /* Darker pink for text readability */
        }
        .btn-save:not(:disabled):hover {
          background: #d99acb;
        }
      `}</style>
        </div>
    );
};

export default ControlPanel;
