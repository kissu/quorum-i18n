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
      'web',
    )
    expect(result.path).toEqual('fr')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('fr-politique-larem')
  })

  it("Should return a properly formatted locale if it's more specific (eg: en-GB)", async () => {
    const result = await getJSONLanguageForApplications('en---____----__-___-__GB', null, 'web')
    expect(result.path).toEqual('en_GB')
    expect(result.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en_GB')
  })

  it('Mobile i18n is working properly', async () => {
    const sk = await getJSONLanguageForApplications('sk', null, 'mobile')
    expect(sk.path).toEqual('sk')
    expect(sk.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('sk')
    const frMedProm = await getJSONLanguageForApplications('fr', 'mediation-promevil', 'mobile')
    expect(frMedProm.path).toEqual('fr')
    expect(frMedProm.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('fr-mediation-promevil')
  })

  it('Should return en path and en content if language is xx (like undefined)', async () => {
    const sk = getJSONLanguageForApplications('xx', null, 'web')
    expect(sk.path).toEqual('en')
    expect(sk.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return en path and en content if language is en_RO', async () => {
    const ro = getJSONLanguageForApplications('en-RO', null, 'mobile')
    expect(ro.path).toEqual('en')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return en path and en content if language is empty', async () => {
    const ro = getJSONLanguageForApplications('', null, 'mobile')
    expect(ro.path).toEqual('en')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })

  it('Should return en path and en content if language is null', async () => {
    const ro = getJSONLanguageForApplications(null, null, 'mobile')
    expect(ro.path).toEqual('en')
    expect(ro.content.XXX_DO_NOT_TOUCH_ME_USED_BY_JEST).toEqual('en')
  })
})
