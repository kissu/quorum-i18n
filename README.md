# This repository is synced with the Quorum Weblate - Quorum team

This repository actually drives the translations for the quorum apps.

## How to translate ?

In the main project, you have two folders. We will be focus on the `./initial-locales/` folder. Then you have two folders : 

- `mobile` : Focus on the translations on the Android/IOS app.
- `web` : Focus on the translations on the WebApp

⚠️ When you will develop the apps, you will modify the files in this *folder only !*

## WebApp

We use vue-i18n on the WebApp. You can configure the plugin i18n-ally to use this repository/folder after you cloned it. So basically, this is the workflow we do to develop on the WebApp.

- git clone this repo
- yarn and install the dependencies
- install `yalc` globally `npm install -g yalc` : Go to yalc github to see how works yalc.
- Then in this repository/folder execute `yalc publish` : It will create a "fake package" in your computer to use it in the other repositories.
- When you go back on the WebApp repo, you can add the package. You have two options : `yalc link quorum-i18n` or `yalc add quorum-i18n`. The difference between yalc link and yalc add, is that `link` will silently link the repo, and `add` will change the package.json with the repo. Sometimes I use add, because link is broken and I can develop. At the end of the dev, I remove the `add` with a classical `yarn add quorum-i18n` to remove the `yalc add` and replace it the `yarn add`.
- Then start two instances : one with `yarn dev` the web app and `yarn dev` this repository.

## So what happened when you dev ? 

You want to edit some strings. So you link this repo to the WebApp and then you change directly the translations on the `./initial-locales/mobile/` or `./initial-locales/web/`. 
When you edit, if you use the `yarn dev` on this repo and you save a file, it will refresh the web app or the mobile, with the new translations. So you edit, it refresh, and you develop. Of course, you edit just the `fr.json` or `en.json` like usual.

When you finished the dev. You can stop the `yarn dev`, commit the changes and push on master. When you push, wait 3/4 minutes. A pipeline is exectuted on github. After that, Weblate is up-to-date and the repo too. You will receive a notification on the quorum slack #weblate. 

After the notification you can add the final version to your project. So on the web app for example, you can use `yarn add quorum-i18n` to lock the project with your new changes pushed on npm/github.