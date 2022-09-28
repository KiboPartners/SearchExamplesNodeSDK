## Using the mozu-node-sdk for search

#### Examples  
Code examples in ```search.js```
#### Installation
Mozu-node-sdk [download and documentation](https://www.npmjs.com/package/mozu-node-sdk)


#### Search APIs
- Site search [API docs](https://apidocs.kibocommerce.com/?spec=catalog_storefront#get-/commerce/catalog/storefront/productsearch/siteSearch)
- Suggest2 - [API docs](https://apidocs.kibocommerce.com/?spec=catalog_storefront#get-/commerce/catalog/storefront/productsearch/suggest2)


#### Creating API Context
Use env variables to pass along your credentials

Example:
```
const apiContext = require("mozu-node-sdk/clients/platform/application")({
  context: {
    appKey: process.env.appKey,
    sharedSecret: process.env.sharedSecret,
    tenant: process.env.tenant,
    site: process.env.site,
    baseUrl: "https://home.mozu.com"
  }
})
```

#### Where to find env variables?
[Kibo Launchpad](https://www.mozu.com/login) 


- appKey and sharedSecret - launchpad > select your developer account > develop tab > applications > select application > appKey and sharedSecret are here.

- tenant ID - launchpad > select your developer account > sandboxes tab > tenant ID is the sandbox ID is listed here
- site ID - go to your sandbox ```https://t{tenantId}.sandbox.mozu.com/admin/``` > system tab > structure > sites > site Id is listed here