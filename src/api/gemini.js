import { GoogleGenAI } from '@google/genai';

// Helper to convert file to base64
const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remove data URL prefix (e.g. "data:image/png;base64,")
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const generateDocument = async (apiKey, files, description, modelName = 'gemini-2.5-flash-image') => {
    if (!apiKey) throw new Error("API Key is required");
    if (!files || files.length === 0) throw new Error("At least one file is required");

    // Initialize new SDK
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const model = modelName;
    const config = {
        responseModalities: ['IMAGE', 'TEXT'], // Request image output
    };

    // Convert files to base64 inline data parts
    const fileParts = await Promise.all(
        files.map(async (file) => {
            const b64 = await fileToBase64(file);
            return {
                inlineData: {
                    data: b64,
                    mimeType: file.type
                }
            };
        })
    );

    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: `Create a new document image based on this description: "${description}". 
                    IMPORTANT INSTRUCTIONS:
                    1. Recreate the visual STYLE/LAYOUT of the example document exactly.
                    2. FILL THE DOCUMENT WITH CONTENT FROM THE USER DESCRIPTION: "${description}".
                    3. If the description doesn't specify every field, INVENT new fictional data (names, dates, numbers) that fits the context.
                    4. Do NOT copy specific values (like names/addresses) from the original example unless explicitly asked.
                    The output must be an IMAGE.`,
                },
                ...fileParts
            ],
        },
    ];

    try {
        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        // Parse response for Image Data
        // SDK response structure might vary slightly in browser vs node, but generally:
        // response.candidates[0].content.parts[0].inlineData

        const candidate = response.candidates?.[0];
        if (!candidate) throw new Error("No candidates returned");

        const parts = candidate.content?.parts || [];

        // Look for inlineData (Image)
        const imagePart = parts.find(p => p.inlineData);

        if (imagePart) {
            const mimeType = imagePart.inlineData.mimeType || 'image/png';
            const data = imagePart.inlineData.data;
            return `data:${mimeType};base64,${data}`;
        }

        // Fallback: search for text if no image
        const textPart = parts.find(p => p.text);
        if (textPart) {
            console.warn("Received text instead of image:", textPart.text);
            throw new Error("Model returned text instead of an image. Try refining the description.");
        }

        throw new Error("No content returned.");

    } catch (error) {
        // Retry logic for 503
        if (error.status === 503 || error.code === 503 || (error.message && error.message.includes('503'))) {
            console.warn("Model overloaded (503), retrying in 3 seconds...");
            await new Promise(r => setTimeout(r, 3000));
            try {
                const retryResponse = await ai.models.generateContent({
                    model,
                    config,
                    contents,
                });

                const candidate = retryResponse.candidates?.[0];
                if (!candidate) throw new Error("No candidates returned on retry");
                const imagePart = candidate.content?.parts?.find(p => p.inlineData);
                if (imagePart) {
                    const mimeType = imagePart.inlineData.mimeType || 'image/png';
                    const data = imagePart.inlineData.data;
                    return `data:${mimeType};base64,${data}`;
                }
            } catch (retryErr) {
                throw new Error("Model still overloaded after retry. Please wait a moment.");
            }
        }

        console.error("Gemini GenAI SDK Error:", error);
        throw error;
    }
};
