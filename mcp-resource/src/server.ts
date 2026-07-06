import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { readFile } from "node:fs/promises";
const server = new McpServer({
  name: "docs-mcp",
  version: "1.0.0",
});

server.registerResource(
  "setup-guide",
  "docs://setup",
  {
    title: "Project Setup Guide",
    description: "Instructions to set up the project",
    mimeType: "text/markdown",
  },
  async (uri) => {
    const markdown = await readFile("./docs/setup.md", "utf-8");

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: markdown,
        },
      ],
    };
  },
); // <-- semicolon ends this statement completely

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
