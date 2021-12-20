.PHONY: test lint decrypt clean

test:
	echo "No tests"

lint:
	deno fmt --check
	deno lint

decrypt:
	deno run --allow-read src/bin.ts ./test/Invictus.txt > InvictusDecrypted.txt

clean:
	rm *.txt
