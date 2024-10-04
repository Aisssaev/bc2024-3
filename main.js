const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'Path to the input file (JSON)')
    .option('-o, --output <path>', 'Path to the output file')
    .option('-d, --display', 'Display result to console')
    .parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);

}

try {
    try {
        const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

        const maxRate = Math.max(...data.map(item => item.rate));

        var result = `Максимальний курс: ${maxRate}`;

    } catch (error) {
        console.error('Error:', error.message);
    }

    if (!options.input) {
        console.error('Please, specify input file');
        process.exit(0);
    }
    if (!options.output && !options.display) {
        process.exit(0);
    }

    if (options.output) {
        fs.writeFileSync(options.output, result, 'utf8');
        console.log(`Result has been written to ${options.output}`);
    }

    if (options.display) {
        console.log(result);
    }

} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
