# Clean out the dist folder.
rm -r dist

# Compile to UMD.
babel source/index.js --out-file dist/index.umd.js

# Copy the ES2015 module into the dist folder.
cp source/index.js dist/index.module.js