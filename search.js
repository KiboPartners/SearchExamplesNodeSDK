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
    url: "{+tenantPod}api/commerce/catalog/storefront/productsearch/suggest2?query={query}&groups={groups}&mid={mid}",
  }),
  siteSearch: Client.method({
    method: constants.verbs.GET,
    url: "{+tenantPod}api/commerce/catalog/storefront/productsearch/sitesearch?query={query}&fieldList={fieldList}&mid={mid}&omitNamespace={omitNamespace}",

    /* 
    All possible site search parameters shown below. Add params to url as needed
    url: "{+tenantPod}api/commerce/catalog/storefront/productsearch/sitesearch?query={query}&fieldList={fieldList}&mid={mid}&filter={filter}&facetTemplate={facetTemplate}&facetTemplateSubset={facetTemplateSubset}&facet={facet}&facetFieldRangeQuery={facetFieldRangeQuery}&facetHierPrefix={facetHierPrefix}&facetHierValue={facetHierValue}&facetHierDepth={facetHierDepth}&facetStartIndex={facetStartIndex}&facetPageSize{facetPageSize}&facetSettings={facetSettings}&facetValueFilter={facetValueFilter}&sortBy={sortBy}&pageSize={pageSize}&startIndex={startIndex}&searchSettings={searchSettings}&enableSearchTuningRules={enableSearchTuningRules}&searchTuningRuleContext={searchTuningRuleContext}&searchTuningRuleCode={searchTuningRuleCode}&responseGroups={responseGroups}&facetTemplateExclude={facetTemplateExclude}&facetPrefix={facetPrefix}&responseOptions={responseOptions}&cursorMark={cursorMark}&facetValueSort={facetValueSort}&defaultSort={defaultSort}&sortDefinitionName={sortDefinitionName}&defaultSortDefinitionName={defaultSortDefinitionName}&shouldSlice={shouldSlice}&mid={mid}&omitNamespace={omitNamespace}&includeAllImages={includeAllImages}&spellcorrectOverride={spellcorrectOverride}&useSubscriptionPricing={useSubscriptionPricing}",
    */
  }),
});

const searchResource = searchFactory(apiContext);

/**
 * Used to suggest products and categories as the user types in the search box
 * @param {string} query search term entered by user
 * @param {string} groups products and categories are the only valid values. Products return by defualt. You must specifiy if you want categories here
 * @param {string} mid Monetate ID. Cookie-based identifier used for personalization. Found in the mt.v cookie.
 * @returns {object} search results
 */
async function getSearchSuggestions(query = "", groups = "products,categories", mid) {
  try {
    const suggestions = await searchResource.suggest2({ query, groups, mid });

    console.log(JSON.stringify(suggestions, null, 2));
    return suggestions;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Used for getting products to display on the serach results page
 * @param {string} query search term entered by user
 * @param {string} fieldList Comma-spereated fields you want returned in the response. 
 * @param {string} mid Monetate ID. Cookie-based identifier used for personalization. Found in the mt.v cookie.
 * @returns {object} search results
 */
async function siteSearch(query = "", fieldList = "score,productName,productImageUrls,priceL", mid) {
  try {
    const searchResults = await searchResource.siteSearch({
      query,
      fieldList,
      mid,
      omitNamespace: true,
    });

    console.log(JSON.stringify(searchResults, null, 2));
    return searchResults;
  } catch (error) {
    console.log(error.message);
  }
}

(async function search() {
  try {
    console.log("Results for type ahead suggestions:");
    await getSearchSuggestions("microwave", "products,categories", "2.480627356.1659540203878");

    console.log("Site search results:");
    await siteSearch("kia", "productName", "2.480627356.1659540203878");
  } catch (error) {
    console.log(error);
  }
})();
