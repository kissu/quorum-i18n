#!/bin/bash
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
git push --tags
echo "New tag version created and pushed"
