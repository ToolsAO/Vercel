import { Endpoint, z, error } from "sveltekit-api";
import { builds } from '$db/builds.js';

export const Query = z.object({
  type: z.enum(["gear", "ship", "all"]).default("all"),
});


export const Output = z.object({
  data: z.array(z.any())
});

export const Error = {
  404: error(404, "Post not found"),
  403: error(403, "Forbidden"),
  422: error(422, "Query type invalid"),
};

/*
{
  "id":"w16GJ0",
  "name":"Test",
  "author":{
    "name":"woody",
    "id":"341138190108852224"
  },
  "description":"Testing",
  "created":"2024-02-12T12:00:00Z",
  "code":"1.0.0.0.0.0'0.0.0.0.0.0'0.0.0.0.0.0'0.0.0.0.0.0'0.0.0.0.0.0",
  "tags":["power","mage"],
  "type":"gear",
  "isPublic":true,
  "version":"1.14.0"
}
*/



export default new Endpoint({ Query, Output, Error }).handle(async (param: z.infer<typeof Query>) => {

  let query = {};

  switch(param.type) {
    case "gear":
      query = {"type":"gear"};
      break;
    case "ship":
      query = {"type":"ship"};
      break;
    default:
      query = {};
  }

  let data: any = await builds.find(query, {projection: {
    _id: 0
  }}).toArray();

  console.log(data[0]["created"])
  

  let toReturn: z.infer<typeof Output> = {
    data: data
  };
  return toReturn;
});