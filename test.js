import { getJSONLanguageForApplications } from './index.js'
;(async () => {
  const module = await getJSONLanguageForApplications('fr', 'politique-larem', 'web')
  console.log(module.content.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
  console.log('path', module.path)
})()