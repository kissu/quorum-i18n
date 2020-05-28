var func = require('../dist/index.js')

async function test() {
  const module = await func.getJSONLanguageForApplications('fr', 'mediation', 'mobile')
  console.log(module.content)
}
test()
