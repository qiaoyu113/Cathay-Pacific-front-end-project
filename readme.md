# Document Search Application

This application is a **Document Search and Management System** that supports searching, filtering, pagination, and view toggling (grid/list views). It is a full-stack solution powered by **React**, **TypeScript**, and **Express.js**, with mock data generated for demonstration purposes.

---

## Author

**Yu Qiao (Joey)**  
Email: qiaoyu.joey@gmail.com
This project is developed and maintained by Yu Qiao (Joey). For any inquiries or discussions about this project, feel free to reach out.

---

## Key Features

### Frontend
- **Search Bar**: Enables users to search for documents with an optional debounce delay.
- **Toggle Views**: Allows switching between **list view** and **grid view**.
- **Pagination**: Supports navigating through pages for large datasets.
- **User Authentication**: Implements login functionality with token-based authentication.

### Backend
- **Mock Data Generation**: Generates realistic mock documents using `@faker-js/faker`.
- **Search and Filter**: Provides search capabilities across multiple fields (e.g., title, description).
- **Pagination Support**: Returns paginated results based on page and limit query parameters.
- **Authentication Middleware**: Protects sensitive routes using a fixed mock token.

---

## Project Structure

This project is split into two directories: **backend** and **frontend**, showcasing a clear separation of concerns.

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/         # Handles business logic for API endpoints
│   │   │   ├── documentController.ts
│   │   │   ├── loginController.ts
│   │   ├── models/              # Defines data models and mock data
│   │   │   ├── documentModel.ts
│   │   ├── routes/              # Defines application routes
│   │   │   ├── documentRoutes.ts
│   │   ├── utils/               # Utility modules (e.g., middleware)
│   │   │   ├── authMiddleware.ts
│   │   ├── app.ts               # Express application configuration
│   │   ├── server.ts            # Server entry point
│   └── package.json             # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Core UI components
│   │   │   ├── AppContent.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── DocumentList.tsx
│   │   │   ├── ToggleView.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DocumentCard.tsx
│   │   ├── hooks/               # Custom hooks (e.g., useDocuments)
│   │   ├── styles/              # CSS for components
│   │   │   ├── App.css
│   │   │   ├── DocumentList.css
│   │   │   ├── LoginPage.css
│   │   │   ├── SearchBar.css
│   │   │   ├── ToggleView.css
│   │   ├── utils/               # Utility modules (e.g., API configuration)
│   │   │   ├── api.ts
│   │   ├── App.tsx              # Frontend entry component
│   │   ├── index.tsx            # Application root
│   └── package.json             # Frontend dependencies
│
└── README.md                    # Project documentation
```


---

## Frontend Modules

### `AppContent.tsx`
- **Purpose**: Serves as the main entry point for the document search and management logic.
- **Key Features**:
  - Manages state for current page, search query, and view toggle (list/grid).
  - Handles API requests for fetching paginated and filtered document data.
  - Integrates subcomponents like `SearchBar`, `ToggleView`, and `DocumentList`.

---

### `SearchBar.tsx`
- **Purpose**: Provides a search input and triggers document filtering based on user input.
- **Functionality**:
  - On clicking the search button, it triggers the `onSearch` callback and resets the page to the first one.
  - Accepts `onSearch` and `onResetPage` props to dynamically update results.

---

### `DocumentList.tsx`
- **Purpose**: Renders the list of documents in either grid or list view.
- **Functionality**:
  - Accepts `documents`, `isGridView`, `currentPage`, and `totalPages` as props.
  - Implements a pagination system with `Previous` and `Next` buttons.
  - Dynamically toggles between grid and list layouts based on `isGridView`.

---

### `ToggleView.tsx`
- **Purpose**: Allows users to toggle between grid and list views.
- **Functionality**:
  - Updates the `isGridView` state in `AppContent`.
  - Displays the total number of search results.

---

### `LoginPage.tsx`
- **Purpose**: Implements token-based login.
- **Functionality**:
  - Sends login credentials to the backend and receives a mock token.
  - Stores the token in `localStorage` for subsequent authenticated requests.
  - Redirects to the main content page upon successful login.

---

## Backend Modules

### `documentController.ts`
- **Purpose**: Handles fetching, searching, filtering, and paginating documents.
- **Key Features**:
  - **Search**: Filters documents based on title, description, and modifiedBy fields.
  - **Pagination**: Supports `page` and `limit` query parameters.
  - **Sorting**: Allows sorting by title or modified date in ascending or descending order.

---

### `authMiddleware.ts`
- **Purpose**: Protects routes with token-based authentication.
- **Functionality**:
  - Validates the presence and correctness of a `Bearer` token.
  - Returns a `401 Unauthorized` error if the token is invalid.

---

### `loginController.ts`
- **Purpose**: Handles user login.
- **Functionality**:
  - Accepts a username and password.
  - Returns a mock token (`mock-token`) upon successful login.

---

### Mock Data
- **Document Model**:
  - Contains fields like `id`, `title`, `description`, `modifiedBy`, `modifiedDate`, `category`, and `location`.
  - Generated dynamically using `@faker-js/faker`.

---

## Installation and Running

### Prerequisites
- Node.js (v16+)
- npm or yarn

---

### frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The frontend will run by default on [http://localhost:3000](http://localhost:3000). To modify the port, update the `start` script in `frontend/package.json`.

---

### backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx ts-node-dev src/server.ts
   ```

---

## Logic and Design

### Frontend Logic
- **Search**: Filters data dynamically based on input.
- **Pagination**: Fetches paginated data based on the current page.
- **View Toggle**: Provides flexible document presentation modes.

### Backend Logic
- **Mock Data**: Generates realistic data for testing.
- **Search & Filter**: Efficiently processes search queries and filters results.
- **Pagination**: Limits the number of documents returned per request.

---

## Troubleshooting

### Common Issues

#### CORS Errors
- Ensure backend CORS is configured:
  ```typescript
  app.use(cors({ origin: "http://localhost:3000" }));
  ```
- API Not Responding
Verify backend server is running.
Check API base URL in frontend/src/utils/api.ts.
- Login Fails
Ensure backend /login endpoint returns the correct token.

## Future Enhancements
- Database Integration: Replace mock data with a real database (e.g., MongoDB, PostgreSQL).
- Token Refresh: Implement token expiry and refresh functionality.
- User Management: Add user roles and permissions.