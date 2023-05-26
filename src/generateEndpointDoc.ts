import { ENDPOINTS } from './endpoints'
import type { EndpointDefinition } from './endpoints'


const lbb = `
* `;
const lb = `
`;

for (const [k, v] of Object.entries(ENDPOINTS)) {
  console.log(`## Endpoint: \`${k}\`${lb}`);
  console.log(`### URL: \`${v.url}\`${lb}`);
  const rp = Object.keys(v.path_params).filter((pk) => v.path_params[pk].required && pk !== 'ver');
  // console.log(`### Required Path Parameters${lb}${rp}`);
  const rq = v.required_params.filter((q) => q.length > 0).map((q) => q.join(' + '));
  // console.log(`### Required Query Parameters${lb}${rq}`);
  rp.push(...rq);
  console.log(`### Required Parameters${lb}* ${rp.length ? rp.join(lbb) : '*None*'}${lb}`);
  const ap = [...Object.keys(v.path_params), v.query_params.length ? v.query_params : [])];
  console.log(`### All Parameters${lb}* ${ap.join(lbb)}${lb}`);
  if (v.note) {
    console.log(`### Note${lb}${v.note}${lb}`);
  }
  console.log(`-----${lb}`);
}