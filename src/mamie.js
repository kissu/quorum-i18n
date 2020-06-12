const nice = require('../dist/index.js')
/* eslint-disable */
;(async () => {
  const module = await nice.getJSONLanguageForApplications(
    'fr too~long hihi ',
    ' poѡliحملtiqлue__8-4_%&7^^_la五rem-av~ec des_espacЮes-de| mal音ade  ',
    'web'
  )
  console.log('module locale + content', module.path, module.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST)
})()
