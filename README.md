# **Scamazon**
*Created by William Nylund (wnylund@abo.fi)*

## Requirements implemented
- All of them

## Installation guide
clone repository and:
```
cd webshop2021-project-WilliamNylund
```
Create an virtual environment with
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