
FROM python:3.11.4


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV AWS_ACCESS_KEY_ID=admin
ENV AWS_SECRET_ACCESS_KEY=admin
ENV AWS_DEFAULT_REGION=us-east-1


WORKDIR /usr/src/app


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY . .


EXPOSE 8080


CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
