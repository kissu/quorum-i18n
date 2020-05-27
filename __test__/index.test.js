import { getJSONLanguageForApplications } from '../dist/index.js'

async function test() {
  const module = await getJSONLanguageForApplications('fr-nice-yolo-cooment-ca-va', 'politique-larem', 'web')
  console.log(module)
}
test()
