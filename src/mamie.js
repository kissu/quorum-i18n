const nice = require('../dist/index.js')
;(async () => {
  const module = await nice.getJSONLanguageForApplications('fr-ok', 'mediation-promevil-nice', 'web')
  console.log('module content', module.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST)
  console.log('module path', module.path)
})()
