# Contributing to API Blueprint AI

First off, thank you for considering contributing to API Blueprint AI! It's people like you that make API Blueprint AI such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful
* List some other applications where this enhancement exists, if applicable

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the JavaScript/TypeScript and React styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## Development Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Development Setup

1. Clone your fork of the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/api-blueprint-ai.git
   ```

2. Install dependencies
   ```bash
   cd api-blueprint-ai
   npm install
   ```

3. Create a branch
   ```bash
   git checkout -b name-of-your-bugfix-or-feature
   ```

4. Make your changes and commit
   ```bash
   git add .
   git commit -m "Your detailed description of your changes"
   ```

5. Push to your fork and submit a pull request
   ```bash
   git push origin name-of-your-bugfix-or-feature
   ```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

### JavaScript/TypeScript Styleguide

* Use TypeScript for all new code
* Use const for all declarations where possible
* Use template literals instead of string concatenation
* Use async/await instead of callbacks
* Use arrow functions for callbacks
* Use destructuring where possible
* Use the spread operator (...) for arrays and objects
* Use optional chaining (?.) and nullish coalescing (??) operators

### React Styleguide

* Use functional components with hooks
* Use TypeScript for component props
* Use CSS-in-JS (Tailwind) for styling
* Keep components small and focused
* Use proper prop naming conventions
* Extract reusable logic into custom hooks
* Use proper error boundaries
* Implement proper loading states
* Use proper form handling

### Documentation Styleguide

* Use Markdown for documentation
* Reference methods and classes in markdown with backticks
* Include code examples in documentation when possible
* Keep line length to a maximum of 80 characters
* Use [JSDoc](https://jsdoc.app/) comments for TypeScript/JavaScript code
* Document all public methods and components

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues that are bugs
* `documentation` - Issues for improving or updating our documentation
* `enhancement` - Issues for new features or improvements
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - Issues that aren't valid (e.g. user errors)
* `question` - Further information is requested
* `wontfix` - Issues that won't be worked on

## Recognition

Contributors who submit a PR that gets merged will be added to our README.md file in the contributors section.

Thank you for contributing to API Blueprint AI! 🚀