/** Every page the site serves. Each test file runs against all of them. */
export type Route = { name: string; path: string; status: number };

export const routes: Route[] = [
  { name: 'home', path: '/', status: 200 },
  { name: '404', path: '/this-page-does-not-exist', status: 404 },
];
