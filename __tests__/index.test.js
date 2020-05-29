var func = require('../dist/index.js')

async function test() {
  const module = await func.getJSONLanguageForApplications(
    'en-GB-nice-meme-yolo',
    'ong-vert-fion-fion',
    'web'
  )
  console.log(module.content.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
}
test()
