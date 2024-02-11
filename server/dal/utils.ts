import * as fs from 'fs';

export function readJsonFromFile(filePath: string): any {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(jsonData);

        return parsedData;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

