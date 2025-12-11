import React, { useRef } from 'react';

const InputSection = ({
  files,
  setFiles,
  description,
  setDescription,
  apiKey,
  setApiKey,
  selectedModel,
  setSelectedModel
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="input-section">
      <div className="input-group">
        <label htmlFor="model-select">Select AI Model</label>
        <div className="custom-select-wrapper">
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-input"
          >
            <option value="gemini-3-pro-image-preview">Nano Banana Pro (Gemini 3 Pro) - New</option>
            <option value="gemini-2.5-flash-image">Nano Banana (Gemini 2.5 Flash)</option>
            <option value="imagen-4.0-generate-001">Imagen 4</option>
            <option value="imagen-4.0-ultra-generate-001">Imagen 4 Ultra</option>
            <option value="imagen-4.0-fast-generate-001">Imagen 4 Fast</option>
          </select>
          <div className="model-info-tooltip">
            {selectedModel === 'gemini-3-pro-image-preview' && (
              <p>✨ <strong>Nano Banana Pro</strong>: State-of-the-art image generation and editing. <br />Cost: High ($2.00/img). Knowledge cutoff: Jan 2025.</p>
            )}
            {selectedModel === 'gemini-2.5-flash-image' && (
              <p>⚡ <strong>Nano Banana</strong>: Balanced speed and quality.<br />Cost: Low ($0.30/img). Knowledge cutoff: Jun 2025.</p>
            )}
            {selectedModel.includes('imagen-4.0') && (
              <p>🖼️ <strong>Imagen 4 Family</strong>: Specialized Google image generation models. varying quality/speed tiers.</p>
            )}
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="api-key">Nano Banana Pro API Key</label>
        <input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key..."
          className="text-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="file-upload">Upload Document Examples (Images/PDFs)</label>
        <div
          className="file-upload-area"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden-input"
            accept="image/*,application/pdf,.txt"
            capture="environment"
          />
          <div className="upload-placeholder">
            {files && files.length > 0 ? (
              <div className="file-list fade-in">
                <p><strong>{files.length} file(s) selected:</strong></p>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
                <button
                  className="change-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                >
                  Click (or Tap) to change files
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <span className="icon">📸</span>
                <p>Upload or Take Photo</p>
                <span className="sub-text">PNG, JPG, PDF, TXT</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="description">Detailed Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="text-area"
          rows={4}
        />
      </div>

      <style>{`
        .input-section {
          background: var(--color-white);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(191, 87, 0, 0.1);
        }
        .input-group {
          margin-bottom: 1.5rem;
        }
        .input-group:last-child {
          margin-bottom: 0;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--color-forest-orange);
          font-size: 0.9rem;
        }
        .text-input, .text-area {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-md);
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          background: var(--color-cream-light);
        }
        .text-input:focus, .text-area:focus {
          outline: none;
          border-color: var(--color-forest-orange);
          box-shadow: 0 0 0 3px rgba(191, 87, 0, 0.1);
        }
        .hidden-input {
          display: none;
        }
        .file-upload-area {
          border: 2px dashed #ddd;
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background: var(--color-cream-light);
        }
        .file-upload-area:hover {
          border-color: var(--color-forest-orange);
          background: #fff;
        }
        .upload-prompt .icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .upload-prompt p {
          margin: 0;
          font-weight: 500;
          color: var(--color-text-main);
        }
        .sub-text {
          font-size: 0.8rem;
          color: var(--color-text-light);
        }
        .file-list {
          text-align: left;
        }
        .file-list p {
          margin: 0 0 0.5rem 0;
          color: var(--color-forest-orange);
        }
        .file-list ul {
          margin: 0;
          padding-left: 1.2rem;
          color: var(--color-text-main);
          font-size: 0.9rem;
        }
        .change-text {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: var(--color-text-light);
          text-align: center;
        }
        .model-info-tooltip {
          margin-top: 0.5rem;
          background: #f8f9fa;
          padding: 0.75rem;
          border-left: 3px solid var(--color-forest-orange);
          border-radius: 4px;
          font-size: 0.85rem;
          color: var(--color-text-main);
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .model-info-tooltip p {
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default InputSection;
