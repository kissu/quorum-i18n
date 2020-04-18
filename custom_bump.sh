#!/bin/bash
which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
mkdir -p ~/.ssh
chmod 700 ~/.ssh

git config --global user.name TastyCI
git config --global user.email hello@kissu.io
git remote add origin git@gitlab.com:kissu/test_weblate.git

VERSION=`git tag | sort -V | tail -1 | cut -f2 -d 'v'`
echo "nice: $VERSION"
if [ -z "$VERSION" ]; then
  git tag "v1"
else
  OLD_VERSION_NUMBER=(${VERSION//v/})
  echo "Old tag version number: $OLD_VERSION_NUMBER"
  NEW_VERSION_NUMBER=$(($OLD_VERSION_NUMBER + 1))
  git tag "v$NEW_VERSION_NUMBER"
fi
# git push --tags
git tag v1
git push origin v1
echo "New tag version created and pushed"
