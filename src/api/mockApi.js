export const generateDocument = async (apiKey, files, description) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!apiKey) {
                reject(new Error("API Key is missing"));
                return;
            }

            console.log("Processing files:", files);

            // Mock response: Return a placeholder image URL
            // Using a random unsplash image to simulate a generated document/image
            const response = "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

            resolve(response);
        }, 3000); // 3 second delay to simulate heavier processing
    });
};
