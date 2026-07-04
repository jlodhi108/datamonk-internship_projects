FROM python:3.9-slim

WORKDIR /app

COPY frontend/ ./

EXPOSE 3000

CMD ["python", "-m", "http.server", "3000", "--bind", "0.0.0.0"]
