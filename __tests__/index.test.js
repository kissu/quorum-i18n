import { getJSONLanguageForApplications } from '../src/index'

describe('Global testing for Web Application & Mobile', () => {
  it('Should return `fr` path if `fr` path provided', async () => {
    const result = await getJSONLanguageForApplications('fr', 'aeaeaeeaeaa', 'web')
    expect(result.path).toEqual('fr')
  })

  it('Should return `en` path if a random string is provided/nothing found', async () => {
    const result = await getJSONLanguageForApplications('zaeaeaeibvnsjome', 'EqzeqdsRez', 'mobile')
    expect(result.path).toEqual('en')
  })

  it('Should fallback to `locale` first, rather than the `localeSpecific`', async () => {
    const result = await getJSONLanguageForApplications('fr', 'ong-vert', 'web')
    expect(result.path).toEqual('fr')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('fr')
  })

  it('Should not have side effects when several locales are toggled', async () => {
    await getJSONLanguageForApplications('en', 'ong-vert', 'web')
    await getJSONLanguageForApplications('fr', 'politique-larem', 'web')
    const result = await getJSONLanguageForApplications('fr', 'politique', 'web')
    expect(result.path).toEqual('fr')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('fr-politique')
  })

  it('Should be able to sanitize even the uggliest localeSpecific', async () => {
    const result = await getJSONLanguageForApplications(
      '  fr niceMoo~long hihi ',
      ' poѡliحملtiqлue__8-4_%&7^^_la五rem-av~ec des_espacЮes-de| mal音ade  ',
      'web'
    )
    expect(result.path).toEqual('fr')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('fr-politique-larem')
  })
})
