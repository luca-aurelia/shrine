# Clean out the dist folder.
rm -r dist

# Compile to UMD.
babel source/Shrine.js --out-file dist/Shrine.umd.js

# Copy the ES2015 module into the dist folder.
cp source/Shrine.js dist/Shrine.module.js