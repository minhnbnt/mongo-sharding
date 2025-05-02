FROM python:3.13-alpine

WORKDIR /ansible

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY requirements.yml .
RUN ansible-galaxy collection install -r requirements.yml
