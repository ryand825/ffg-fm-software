import { sp } from "@pnp/sp";

export const getLocations = () =>
  sp.web.lists
    .getByTitle("service-locations")
    .items.get()
    .then(items => items);

export const getTechnicians = () =>
  sp.web.lists
    .getByTitle("service-technicians")
    .items.get()
    .then(items => items);
