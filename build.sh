echo "Cleaning.."

rm -rf dist
rm -rf app/build

echo "Building app.."

npm run build --prefix app/

mv app/build dist

echo "Done!"