import path from "path";
import YAML from "yamljs";

const swaggerDocs = YAML.load(
	path.resolve(__dirname, "../documentation/swagger.yaml")
);

export default swaggerDocs;
