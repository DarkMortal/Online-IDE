import fs from 'fs';
import { Execute } from './execute';

type CompileResponse = [
    Record<string, unknown>,
    [string, string]
];

type CompileError = [
    {
        Type?: string;
        Message?: string;
    },
    [string, string]
];

export function compile(
    code: string,
    lang: string,
    inputs: string[],
    jobID: string
): Promise<CompileResponse> {
    return new Promise((resolve, reject) => {
        let ext = '';

        switch (lang.toLowerCase()) {
            case 'c':
                ext = '.c';
                break;

            case 'go':
                ext = '.go';
                break;

            case 'cpp':
                ext = '.cpp';
                break;

            case 'python':
                ext = '.py';
                break;

            case 'javascript':
                ext = '.js';
                break;

            case 'java':
                ext = '.java';
                break;
        }

        try {
            fs.writeFileSync(`./Files/${jobID + ext}`, code);

            //console.log('File created successfully');

            Execute(lang, inputs, jobID)
                .then((res) => resolve([res, [jobID, ext]]))
                .catch((err) => reject([err, [jobID, ext]]));
        } catch (err) {
            reject(err as CompileError);
        }
    });
}

export function Delete(filename: [string, string]): void {
    fs.unlinkSync('./Files/' + filename[0] + filename[1]);

    try {
        if (filename[1] === '.c' || filename[1] === '.cpp') {
            fs.unlinkSync('./Files/' + filename[0]);
        }
    } catch (_err) {
        // do nothing
    }
}