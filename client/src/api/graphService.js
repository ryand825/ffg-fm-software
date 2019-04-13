import * as graph from "@microsoft/microsoft-graph-client";
import idCollection from "./idCollection";
import config from "./config";

const {
  siteId,
  serviceLocations,
  serviceTechnicians,
  serviceLocationAssets
  // equipmentCatalog
} = idCollection;

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: done => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api("/me").get();
  return user;
}

export async function getLocationList() {
  const accessToken = await window.msal.acquireTokenSilent(config.scopes);

  const client = getAuthenticatedClient(accessToken);

  const response = await client
    .api(`/sites/${siteId}/lists/${serviceLocations}/items`)
    .expand("fields")
    .get();

  return response;
}

export async function getTechnicianlist() {
  const accessToken = await window.msal.acquireTokenSilent(config.scopes);

  const client = getAuthenticatedClient(accessToken);

  const response = await client
    .api(`/sites/${siteId}/lists/${serviceTechnicians}/items`)
    // .filter("fields/Title eq 'Ryan Aston'")
    // .search(2)
    .expand("fields")
    // .select()
    .get();

  return response;
}

export async function getAssetsByLocationId(locationId) {
  const accessToken = await window.msal.acquireTokenSilent(config.scopes);

  const client = getAuthenticatedClient(accessToken);

  const response = await client
    .api(`/sites/${siteId}/lists/${serviceLocationAssets}/items`)
    .filter(`fields/Asset_x0020_LocationLookupId eq '${locationId}'`)
    // .search(2)
    .expand(
      `fields(
        $select=id,Title,
        Asset_x0020_Model,
        Asset_x0020_Model_x003a_Descript,
        Asset_x0020_Model_x003a_Title,
        Asset_x0020_ModelLookupId
        )`
    )
    // .select()
    .get();

  return response;
}

export async function batchModelsByIds(requests) {
  const accessToken = await window.msal.acquireTokenSilent(config.scopes);

  const client = getAuthenticatedClient(accessToken);

  const response = await client.api("$batch").post({ requests });

  return response;
}
