var func = require("../dist/index.js");

async function test() {
  const module = await func.getJSONLanguageForApplications(
    "fr",
    "mediation",
    "web"
  );
  console.log(module.content._COMMON);
}
test();
