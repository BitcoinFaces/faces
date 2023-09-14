import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function Docs() {
  return <SwaggerUI url="/openapi_spec.json" />;
}

export default Docs;
