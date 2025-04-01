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
	docker-compose stop cobalt-api && docker-compose rm -f cobalt-api

docker-init-db:
	docker-compose up -d cobalt-db-init --build --force-recreate
	docker-compose stop cobalt-db-init && docker-compose rm -f cobalt-db-init

mikro-orm-debug:
	export DB_HOST=http://localhost:5440; \
	export DB_NAME=cobalt; \
	export DB_USER=cerulean; \
	export DB_PASSWORD=cerulean; \
	npx mikro-orm debug

