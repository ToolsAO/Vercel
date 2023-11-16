async function fetchText(url) {
    let response = await fetch(url);
    let responseText = await response.text();

    return responseText;
}

export async function load() {
	return {
		number: await fetchText("https://toolsao.vercel.app/api/test")
	};
}
