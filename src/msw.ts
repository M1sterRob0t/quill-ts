import { HttpResponse, http } from 'msw'


let page = '';
let fileInfo: string | ArrayBuffer | null;

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


  http.post('/form', async ({request}) => {
    const userFormData = await request.formData();
    const file = userFormData.get('file') as File;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function() {
      fileInfo = reader.result;
    };

    reader.onerror = function() {
      console.log(reader.error);
    };

    return new HttpResponse(null);
  }),

  http.get('/form', async () => {
    return HttpResponse.json({
      status: 200,
      data: fileInfo,
    });
  }),
]
