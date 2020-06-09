const nice = require('../dist/index.js')
;(async () => {
  const module = await nice.getJSONLanguageForApplications('fr-ok', 'mediation-promevil-nice', 'web')
  // console.log(module?.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST)
  console.log('path', module.path)
})()
