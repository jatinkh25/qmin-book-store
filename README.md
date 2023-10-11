
# Qmin Book Store

## Overview

Qmin Book Store is an online book store web application built using Next.js 13, TypeScript, TailwindCSS, and React-Redux. This web app allows users to browse through a variety of books. It integrates with a nodejs backend to manage the books and the cart of the users.

## Features

- Browse and search for books
- View detailed book information
- Add book to the shopping cart
- Manage the shopping cart (remove items, update quantity(coming soon))
- Checkout and place orders

## Technologies Used

- Next.js 13: A React framework for server-side rendering.
- TypeScript: A typed superset of JavaScript that provides static typing capabilities.
- TailwindCSS: A utility-first CSS framework for rapidly building modern websites.
- React-Redux: A state management library for React applications.

## Installation
To clone and run this application you'll need [Git](https://git-scm.com/), [NodeJS](https://nodejs.org/en) and [Pnpm](https://pnpm.io/) installed on your system. Commands to run after installing these dependencies :

1. Clone the repository:

   ```bash
   git clone https://github.com/jatinkh25/qmin-book-store.git
   ```

2. Install dependencies:

   ```bash
   cd qmin-book-store
   pnpm install
   ```

4. Configure environment variables:

   - Create a `.env` file in the project root directory.
   - Set the following environment variables:

    ```bash
   NEXT_PUBLIC_SERVER_URL = your backend server url
   ```

Note: This app is using a nodejs backend, whose source code link can be found [here](https://github.com/jatinkh25/book-store-backend).


5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open your browser and visit `http://localhost:3000` to access the Qmin Book Store web app.

## Deployment

To deploy the Qmin Book Store web app to a production environment, follow these steps:

1. Build the production-ready version:

   ```bash
   pnpm build
   ```

2. Configure your deployment platform (e.g., Vercel, Netlify, AWS, etc.) to deploy the built files.

3. Set the environment variables mentioned in the installation step on your deployment platform.

4. Deploy the application using the chosen deployment platform.

## Folder Structure

The folder structure of the Qmin Book Store web app is organized as follows:

```bash
├── components        # Reusable React components
├── app               # Next.js app directory
├── hooks             # Custom hooks
├── lib               # Library functions used in the project
├── providers         # Different providers used in the project
├── store             # Redux store configuration and slices
├── utils             # Utility functions, providers, data, constants and types
└── ...
```

## Contributing

Contributions are welcome! If you would like to contribute to the Qmin Book store web app, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## Acknowledgments

- The creators of Next.js, React.js, React-Redux, TypeScript and TailwincdCSS for providing excellent tools and frameworks.
- The open-source community for their contributions and support.
