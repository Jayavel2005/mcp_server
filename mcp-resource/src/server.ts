import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";

const server = new McpServer({
  name: "docs-mcp",
  version: "1.0.0",
});

(async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
