#!/bin/sh

apt install python3 nodejs

cd API

virtualenv -p python3 venv
source venv/bin/activate
pip3 install -r requirements.txt

cd ../Client/nmbs-router

npm i
