import '@testing-library/jest-dom'

// Nota: jest.setup.ts é .ts (não .tsx), então JSX não é válido aqui.
// AnimatePresence usa createElement em vez de fragment JSX.
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion')
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
  const { createElement, Fragment } = require('react') as any
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: unknown }) =>
      createElement(Fragment, null, children),
    motion: new Proxy(
      {},
      {
        get: (_: unknown, tag: string) => {
          // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
          const { forwardRef } = require('react') as any
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return forwardRef(({ children, ...props }: any, ref: any) => {
            // Strip framer-motion-only props before passing to DOM element
            const {
              initial, animate, exit, variants, custom, whileHover, whileTap,
              transition, layout, layoutId, onAnimationComplete,
              ...domProps
            } = props
            return createElement(tag, { ...domProps, ref }, children)
          })
        },
      }
    ),
  }
})
