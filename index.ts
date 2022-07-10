import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { ServerConfig } from './src/infrastructure/server/server.config'

dotenvExpand.expand(dotenv.config())

const server = new ServerConfig()
server.start()

// const args = process.argv.slice(2);

// if (args.includes('--start:client')) {
//   import('child_process').then(({ spawn }) => {
//     const reactApp = spawn('npm', ['run', 'start:client'], {
//       cwd: './',
//       stdio: 'inherit',
//       shell: true,
//     });

//     reactApp.on('close', (code) => {
//       console.log(`React App exited with code ${code}`);
//       process.exit(code ? 1 : 0);
//     });
//   });
// }
