import { exec } from 'child_process';

interface ExecutionError {
    Type: string;
    Message: string;
    Time: number;
}

type ExecutionResult = Record<string, unknown>;

export function Execute(
    lang: string,
    inputs: string[] | undefined,
    jobID: string
): Promise<ExecutionResult> {
    return new Promise((resolve, reject) => {
        const execOptions = {
            cwd: __dirname,
            timeout: 5500,
            killSignal: 'SIGTERM' as const,
            stdio: 'pipe' as const,
            detached: true,
        };

        let command = `python3 Command.py ${lang}`;

        if (inputs && inputs.length > 0) {
            for (let i = 0; i < inputs.length; i++)
                command += ` ${inputs[i]!.toString()}`;
        }

        command += ` ${jobID}`;

        exec(command, execOptions, (err, stdout, stderr) => {
            if (stdout)
                resolve(JSON.parse(stdout));
            
            if (stdout === '') {
                const error: ExecutionError = {
                    Type: 'error',
                    Message: 'No output received from Server',
                    Time: 0.00,
                };

                reject(error);
            }

            if (stderr) {
                console.log(stderr);
            }

            if (err) {
                const error: ExecutionError = {
                    Type: 'error',
                    Message: 'Standard Execution Time Exceeded',
                    Time: 0.00,
                };

                reject(error);
            }
        });
    });
}