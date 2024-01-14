/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

// Reports back code coverage.
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const minimumLinesCoveredPercent = 75; // CHANGE ME to the minimum acceptable percentage of lines covered.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const json = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../coverage/coverage-summary.json'),
    ),
  );

  console.log('Coverage Summary: ');
  console.log(json.total);

  if (json.total.lines.pct < minimumLinesCoveredPercent) {
    console.log('******************\n');
    console.log(
      `Minimum coverage of ${minimumLinesCoveredPercent}% of lines covered was not met.`,
    );
    console.log('\n******************');
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
} catch (e) {
  console.log('******************\n');
  console.log('Cannot get test coverage report');
  console.log('\n******************');
  process.exitCode = 1;
}
