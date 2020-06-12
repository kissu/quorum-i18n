import { getJSONLanguageForApplications } from '../src/index'

describe('Global testing for Web Application & Mobile', () => {
  // it('Should return english path for a random strings provided', async () => {
  //   const result = await getJSONLanguageForApplications('zaeaeaeibvnsjome', 'EqzeqdsRez', 'mobile')
  //   expect(result.path).toEqual('en')
  // })
  // it('Should return a crash if the strings contains spaces', async () => {
  //   await expect(getJSONLanguageForApplications('aeaeeae eee', 'xRecezZaex ZXe', 'mobile')).rejects.toThrow()
  // })
  // it('Should return fr path if I provide an fr path', async () => {
  //   const result = await getJSONLanguageForApplications('fr', 'aeaeaeeaeaa', 'web')
  //   expect(result.path).toEqual('fr')
  // })
  // it('Should return en path if I provide an FR path', async () => {
  //   const result = await getJSONLanguageForApplications('FR', 'aeaeaeeaeaa', 'web')
  //   expect(result.path).toEqual('en')
  // })
  // it('Should return en path if I provide an FR path', async () => {
  //   const result = await getJSONLanguageForApplications('FR', 'aeaeaeeaeaa', 'web')
  //   expect(result.path).toEqual('en')
  // })
  it('I should fail on purpose', async () => {
    expect(1).toEqual(3)
  })
})
