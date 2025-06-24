# Book Library JSC 

This is a simple **Book Library** application built with Angular 20. It allows users to list, add, edit, and delete books.

## Features

- Lazy-loaded `/library` route.
- Reactive forms for adding/editing books.
- Two interchangeable data services (HTTP & in-memory).
- Route resolver for preloading book data.
- Global error handling with an HTTP interceptor.
- Clean architecture with CoreModule and shared services.

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Angular App

```bash
ng serve
```

This will start the app on http://localhost:4200.

### 3. Run the JSON Server (Mock API)
This project uses json-server to simulate a REST API.

```bash
npm run api
```

This starts the mock API at http://localhost:3000/books.

Ensure that db.json is present in the root of the project.

## Switching Between Services
The app supports two interchangeable services via Angular's dependency injection:

HttpBookService: Connects to the mock REST API.

InMemoryBookService: Uses a local in-memory array.

To switch between them, go to:

src/app/core/core.module.ts

And comment/uncomment the desired line inside the providers array:

```ts
// Use HTTP (with json-server)
providers: [{ provide: IBookService, useClass: HttpBookService }],

// Use in-memory (local data)
// providers: [{ provide: IBookService, useClass: InMemoryBookService }],
```
After changing, restart the Angular server.

## Testing
This project does not include unit tests, but the architecture supports adding Jasmine/Karma tests for services and components.

## Additional Notes
Error handling is implemented via a global HTTP interceptor.

Logs are handled through a custom LoggerService.

Book details are loaded via a route resolver before showing the BookDetailComponent.
