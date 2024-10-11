#!/usr/bin/env node

// https://github.com/ging/fiware-pep-proxy/blob/master/config.js.template
// https://fiware-pep-proxy.readthedocs.io/en/latest/admin_guide/#configuration

const config = {};

// Used only if https is disabled
config.pep_port = 80;

// Set this var to undefined if you don't want the server to listen on HTTPS
// config.https = {
//   enabled: false,
//   cert_file: 'cert/cert.crt',
//   key_file: 'cert/key.key',
//   port: 443,
// };

config.idm = {
  host: 'idm',
  port: 3000,
  ssl: false,
};

config.app = {
  host: 'scorpio',
  port: '9090',
  ssl: false, // Use true if the app server listens in https
};

config.organizations = {
  enabled: false,
  header: 'fiware-service',
};

// Credentials obtained when registering PEP Proxy in app_id in Account Portal
config.pep = {
  app_id: '2c86324c-4ac5-4479-b229-d7e4a0a0b5e3',
  username: 'pep_proxy_c5005df6-ca97-4a02-9ce5-bcda0362ff70',
  password: 'pep_proxy_d4f9e551-dab3-454b-be2b-52d76d1ea4ee',
  token: {
    secret: '', // Secret must be configured in order validate a jwt
  },
  trusted_apps: [],
};

// in seconds
config.cache_time = 300;

// if enabled PEP checks permissions in two ways:
//  - With IdM: only allow basic authorization
//  - With Authzforce: allow basic and advanced authorization.
//	  For advanced authorization, you can use custom policy checks by including programatic scripts
//    in policies folder. An script template is included there
//
//	This is only compatible with oauth2 tokens engine

config.authorization = {
  enabled: false,
  pdp: 'idm', // idm|iShare|xacml|authzforce
  header: undefined, // NGSILD-Tenant|fiware-service
  location: {
    protocol: 'http',
    host: 'localhost',
    port: 8080,
    path: ''
  },
  azf: {
    custom_policy: undefined, // use undefined to default policy checks (HTTP verb + path).
  },
};

config.cors = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
};

config.cluster = {
  type: 'manual', // manual|allCPUCores
  number: 1
};

// list of paths that will not check authentication/authorization
// example: ['/public/*', '/static/css/']
config.public_paths = [];

config.magic_key = undefined;
config.auth_for_nginx =  false;

config.error_template = `{
    "type": "{{type}}",
    "title": "{{title}}",
    "detail": "{{message}}"
  }`;
config.error_content_type = "application/json";

module.exports = config;
