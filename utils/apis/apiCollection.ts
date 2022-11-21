import { APIRequestContext } from "@playwright/test";

export class APICollection {

  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  
  // all apis are defined here
  /* CREATE [POST] */
  async create(path: string, payload: JSON) {
    const response = await this.request.post(`${path}`, {
      data: payload,
    });
    console.log(path);
    return response;
  }

  /* RETRIEVE [GET] */
  async retrieve(path: string, params: any) {
    const response = await this.request.get(path, {
      params : params
    });
    console.log(params);
    return response;
  }

  /* MODIFY [PUT] */
  async modify(path: string, payload: JSON) {
    const response = await this.request.put(path, {
      data: payload,
    });
    console.log(path);
    return response;
  }

  /* UPDATE [PATCH] */
  async update(path: string, payload: JSON) {
    const response = await this.request.patch(path, {
      data: payload,
    });
    console.log(path);
    return response;
  }

  /* DELETE [DELETE] */
  async delete(path: string, payload: string) {
    const response = await this.request.delete(path, {
      data: payload,
    });
    console.log(path);
    return response;
  }
}
