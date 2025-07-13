# 🤝 Contributing to Amazon Clone

Thank you for your interest in contributing to the Amazon Clone project! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Contribution Guidelines](#contribution-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- **Firebase CLI** (`npm install -g firebase-tools`)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/amazon-clone.git
cd amazon-clone
```

3. Add the original repository as upstream:

```bash
git remote add upstream https://github.com/XSaadiX/amazon-clone.git
```

4. Install dependencies:

```bash
npm install
cd functions
npm install
cd ..
```

## 🔄 Development Process

### Branching Strategy

We use GitHub Flow for our development process:

1. **Main Branch**: Always deployable, protected
2. **Feature Branches**: Short-lived branches for new features
3. **Hotfix Branches**: For urgent fixes to production

### Branch Naming Convention

- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/urgent-fix` - Urgent production fixes
- `docs/documentation-update` - Documentation updates
- `refactor/code-improvement` - Code refactoring

### Workflow

1. Create a new branch from `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:

```bash
git add .
git commit -m "feat: add new feature description"
```

3. Push your branch:

```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

## 📝 Contribution Guidelines

### Types of Contributions

We welcome the following types of contributions:

- **Bug fixes**: Fixing issues in the codebase
- **New features**: Adding new functionality
- **Documentation**: Improving or adding documentation
- **Performance improvements**: Optimizing code performance
- **UI/UX improvements**: Enhancing user experience
- **Testing**: Adding or improving tests
- **Refactoring**: Improving code structure without changing functionality

### What We're Looking For

- **Quality over quantity**: Well-thought-out changes are preferred
- **Backward compatibility**: Changes should not break existing functionality
- **Documentation**: New features should include appropriate documentation
- **Tests**: New functionality should include tests when applicable
- **Performance**: Changes should not significantly impact performance

## 🔍 Pull Request Process

### Before Submitting

1. **Test your changes**: Ensure all tests pass and new features work correctly
2. **Update documentation**: Update README.md or other docs if necessary
3. **Follow coding standards**: Ensure your code follows our style guidelines
4. **Rebase your branch**: Keep your branch up to date with main

### PR Requirements

1. **Descriptive title**: Use a clear, descriptive title
2. **Detailed description**: Explain what changes you made and why
3. **Link issues**: Reference any related issues
4. **Screenshots**: Include screenshots for UI changes
5. **Testing**: Describe how you tested your changes

### PR Template

```markdown
## Description

Brief description of what this PR does

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- List of changes made
- Another change
- And another

## Testing

Describe how you tested these changes

## Screenshots (if applicable)

Add screenshots here

## Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. **Automated checks**: All CI checks must pass
2. **Code review**: At least one maintainer must review and approve
3. **Testing**: Changes must be tested in the development environment
4. **Documentation**: Any necessary documentation updates must be included

## 🐛 Issue Reporting

### Before Creating an Issue

1. **Search existing issues**: Check if the issue already exists
2. **Use latest version**: Ensure you're using the latest version
3. **Minimal reproduction**: Create a minimal example that reproduces the issue

### Issue Types

#### Bug Reports

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

#### Feature Requests

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 🛠 Development Setup

### Local Development

1. **Start the frontend**:

```bash
npm run dev
```

2. **Start the backend** (in a new terminal):

```bash
cd functions
npm run serve
```

3. **Access the application**:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5001`

### Environment Variables

Create `.env.local` with your development configuration:

```env
VITE_FIREBASE_API_KEY=your_dev_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-dev-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-dev-project-id
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 🎨 Coding Standards

### TypeScript

- **Use TypeScript**: All new code should be written in TypeScript
- **Type everything**: Avoid `any` types, use proper interfaces
- **Strict mode**: Follow strict TypeScript configuration

### Code Style

- **ESLint**: Follow the ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming conventions**:
  - `camelCase` for variables and functions
  - `PascalCase` for components and types
  - `UPPER_CASE` for constants
  - `kebab-case` for file names

### Component Guidelines

```typescript
// Good component example
interface ProductProps {
  id: number;
  title: string;
  price: number;
  onAddToCart: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ id, title, price, onAddToCart }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(id);
  }, [id, onAddToCart]);

  return (
    <div className='product'>
      <h3>{title}</h3>
      <p>${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
```

### CSS Guidelines

- **Component-scoped styles**: Each component should have its own CSS file
- **CSS custom properties**: Use CSS variables for theming
- **Mobile-first**: Write mobile-first responsive CSS
- **BEM methodology**: Use BEM naming convention when appropriate

```css
/* Good CSS example */
.product {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.product__title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.product__price {
  color: var(--color-primary);
  font-weight: bold;
}
```

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// Component test example
describe("Product Component", () => {
  const mockProps = {
    id: 1,
    title: "Test Product",
    price: 29.99,
    onAddToCart: jest.fn(),
  };

  it("should render product information", () => {
    render(<Product {...mockProps} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("should call onAddToCart when button is clicked", () => {
    render(<Product {...mockProps} />);

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(mockProps.onAddToCart).toHaveBeenCalledWith(1);
  });
});
```

### Integration Tests

```typescript
// API test example
describe("Payment API", () => {
  it("should create payment intent", async () => {
    const response = await request(app)
      .post("/payments/create")
      .send({ total: 2999 })
      .expect(200);

    expect(response.body.clientSecret).toBeDefined();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏷 Commit Guidelines

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples

```bash
feat: add product search functionality
fix: resolve cart total calculation issue
docs: update README with new installation steps
style: format code according to prettier rules
refactor: extract payment logic into separate service
perf: optimize product list rendering
test: add unit tests for checkout component
chore: update dependencies to latest versions
```

## 🆘 Getting Help

If you need help with contributing:

1. **Check existing issues**: Look for similar questions or issues
2. **Join discussions**: Participate in GitHub Discussions
3. **Ask questions**: Create an issue with the `question` label
4. **Contact maintainers**: Reach out to project maintainers

## 🙏 Recognition

Contributors will be recognized in the following ways:

- **Contributors section**: Listed in README.md
- **Release notes**: Mentioned in release notes for significant contributions
- **GitHub profile**: Contributions visible on your GitHub profile

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Thank you for contributing to Amazon Clone! Your efforts help make this project better for everyone. 🎉
