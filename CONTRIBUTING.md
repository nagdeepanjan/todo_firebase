# Contributing to Firebase Todo App

Thank you for your interest in contributing to this project! This document outlines the process for contributing to the Firebase Todo App.

## Branch Strategy

This repository uses `main` as the default branch. All development should follow this branching model:

### Main Branch
- **Branch**: `main`
- **Purpose**: Production-ready code
- **Protection**: Should be protected with required reviews
- **Deployment**: Automatically deployed to production

### Feature Branches
- **Naming**: `feature/description` or `feat/description`
- **Source**: Branch from `main`
- **Target**: Merge back to `main` via Pull Request

### Bug Fix Branches
- **Naming**: `fix/description` or `bugfix/description`
- **Source**: Branch from `main`
- **Target**: Merge back to `main` via Pull Request

### Hotfix Branches
- **Naming**: `hotfix/description`
- **Source**: Branch from `main`
- **Target**: Merge back to `main` via Pull Request

## Getting Started

1. **Fork the repository** (for external contributors)
2. **Clone your fork** or the main repository
3. **Set up the main branch** as default (see `.github/README.md`)
4. **Create a feature branch**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make your changes** in your feature branch
2. **Write or update tests** for your changes
3. **Run the test suite**:
   ```bash
   npm run test
   ```
4. **Run the linter**:
   ```bash
   npm run lint
   ```
5. **Build the project**:
   ```bash
   npm run build
   ```
6. **Commit your changes** with a descriptive message
7. **Push your branch** to GitHub
8. **Create a Pull Request** targeting the `main` branch

## Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Linking**: Link any related issues

## Code Style

This project uses ESLint for code formatting and style consistency:
- Run `npm run lint` to check for style issues
- Follow the existing code patterns in the project
- Use meaningful variable and function names
- Add comments for complex logic

## Testing

- Write tests for new features
- Update tests for modified functionality
- Ensure all tests pass before submitting PR
- Run `npm run test` to execute the test suite

## Firebase Configuration

When contributing features that involve Firebase:
- Do not commit your actual Firebase configuration
- Use environment variables or config files that are gitignored
- Update documentation if new Firebase features are used

## Questions?

If you have questions about contributing, please:
1. Check existing issues and discussions
2. Create a new issue with the `question` label
3. Reach out to the maintainers

Thank you for contributing! 🚀