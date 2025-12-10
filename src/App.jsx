import React, { useState } from 'react';
import InputSection from './components/InputSection';
import DisplaySection from './components/DisplaySection';
import ControlPanel from './components/ControlPanel';
import { generateDocument } from './api/gemini';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null); // Base64 image
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey) {
      alert("Please enter an API Key");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');
    setGeneratedImage(null);

    try {
      const result = await generateDocument(apiKey, files, description);
      setGeneratedContent(result);
    } catch (error) {
      console.error("Generation failed:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!generatedImage) {
      // If image hasn't generated yet (rare), or if they prefer text
      if (generatedContent) {
        const element = document.createElement("a");
        const file = new Blob([generatedContent], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "generated-doc.md";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return;
      }
      return;
    }

    // Download Captured Image
    const element = document.createElement("a");
    element.href = generatedImage;
    element.download = "generated-document.png";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DocGen Assistant</h1>
        <p className="subtitle">Powered by Nano Banana Pro (Gemini 2.5 Flash Image)</p>
      </header>

      <main className="main-grid">
        <div className="left-panel">
          <InputSection
            files={files}
            setFiles={setFiles}
            description={description}
            setDescription={setDescription}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />

          <ControlPanel
            onGenerate={handleGenerate}
            onSave={handleSave}
            isGenerating={isGenerating}
            canGenerate={apiKey && description && files.length > 0}
          />
        </div>

        <div className="right-panel">
          <DisplaySection
            generatedContent={generatedContent}
            isGenerating={isGenerating}
            setGeneratedImage={setGeneratedImage}
          />
        </div>
      </main>

      <style>{`
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
        }
        .app-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .app-header h1 {
          color: var(--color-forest-orange);
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          margin-top: 0;
        }
        .subtitle {
          color: var(--color-text-light);
          font-size: 1.1rem;
          margin: 0;
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }
        .left-panel, .right-panel {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default App;
