.PHONY: test lint run_example run_test_input run_submit

test:
	deno test --config ./deno.json --importmap import_map.json

lint:
	deno fmt --check
	deno lint

run_example:
	deno run --config ./deno.json --importmap import_map.json --allow-read src/bin.ts test/exampleInput.txt

run_test_input:
	deno run --config ./deno.json --importmap import_map.json --allow-read src/bin.ts test/testInput.txt > testOutput.txt

run_submit:
	deno run --config ./deno.json --importmap import_map.json --allow-read src/bin.ts test/submitInput.txt > submitOutput.txt

clean:
	rm *.txt
