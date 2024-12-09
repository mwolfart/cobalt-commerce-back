api-install:
	npm install

api-run:
	npm run start

docker-up-api:
	docker-compose up -d cobalt-api

docker-up-rebuild-api:
	docker-compose up -d cobalt-api --build --force-recreate

docker-down-api:
	docker-compose down cobalt-api