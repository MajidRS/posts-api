import fs from 'fs/promises';
import { AppError } from '../middlewares/errorMiddleware.js';

async function readFileJSON (pathFile) {
    try {
        const data = await fs.readFile(pathFile, 'utf8');
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            throw new AppError(500, 'Data source not available');
        }
        if (error instanceof SyntaxError) {
            throw new AppError(500, 'Data corrupted');
        }
        throw new AppError(500, 'Unable to read data');
    }
}

async function writeFileJSON (pathFile, data) {
    try {
        await fs.writeFile(pathFile, data, 'utf8');
    } catch (error) {
        if (error.code === "ENOENT") {
            throw new AppError(500, 'Data source not available');
        }
        if (error instanceof SyntaxError) {
            throw new AppError(500, 'Data corrupted');
        }
        throw new AppError(500, 'Unable to read data');
    }
}

export {readFileJSON, writeFileJSON}