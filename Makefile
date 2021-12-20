.PHONY: test

test:
	cd challenge-01 && make test
	cd challenge-02 && make test
	cd challenge-03 && make test
	cd challenge-04 && make test
	cd challenge-05 && make test
	cd challenge-06 && make test

lint:
	cd challenge-01 && make lint
	cd challenge-02 && make lint
	cd challenge-03 && make lint
	cd challenge-04 && make lint
	cd challenge-05 && make lint
	cd challenge-06 && make lint
