# Voogle Search

Voogle Search is a web application that allows users to search for GitHub repositories and view their details. It provides a user-friendly interface for searching, browsing, and exploring GitHub repositories.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Voogle Search, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bangarusaivivek/github-search.git
   ```
2. Install dependencies:

   ```bash
   cd github-search
   npm install
   ```
3. Run the development server::

   ```bash
   npm start
   ```
4. Open your web browser and navigate to http://localhost:3000 to access the application.

## Usage

Once the application is running, you can use the search bar to enter keywords and search for GitHub repositories. You can also navigate through the search results, view repository details, and explore related repositories.

## Features

- **Search Bar**: Allows users to enter keywords and search for GitHub repositories.
- **Navigation Buttons**: Enable users to navigate through search results and view previous or next repositories.
- **Infinite Scrolling**: Provides seamless browsing experience by loading more repositories as the user scrolls down.
- **Keyboard Navigation**: Supports keyboard navigation for enhanced accessibility, including arrow key navigation and selection.

## File Structure

The project is organized as follows:

- **src/**: Contains all source code files.
  - **components/**: Reusable UI components.
    - **Navigation/**: Components related to navigation.
    - **RepoCard/**: Components for displaying repository details.
    - **Search/**: Components for search functionality.
  - **features/**: Organized feature-specific components, hooks, services, and store.
    - **home/**: Components specific to the home feature.
      - **components/**: Components specific to the home feature.
      - **hooks/**: Custom hooks specific to the home feature.
      - **services/**: Services specific to the home feature.
      - **store/**: Redux store setup specific to the home feature.
  - **hooks/**: Custom React hooks used throughout the application.
  - **services/**: API services for fetching data.
  - **store/**: Redux store configuration and slice reducers.
  - **utils/**: Utility functions and helper modules.
- **public/**: Public assets and HTML template.
  - **icons/**: Icons used in the application.
- **README.md**: Markdown file containing project documentation.

## Dependencies

The main dependencies of the project include:

- React: A JavaScript library for building user interfaces.
- React Redux: Official Redux binding for React.
- Redux Toolkit: Simplified Redux setup with utilities and abstractions.
- Axios: Promise-based HTTP client for making API requests.
- TypeScript: A statically typed superset of JavaScript for improved developer productivity.

## Contributing

Contributions to Voogle Search are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request explaining your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

