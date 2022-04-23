#!/bin/sh

apt install python3 nodejs curl python3-pip

cd API

virtualenv -p python3 venv
. venv/bin/activate
pip3 install -r requirements.txt

cd ../Client/nmbs-router

npm i