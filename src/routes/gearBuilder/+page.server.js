export async function load({ fetch, setHeaders }) {
    const url = "https://toolsao.vercel.app/api/test";
	const response = await fetch(url);

	// cache the page for the same length of time
	// as the underlying data
	setHeaders({
		age: response.headers.get('age'),
		'cache-control': response.headers.get('cache-control')
	});

	return response.json();
}
