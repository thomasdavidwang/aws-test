import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";

const backend = defineBackend({
  auth,
  data,
});

backend.data.resources.cfnResources.cfnGraphqlApi.addPropertyOverride(
  "EnvironmentVariables",
  {
    apiId: backend.data.resources.tables["Todo"].tableName,
  }
);
