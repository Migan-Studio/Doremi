docker compose stop
docker compose rm -s -f
docker compose build
docker compose up -d
docker compose logs -f