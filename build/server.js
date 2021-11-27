(()=>{var e={257:e=>{e.exports={PARAMS_RULES:/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,REQUIRED_PROPERTIES:{name:{type:"string"},age:{type:"number"},hobbies:{type:"object"}}}},547:(e,t,r)=>{const o=r(204),{getPostData:n,handleServerError:s,handleClientError:i,filterNecessaryProperties:a,checkRequiredProperties:d,checkPropertiesTypes:c}=r(624);e.exports={getPersons:async(e,t)=>{try{const e=await o.findAll();t.writeHead(200,"Content-Type","application/json"),t.end(JSON.stringify(e))}catch(e){s(t,e)}},getPerson:async(e,t,r)=>{try{const e=await o.findById(r);e?(t.writeHead(200,"Content-Type","application/json"),t.end(JSON.stringify(e))):i(404,t,`Sorry, person with id=${r} not found`)}catch(e){s(t,e)}},createPerson:async(e,t)=>{try{const r=await n(e),s=JSON.parse(r),{name:p,age:u,hobbies:l}=s,y=a(s),f=d(y);if("string"==typeof f&&i(400,t,`Sorry, you missed required properties: ${f}`),f){const e=c(y);if("string"!=typeof e){const e={name:p,age:u,hobbies:l},r=await o.create(e);return t.writeHead(201,"Content-Type","application/json"),t.end(JSON.stringify(r))}i(400,t,`Sorry but ${e}`)}}catch(e){s(t,e)}},updatePerson:async(e,t,r)=>{try{const s=await o.findById(r);if(s){const d=await n(e),p=JSON.parse(d),u=a(p),l=c(u);if("string"!=typeof l){const{name:e,age:n,hobbies:i}=u,a={name:e||s.name,age:n||s.age,hobbies:i||s.hobbies},d=await o.update(a,r);return t.writeHead(200,"Content-Type","application/json"),t.end(JSON.stringify(d))}i(400,t,`Sorry but ${l}`)}else i(404,t,`Sorry, person with id=${r} not found`)}catch(e){s(t,e)}},removePerson:async(e,t,r)=>{try{await o.findById(r)?(await o.removeById(r),t.writeHead(204,"Content-Type","application/json"),t.end()):i(404,t,`Sorry, person with id=${r} not found`)}catch(e){s(t,e)}}}},204:(e,t,r)=>{const{v4:o}=r(828),n=r(633),{writeDataToFile:s}=r(624);e.exports={findAll:()=>new Promise(((e,t)=>{e(n)})),findById:e=>new Promise(((t,r)=>{t(n.find((t=>t.id.toString()===e.toString())))})),create:e=>new Promise(((t,r)=>{const i={id:o(),...e};n.push(i),s("data/index.json",n),t(i)})),update:(e,t)=>new Promise(((r,o)=>{const i=n.findIndex((e=>e.id.toString()===t.toString()));n[i]={id:t,...e},s("data/index.json",n),r(n[i])})),removeById:e=>new Promise(((t,r)=>{const o=n.filter((t=>t.id.toString()!==e.toString()));s("data/index.json",o),t()}))}},254:(e,t,r)=>{const{getPersons:o,getPerson:n,createPerson:s,updatePerson:i,removePerson:a}=r(547),{validateId:d,handleClientError:c}=r(624);e.exports={methodGet:(e,t)=>{if(e.url.includes("/person"))"/person"===e.url?o(e,t):d(e,t,n);else{const r=`Sorry, requested route ${e.url} not found`;c(404,t,r)}},methodPost:(e,t)=>{if("/person"===e.url)s(e,t);else{const r=`Sorry, requested route ${e.url} not found`;c(404,t,r)}},methodPut:(e,t)=>{if(e.url.includes("/person"))d(e,t,i);else{const r=`Sorry, requested route ${e.url} not found`;c(404,t,r)}},methodDelete:(e,t)=>{if(e.url.includes("/person"))d(e,t,a);else{const r=`Sorry, requested route ${e.url} not found`;c(404,t,r)}}}},624:(e,t,r)=>{const o=r(147),n=r(17),{REQUIRED_PROPERTIES:s,PARAMS_RULES:i}=r(257),a=new RegExp(i),d=(e,t,r)=>{t.writeHead(e,"Content-Type","application/json"),t.end(JSON.stringify({message:r}))};e.exports={writeDataToFile:(e,t)=>{let r;if("development"===process.argv[2]){const e=__dirname.split("\\");e.pop(),r=e.join("\\")}else{if("production"!==process.argv[2])throw new Error(`Have no access to ${e}`);r=__dirname}const s=n.resolve(r,e);if(!o.existsSync(s))throw new Error(`Have no access to ${s}`);o.writeFileSync(s,JSON.stringify(t),"utf-8",(e=>{if(e)throw new Error(`${e}`)}))},getPostData:e=>new Promise(((t,r)=>{try{let r="";e.on("data",(e=>{r+=e.toString()})),e.on("end",(()=>{t(r)}))}catch(e){r(e)}})),handleServerError:(e,t)=>{e.writeHead(500,"Content-Type","application/json"),e.end(JSON.stringify({message:t.message}))},handleClientError:d,filterNecessaryProperties:e=>{const t=Object.keys(s);return Object.keys(e).reduce(((r,o)=>(t.includes(o)&&(r[o]=e[o]),r)),{})},checkRequiredProperties:e=>{const t=Object.keys(e),r=Object.keys(s).reduce(((e,r)=>{const o={};return t.includes(r)?(o[r]=!0,e.push(o)):(o[r]=!1,e.push(o)),e}),[]);return!!r.every((e=>Object.values(e)[0]))||r.filter((e=>!Object.values(e)[0])).map((e=>Object.keys(e)[0])).join(", ")},checkPropertiesTypes:e=>{const t=Object.entries(e).reduce(((e,[t,r])=>{const o={};return typeof r===s[t].type?"object"==typeof r?Array.isArray(r)&&(0===r.length||r.every((e=>"string"==typeof e)))?(o[t]=!1,e.push(o)):(o[t]=`${t} should be empty array or array with string items`,e.push(o)):(o[t]=!1,e.push(o)):(o[t]=`${t} should be ${s[t].type}`,e.push(o)),e}),[]);return!!t.every((e=>!Object.values(e)[0]))||t.filter((e=>Object.values(e)[0])).map((e=>Object.values(e)[0])).join(", ")},validateId:(e,t,r)=>{const o=e.url.split("/person/");if(""===o[0]&&2===o.length){const n=o[1];a.test(n)?r(e,t,n):d(400,t,`Sorry, id ${n} is invalid`)}else{const r=`Sorry, requested route ${e.url} not found`;d(404,t,r)}}}},142:e=>{"use strict";e.exports=require("dotenv")},828:e=>{"use strict";e.exports=require("uuid")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")},17:e=>{"use strict";e.exports=require("path")},633:e=>{"use strict";e.exports=JSON.parse('[{"id":"e59b13b3-9280-494e-b492-70242d6ee71d","name":"Cairo Berg","age":30,"hobbies":["reading books","swimming"]},{"id":"94aebe09-d3b1-485b-ab0e-373c42a4da14","name":"Cairo Berg","age":30,"hobbies":["reading books","swimming"]},{"id":"84d46747-58bb-4ee4-ae4d-d958776e8976","name":"Cairo Berg","hobbies":["reading books"]},{"id":"0f8ed116-cbaa-40df-a4dd-ae73436e026d","name":"Hanna","age":22},{"id":"249c9b74-63cc-4f99-b512-6e57c248596e","name":"Peter","age":29,"hobbies":["dancing"]}]')}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}(()=>{const e=r(685);r(142).config();const{methodGet:t,methodPost:o,methodPut:n,methodDelete:s}=r(254),{PORT:i=3e3,HOST:a="localhost"}=process.env;e.createServer(((e,r)=>{switch(e.method){case"GET":t(e,r);break;case"POST":o(e,r);break;case"PUT":n(e,r);break;case"DELETE":s(e,r);break;default:r.writeHead(400,"Content-Type","application/json"),r.end(JSON.stringify({message:`Unknown method ${e.method}`}))}})).listen(i,a,(e=>{e?console.log(e):console.log(`listening port ${i}`)}))})()})();