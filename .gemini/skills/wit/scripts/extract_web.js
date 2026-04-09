const fs = require('fs');
const path = require('path');

async function extractContent(url, outputPath) {
    console.log(`Fetching content from: ${url}`);
    
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const htmlContent = await response.text();
        
        const data = `Source URL: ${url}\n--- CONTENT START ---\n${htmlContent}\n--- CONTENT END ---`;
        
        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, data, 'utf8');
        console.log(`Content successfully saved to: ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error fetching content: ${error.message}`);
        return false;
    }
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Usage: node scripts/extract_web.js <url> <output_path>");
    process.exit(1);
}

const url = args[0];
const outputPath = args[1];

extractContent(url, outputPath).then(success => {
    if (!success) process.exit(1);
});
