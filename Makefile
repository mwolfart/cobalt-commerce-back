install:
	npm install

build:
	npm run build

run:
	npm run start

watch:
	npm run dev

docker-up-api:
	docker-compose up -d cobalt-api

docker-up-rebuild-api:
	docker-compose up -d cobalt-api --build --force-recreate

docker-down-api:
	docker-compose down cobalt-api