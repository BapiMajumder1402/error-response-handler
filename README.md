# Error Response Handler

[![npm version](https://img.shields.io/npm/v/error-response-handler.svg?style=flat-square)](https://www.npmjs.com/package/error-response-handler)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/bapimajumder/error-response-handler/node.js.yml?style=flat-square)](https://github.com/bapimajumder/error-response-handler/actions)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

A comprehensive error handling and response formatting solution for Node.js applications with full TypeScript support.

**Author**: Bapi Majumder  
**Email**: bapim1402@gmail.com  
**GitHub**: [bapimajumder](https://github.com/BapiMajumder1402)

## ✨ Features

- Built-in HTTP status codes with auto-completion
- Automatic async error handling
- Consistent response structures
- Custom error classes with status codes
- TypeScript & JavaScript support
- Framework agnostic (Express, Koa, etc.)
- Production-ready error handling

## 📦 Installation

```bash
npm install error-response-handler
# or
yarn add error-response-handler
# or
pnpm add error-response-handler


🚀 Quick Start
Basic Usage
typescript
import { 
  successResponse, 
  errorResponse, 
  AppError, 
  StatusCode,
  asyncHandler
} from 'error-response-handler';

// Success response
const success = successResponse({
  data: { id: 1, name: 'John' },
  message: 'User fetched',
  statusCode: StatusCode.OK
});

// Error response
const error = errorResponse({
  message: 'Validation failed',
  statusCode: StatusCode.BAD_REQUEST,
  error: { email: 'Invalid format' }
});

// Custom error
throw new AppError('Not found', StatusCode.NOT_FOUND);

// Async handler
const fetchUser = asyncHandler(async (id) => {
  const user = await getUser(id);
  if (!user) throw new AppError('User not found', 404);
  return user;
});
🛠️ Express.js Integration
typescript
import express from 'express';
import { asyncHandler, AppError, successResponse } from 'error-response-handler';

const app = express();

// Success route
app.get('/success', (req, res) => {
  res.json(successResponse({ data: { healthy: true } }));
});

// Protected route
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    throw new AppError('User not found', StatusCode.NOT_FOUND);
  }
  res.json(successResponse({ data: user }));
}));

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  res.status(statusCode).json(errorResponse({
    message: err.message,
    statusCode,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  }));
});

app.listen(3000);
📚 API Reference
successResponse(options)
Creates a standardized success response.

Options:

Parameter	Type	Description	Default
message	string	Custom message	Status text
data	any	Response payload	undefined
statusCode	number/string/StatusCodeValue	HTTP status code	200
errorResponse(options)
Creates a standardized error response.

Options:

Parameter	Type	Description	Default
message	string	Error message	Status text
error	any	Error details	undefined
statusCode	number/string/StatusCodeValue	HTTP status code	500
asyncHandler(fn)
Wraps async functions to automatically catch errors.

AppError
Custom error class extending Error with status code support.

typescript
new AppError(message: string, statusCode: StatusInput, isOperational?: boolean)
🌐 Status Codes
All standard HTTP status codes available:

Code	Constant	Text
200	SUCCESS	Success
201	CREATED	Created
204	NO_CONTENT	No Content
400	BAD_REQUEST	Bad Request
401	UNAUTHORIZED	Unauthorized
403	FORBIDDEN	Forbidden
404	NOT_FOUND	Not Found
500	INTERNAL_SERVER_ERROR	Internal Server Error
Full list available in statusCodes.ts

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact
Bapi Majumder  - bapim1402@gmail.com

Project Link: https://github.com/BapiMajumder1402/error-response-handler


