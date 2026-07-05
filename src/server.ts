import {McpServer, type CallToolResult} from "@modelcontextprotocol/server";
import { z } from "zod";
import {StdioServerTransport} from "@modelcontextprotocol/server/stdio";


const  server: McpServer = new McpServer({
    name : "hello-mcp",
    version : "1.0.0",
});


server.registerTool(
    "greet-mcp",
    {
        title : "greet-mcp",
        description : "Greets a user by name.",
        inputSchema : z.object(
            {
                name : z.string().describe("It takes an username.")
            }
        )

    },
    async ({name}) : Promise<CallToolResult>  =>{
        return {
            content : [{
                type : "text",
                text : `Hello ${name}`,
            }],
        };
    }
);

server.registerTool(
    "add",
    {
        title : "Add two numbers",
        description : "Adds two numbers for each time.",
        inputSchema : z.object({
            num1 : z.number().describe("It takes a number"),
            num2 : z.number().describe("It takes a number"),
        }),

    },
    async ({num1, num2}) =>{
        return {
            content : [
                {
                    type : "text",
                    text : `Addition of two numbers is ${num1 + num2}`
                }
            ]
        }
    }

)

server.registerTool(
    "subtract",
    {
        title : "Subtract two numbers",
        description : "Subtract two numbers for each time.",
        inputSchema : z.object({
            num1 : z.number().describe("It takes a number"),
            num2 : z.number().describe("It takes a number"),
        }),

    },
    async ({num1, num2}) =>{
        return {
            content : [
                {
                    type : "text",
                    text : `Subtraction of two numbers ${num1 - num2}`,
                }
            ]
        }
    }

)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((err) => {
    console.error("Failed to connect to the server", err);
    process.exit(1);
})