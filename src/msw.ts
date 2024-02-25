import { HttpResponse, http } from 'msw'


let page = '';

export const handlers = [
  // Intercept the "GET /resource" request.
  http.post('/page', async ({request}) => {
    const userRequest = await request.text();
    page = userRequest;
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return new HttpResponse(null);
  }),

  http.get('/page', async () => {
    return HttpResponse.text(page);
  }),
]
