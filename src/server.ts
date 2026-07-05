import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

import { divideTwoNumbers, DivideByZeroError } from "./externalServices";

const server = new McpServer({
  name: "hello-mcp",
  version: "1.0.0",
});

const twoNumbersSchema = z.object({
  num1: z.number().describe("The first number"),
  num2: z.number().describe("The second number"),
});

server.registerTool(
  "greet-mcp",
  {
    title: "Greet User",
    description: "Greets a user by name.",
    inputSchema: z.object({
      name: z.string().describe("The user's name"),
    }),
  },
  async ({ name }): Promise<CallToolResult> => {
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}!`,
        },
      ],
    };
  },
);

server.registerTool(
  "add",
  {
    title: "Add",
    description: "Adds two numbers.",
    inputSchema: twoNumbersSchema,
  },
  async ({ num1, num2 }): Promise<CallToolResult> => {
    return {
      content: [
        {
          type: "text",
          text: `Result: ${num1 + num2}`,
        },
      ],
    };
  },
);

server.registerTool(
  "subtract",
  {
    title: "Subtract",
    description: "Subtracts the second number from the first.",
    inputSchema: twoNumbersSchema,
  },
  async ({ num1, num2 }): Promise<CallToolResult> => {
    return {
      content: [
        {
          type: "text",
          text: `Result: ${num1 - num2}`,
        },
      ],
    };
  },
);

server.registerTool(
  "multiply",
  {
    title: "Multiply",
    description: "Multiplies two numbers.",
    inputSchema: twoNumbersSchema,
  },
  async ({ num1, num2 }): Promise<CallToolResult> => {
    return {
      content: [
        {
          type: "text",
          text: `Result: ${num1 * num2}`,
        },
      ],
    };
  },
);

server.registerTool(
  "divide",
  {
    title: "Divide",
    description: "Divides the first number by the second.",
    inputSchema: twoNumbersSchema,
  },
  async ({ num1, num2 }): Promise<CallToolResult> => {
    try {
      const result = divideTwoNumbers(num1, num2);

      return {
        content: [
          {
            type: "text",
            text: `Result: ${result}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof DivideByZeroError) {
        return {
          content: [
            {
              type: "text",
              text: error.message,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: "An unexpected error occurred.",
          },
        ],
        isError: true,
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Failed to start MCP Server:", err);
  process.exit(1);
});
