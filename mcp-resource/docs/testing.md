# Testing Guide

Testing helps ensure the Weather MCP Server behaves as expected.

## Run Unit Tests

```bash
npm test
```

## Manual Testing

You can also test the server using the MCP Inspector.

Example request:

```json
{
  "city": "Chennai"
}
```

Expected Response:

```text
City: Chennai
Temperature: 31°C
Humidity: 74%
Weather: Clouds
```

## Things to Verify

- Valid city names return weather information.
- Invalid city names return a proper error.
- Missing API key results in an authentication error.
- Network failures are handled gracefully.