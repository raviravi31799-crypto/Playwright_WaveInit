import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import { logger } from "./logger";

export interface RegisterExcelData {
    testCaseId?: string;
    description?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    number?: string | number;
    password?: string | number;
    confirmPassword?: string | number;
    expectedError?: string;
}

/**
 * Read data from an Excel file into a JSON array of objects
 * @param relativeOrAbsolutePath Path to the .xlsx file (relative to project root or absolute)
 * @param sheetName Optional sheet name (defaults to first sheet)
 */
export function readExcel<T = any>(relativeOrAbsolutePath: string, sheetName?: string): T[] {
    const resolvedPath = path.isAbsolute(relativeOrAbsolutePath)
        ? relativeOrAbsolutePath
        : path.resolve(process.cwd(), relativeOrAbsolutePath);

    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Excel file not found at path: ${resolvedPath}`);
    }

    const workbook = XLSX.readFile(resolvedPath);
    const targetSheet = sheetName || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];

    if (!worksheet) {
        throw new Error(`Sheet "${targetSheet}" not found in workbook "${resolvedPath}"`);
    }

    const rows = XLSX.utils.sheet_to_json<T>(worksheet, { defval: "" });
    logger.info(`Read ${rows.length} rows from Excel file: ${resolvedPath} (Sheet: ${targetSheet})`);
    return rows;
}

/**
 * Create or overwrite an Excel workbook file with given sheets and data
 */
export function writeExcel(relativeOrAbsolutePath: string, sheetName: string, data: any[]): void {
    const resolvedPath = path.isAbsolute(relativeOrAbsolutePath)
        ? relativeOrAbsolutePath
        : path.resolve(process.cwd(), relativeOrAbsolutePath);

    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, resolvedPath);
    logger.info(`Created Excel file at ${resolvedPath} with sheet "${sheetName}"`);
}
