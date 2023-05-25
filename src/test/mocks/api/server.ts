import { setupServer } from 'msw/node';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import handlers from './handlers';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export default setupServer(...handlers);
