import { getJSONLanguageForApplications } from './index.js'
;(async () => {
  const module = await getJSONLanguageForApplications('fr', 'politique-laem', 'web')
  console.log(module.ACTION.CALL_TO_ACTION.CONFIRM_CLOSE.CANCEL_TEXT)
})()
