#!/bin/bash


# 执行 git pull
echo "执行 git pull..."
git pull

# 执行 yarn
echo "执行 yarn..."
yarn

# 执行 yarn build
echo "执行 yarn build..."
yarn build

echo "执行 pm2 reload nest-app..."
pm2 reload nest-app

echo "脚本执行完毕！"