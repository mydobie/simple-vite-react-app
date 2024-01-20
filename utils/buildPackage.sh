# This builds the application and gets it ready to be packaged as an NPM package
distFolder=lib #IF this changes ... also change minifyFilesInDir.js and restPackageJson.js

NODE_ENV=production
rm -rf $distFolder
# mkdir $distFolder
npm run build
node utils/resetPackageJson.js
node utils/minifyFilesInDir.js

npm pack ./$distFolder