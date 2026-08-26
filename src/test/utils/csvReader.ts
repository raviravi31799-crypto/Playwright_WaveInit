import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { logger } from "./logger";

export interface ParticipantLoginCsvData {
    testCaseId?: string;
    description?: string;
    email?: string;
    password?: string;
    expectedValidation?: string;
}

/**
 * Read data from a CSV file into a typed array of objects
 * @param relativeOrAbsolutePath Path to the .csv file
 */
export function readCsv<T = any>(relativeOrAbsolutePath: string): T[] {
    const resolvedPath = path.isAbsolute(relativeOrAbsolutePath)
        ? relativeOrAbsolutePath
        : path.resolve(process.cwd(), relativeOrAbsolutePath);

    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`CSV file not found at path: ${resolvedPath}`);
    }

    const fileContent = fs.readFileSync(resolvedPath, "utf-8");
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    }) as T[];

    logger.info(`Read ${records.length} records from CSV file: ${resolvedPath}`);
    return records;
}

export default readCsv;
