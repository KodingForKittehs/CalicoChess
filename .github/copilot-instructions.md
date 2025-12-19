# GitHub Copilot Instructions for CalicoChess

## Testing Requirements

**ALWAYS run the test suite after making code changes:**

```bash
cd frontend && npm run test:coverage -- --run
```

- Tests must pass before considering work complete
- Coverage thresholds must be met (85%+ lines, 83%+ functions, 88%+ branches)
- Run tests after: refactoring, adding features, fixing bugs, or modifying source code

## Project Structure

- **Frontend**: React + TypeScript + Vite application in `/frontend`
- **Backend**: Python chess engine in `/backend`
- **State Management**: React Context API with localStorage persistence
- **Testing**: Vitest with React Testing Library

## Code Standards

- Use TypeScript with strict mode
- Follow React best practices (hooks, functional components)
- Maintain test coverage above 85%
- Use `type` imports for TypeScript types (`import type { ... }`)
- Exclude test files from production builds

## State Management Pattern

The app uses React Context API for state management:
- `AppStateProvider` wraps the entire app in `main.tsx`
- Components access state via `useAppState()` hook
- State automatically persists to localStorage
- Export/import functionality for user data backup

## Testing Patterns

- Wrap test components with `renderWithProvider()` from `test/testUtils.tsx`
- Mock localStorage in tests (automatically handled in setup)
- Test both success and error paths
- Verify UI interactions and state updates

## Before Completing Work

1. ✅ Run tests: `npm run test:coverage -- --run`
2. ✅ Verify build: `npm run build`
3. ✅ Check for TypeScript errors
4. ✅ Ensure coverage meets thresholds
