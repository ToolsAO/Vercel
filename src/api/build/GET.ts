import { Endpoint, z, error } from "sveltekit-api";
import { builds } from '$db/builds.js';

export const Build = z.object({
    id: z.string(),
    name: z.string(),
    author: z.object({
      name:z.string(),
      id:z.string()
    }),
    description: z.string(),
    created: z.string(),
    code: z.string(),
    tags: z.array(z.string()),
    type: z.string(),
    isPublic: z.boolean(),
    version:z.string()
})

export const Query = z.object({
  id: z.string(),
});


export const Output = Build || z.object({});

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

    let query = {"id":param.id};
  
    let data: any = await builds.findOne(query, {projection: {
      _id: 0
    }});

    console.log(data)
    
  
    let toReturn: z.infer<typeof Output> = data;
    return toReturn;
});