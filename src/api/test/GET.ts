import { Endpoint, z, error } from "sveltekit-api";


export const Output = z.object({
  test: z.number(),
});

export const Error = {
  404: error(404, "Post not found"),
  403: error(403, "Forbidden"),
};

export default new Endpoint({ Output, Error }).handle(async () => {
    const test = Math.random();

    let toReturn: z.infer<typeof Output> = {
      test: test,
    };
    return toReturn;
});