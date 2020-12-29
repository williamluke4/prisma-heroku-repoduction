const execa = require('execa')
const path = require('path')

async function main(){
  const {stdout} = await execa('ls', ['-a'], {cwd: path.join(__dirname, '..', 'node_modules')});
  console.log({node_modules: stdout});
  const data = await execa('ls', ['-a'], {cwd: path.join(__dirname, '..', 'node_modules', '.prisma', 'client')});
  console.log({".prisma/client":data.stdout});
  const indexJS = await execa('cat', ['./index.js'], {cwd: path.join(__dirname, '..', 'node_modules', '.prisma', 'client')});
  console.log({"index.js":indexJS.stdout});
  console.log({env: process.env});
}
main()