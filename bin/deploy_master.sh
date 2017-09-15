#!/usr/bin/env sh

# Run this script to deploy the app to Github Pages.

# Exit if any subcommand fails.
set -e

echo "Started deploying to master"

# Checkout master branch.
if [ `git branch | grep master` ]
then
  git branch -D master
fi
git checkout -b master

# Build site.
yarn install --modules-folder ./_assets/yarn
bundle exec jekyll build

# Delete and move files.
find . -maxdepth 1 ! -name '_site' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv _site/* .
rm -R _site/

# Push to master.
git add -fA
git commit --allow-empty -m "$(git log -1 --pretty=%B) [ci skip]"
git push -f -q git@github-hicnblog:hicnblog/hicnblog.github.io.git origin master

# Move back to previous branch.
git checkout -
yarn install --modules-folder ./_assets/yarn

echo "Deployed to master Successfully!"

exit 0
