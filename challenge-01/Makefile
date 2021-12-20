.PHONY: test lint run_example run_test_input run_submit clean

test:
	deno test --importmap import_map.json

lint:
	deno fmt --check
	deno lint

run_example:
	deno run --allow-read src/bin.ts test/exampleInput.txt

run_test_input:
	deno run --allow-read src/bin.ts test/testInput.txt > testOutput.txt

run_submit:
	deno run --allow-read src/bin.ts test/submitInput.txt > submitOutput.txt

clean:
	rm *.txt
