echo "installing back end dependencies"
cd .\backend\
yarn install
echo "installing web frontend dependencies"
cd ..\web\
yarn install
cd ..\mobile\
echo "installing mobile frontend dependencies"
yarn install
cd ..
echo "how to run:"
echo "$Tabyarn dev in the backend folder"
echo "$Tabyarn start in web and mobile folders"