include .env.production

.PHONY: up

up:
	docker-compose --env-file .env.production up -d 

.PHONY: down

down:
	docker-compose --env-file .env.production down -v

.PHONY: build

build:
	docker-compose --env-file .env.production build

.PHONY: restart

restart:
	docker-compose --env-file .env.production restart

.PHONY: logs

logs:
	docker-compose --env-file .env.production logs -f
