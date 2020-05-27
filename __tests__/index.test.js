var func = require('../dist/index.js')

async function test() {
  const module = await func.getJSONLanguageForApplications(
    'fr-nice-yolo-cooment-ca-va',
    'politique-larem',
    'web'
  )
  console.log(module.content.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
}
test()
