const execa = require('execa')
const path = require('path')

async function main(){
  const {stdout} = await execa('ls', ['-a'], {cwd: path.join(__dirname, '..', 'node_modules')});
  console.log(stdout);
}
main()