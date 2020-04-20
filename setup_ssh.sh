#!/bin/bash
echo 'Setup SSH'
which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
mkdir -p ~/.ssh
chmod 700 ~/.ssh
git config --global user.name TastyCI
git config --global user.email hello@kissu.io
# git remote add origin git@gitlab.com:kissu/test_weblate.git
