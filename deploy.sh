docker build -t ${HEROKU_APP}:latest .
docker login --username=_ --password=${AUTH_TOKEN} registry.heroku.com

docker tag steam-friends-app:latest registry.heroku.com/${HEROKU_APP}/web
docker push registry.heroku.com/${HEROKU_APP}/web

DOCKER_IMAGE_ID=$(docker inspect registry.heroku.com/${HEROKU_APP}/web --format={{.Id}})

curl -n -X PATCH https://api.heroku.com/apps/${HEROKU_APP}/formation \
  -d '{
  "updates": [
    {
      "type": "web",
      "docker_image": "'"$DOCKER_IMAGE_ID"'"
    }
  ]
  }' \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
  -H "Authorization: Bearer $AUTH_TOKEN"