# **Scamazon**

## Description
This is a webshop made with Django Rest Framework and React. This project is made as part of an university course and fulfills the requirement specifications provided.

## Installation guide
clone repository and navigate to root folder:
```
cd Scamazon-Webshop
```
Create an virtual environment
```
python3 -m venv env
```
Activate environment
```
source env/bin/activate
```
Install libraries and packages
```
pip install -r requirements.txt
```
Migrate
```
python webshop-backend/manage.py migrate
```
Build frontend
```
cd webshop-frontend/
```
```
npm install
```
```
npm run build
```
Start server
```
python ../webshop-backend/manage.py runserver
```