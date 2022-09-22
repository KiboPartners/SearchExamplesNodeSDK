require("dotenv").config();

// Create context for API calls
const apiContext = require("mozu-node-sdk/clients/platform/application")({
  context: {
    appKey: process.env.appKey,
    sharedSecret: process.env.sharedSecret,
    tenant: process.env.tenant,
    site: process.env.site,
    baseUrl: "https://home.mozu.com",
  },
});

const Client = require("mozu-node-sdk/client");
const constants = Client.constants;

const searchFactory = Client.sub({
  suggest2: Client.method({
    method: constants.verbs.GET,
    url: "{+tenantPod}api/commerce/catalog/storefront/productsearch/suggest2?query={query}&groups={groups}",
  }),
  siteSearch: Client.method({
    method: constants.verbs.GET,
    url: "{+tenantPod}api/commerce/catalog/storefront/productsearch/sitesearch?query={query}&fieldList={fieldList}&omitNamespace={omitNamespace}",

    /* 
    All possible site search parameters shown below. Add params to url as needed
    url: "{+tenantPod}api/commerce/catalog/storefront/productsearch/sitesearch?query={query}&fieldList={fieldList}&filter={filter}&facetTemplate={facetTemplate}&facetTemplateSubset={facetTemplateSubset}&facet={facet}&facetFieldRangeQuery={facetFieldRangeQuery}&facetHierPrefix={facetHierPrefix}&facetHierValue={facetHierValue}&facetHierDepth={facetHierDepth}&facetStartIndex={facetStartIndex}&facetPageSize{facetPageSize}&facetSettings={facetSettings}&facetValueFilter={facetValueFilter}&sortBy={sortBy}&pageSize={pageSize}&startIndex={startIndex}&searchSettings={searchSettings}&enableSearchTuningRules={enableSearchTuningRules}&searchTuningRuleContext={searchTuningRuleContext}&searchTuningRuleCode={searchTuningRuleCode}&responseGroups={responseGroups}&facetTemplateExclude={facetTemplateExclude}&facetPrefix={facetPrefix}&responseOptions={responseOptions}&cursorMark={cursorMark}&facetValueSort={facetValueSort}&defaultSort={defaultSort}&sortDefinitionName={sortDefinitionName}&defaultSortDefinitionName={defaultSortDefinitionName}&shouldSlice={shouldSlice}&mid={mid}&omitNamespace={omitNamespace}&includeAllImages={includeAllImages}&spellcorrectOverride={spellcorrectOverride}&useSubscriptionPricing={useSubscriptionPricing}",
    */
  }),
});

const searchResource = searchFactory(apiContext);

// Used to suggest products and categories as the user types in the search box
async function getSearchSuggestions(query = "", groups = "products,categories") {
  try {
    const suggestions = await searchResource.suggest2({ query, groups });

    console.log(JSON.stringify(suggestions, null, 2));
  } catch (error) {
    console.log(error);
  }
}

// Used for getting products to display on the serach results page
async function siteSearch(query = "", fieldList = "score,productName,productImageUrls,priceL") {
  try {
    const searchResults = await searchResource.siteSearch({
      query,
      fieldList,
      omitNamespace: true,
    });

    console.log(JSON.stringify(searchResults, null, 2));
  } catch (error) {
    console.log(error.message);
  }
}

(async function search() {
  try {
    console.log("Results for type ahead suggestions:");
    await getSearchSuggestions("microwave");

    console.log("Site search results:");
    await siteSearch("kia");
  } catch (error) {
    console.log(error);
  }
})();
