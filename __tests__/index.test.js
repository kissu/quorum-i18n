var func = require("../dist/index.js");

async function test() {
  const module = await func.getJSONLanguageForApplications(
    "en-GB",
    "politique-larem",
    "web"
  );
  console.log(module.content);
}
test();
