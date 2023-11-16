export async function load() {
	return {
		number: await fetch("https://toolsao.vercel.app/api/test").text()
	};
}
