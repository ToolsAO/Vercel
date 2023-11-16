import { json } from '@sveltejs/kit'

export async function GET() {
  const test = {
    test: Math.random()
  }

  return json(test)
}