import { spawn } from 'child_process';
import { delimiter, join } from 'path';

type rosterCliError = {
  code: string;
  message: string;
  hint?: string;
};

export type rosterCliResult =
  | { ok: true; data: unknown }
  | { ok: false; error: rosterCliError };

function withoutProjectBinaries(pathValue: string) {
  return pathValue
    .split(delimiter)
    .filter(
      (entry) =>
        entry !== process.env.BERRY_BIN_FOLDER &&
        !entry.endsWith(join('node_modules', '.bin')),
    )
    .join(delimiter);
}

export function runroster(cliArguments: string[]): Promise<rosterCliResult> {
  const executable = process.env.roster_CLI ?? 'roster';

  return new Promise((resolve, reject) => {
    const child = spawn(executable, [...cliArguments, '--json'], {
      env: {
        ...process.env,
        PATH: withoutProjectBinaries(process.env.PATH ?? ''),
      },
      stdio: ['ignore', 'pipe', 'inherit'],
    });
    let stdout = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      stdout += chunk;
    });

    child.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code !== 'ENOENT') {
        reject(error);

        return;
      }

      reject(
        new Error(
          `${executable} was not found. Install the roster CLI globally, or set roster_CLI to its path.`,
        ),
      );
    });

    child.on('close', (exitCode) => {
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(
          new Error(
            `${executable} ${cliArguments.join(' ')} exited with code ${exitCode} without a JSON result. ` +
              'Check that it is the roster CLI (roster --version), or set roster_CLI to its path.',
          ),
        );
      }
    });
  });
}
