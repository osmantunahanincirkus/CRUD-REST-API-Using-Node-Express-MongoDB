start:
	docker-compose up -d --build --force-recreate expressjs
	docker cp test-test-api:/app/node_modules ./backend/node_modules
	docker cp test-test-api:/app/package-lock.json ./backend/package-lock.json

	docker-compose up -d --build --force-recreate reactjs
	docker cp test-test-front:/app/node_modules ./frontend/node_modules
	docker cp test-test-front:/app/package-lock.json ./frontend/package-lock.json

stop:
	docker-compose down --rmi all -v
	docker system prune -a -f --all
	docker system prune -a -f --volumes
	rm -rf ./backend/node_modules
	rm -rf ./frontend/node_modules

reload:
	docker-compose restart expressjs
	docker-compose restart reactjs

copy:
	rm -rf ./backend/node_modules
	docker cp test-test-api:/app/node_modules ./backend/node_modules
	docker cp test-test-api:/app/package.json ./backend/package.json
	docker cp test-test-api:/app/package-lock.json ./backend/package-lock.json

	rm -rf ./frontend/node_modules
	docker cp test-test-front:/app/node_modules ./frontend/node_modules
	docker cp test-test-front:/app/package.json ./frontend/package.json
	docker cp test-test-front:/app/package-lock.json ./frontend/package-lock.json
