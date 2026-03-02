# pearpass-lib-ui-react-native-components

This package contains the shared UI component library used across all PearPass client applications:
- **Mobile app** 
- **Desktop app** 
- **Browser extension**

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Core Architecture](#core-architecture)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Related Projects](#related-projects)

## 🏗 Core Architecture

This library is built using **React Strict DOM** to provide a strict, web-standards-aligned API that renders as optimized standard HTML/CSS on web/desktop, and maps efficiently to native components on mobile.

## 🚀 Getting Started

We use **Storybook** as the central place to build, test, and preview components locally. 

### Running Storybook

Inside this directory, simply run:

```bash
npm install
npm run storybook
```

This will spin up a local server rendering components using Vite and React DOM. You can preview all states and interactions.

## Dependencies

This library has the following peer dependencies:

- [`react`](https://reactjs.org/)
- [`react-native`](https://reactnative.dev/)
- [`react-native-svg`](https://github.com/software-mansion/react-native-svg)
- [`react-strict-dom`](https://github.com/facebook/react-strict-dom)

For a full list of dependencies, refer to the `package.json` file.

## Related Projects

- [pearpass-utils-password-check](https://github.com/tetherto/pearpass-utils-password-check): Utility functions for password validation.
- [tether-dev-docs](https://github.com/tetherto/tether-dev-docs): Shared ESLint configurations and development tools for Tether projects.
- [pearpass-lib-ui-theme-provider](https://github.com/tetherto/pearpass-lib-ui-theme-provider): Theme provider for consistent styling across Pearpass UI components.

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.