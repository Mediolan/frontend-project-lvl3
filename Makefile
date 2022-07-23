develop:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test

lint:
	npx eslint .

link:
	sudo npm link
	
publish:
	npm publish --dry-run

.PHONY: test