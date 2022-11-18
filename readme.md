# Vite Plugin MDX

Vite plugin to use [MDX](https://mdxjs.com) with your app.

Features:

- Works with React and Preact.
- HMR support.
- SSR support.
- Plugin support, such as [remark-frontmatter](https://github.com/remarkjs/remark-frontmatter).

## Getting Started

Caveats:

- If you would like to use typechecking, you'll need to use Typescript 5 or later, which is in beta at the time of writing.
- This plugin adds a handler for using the `file://` protocol in import statements. This cannot be disabled at this time.

### Install

This package & peer dependency:
```sh
 npm install vite-plugin-mdx @mdx-js/mdx
```

React/Preact integration:
```sh
npm install @mdx-js/react
# or
npm install @mdx-js/preact
```

### Configure the plugin

```js
// vite.config.js
import mdx from 'vite-plugin-mdx'

// `options` are passed to `@mdx-js/mdx`
const options = {
  // See https://mdxjs.com/advanced/plugins
  remarkPlugins: [
    // E.g. `remark-frontmatter`
  ],
  rehypePlugins: [],
}

export default {
  plugins: [mdx(options)]
}
```

### Start using MDX in your app

```mdx-js
// hello.mdx

import { Counter } from './Counter.jsx'

# Hello

This text is written in Markdown.

MDX allows Rich React components to be used directlin Markdown: <Counter/>
```

```jsx
// Counter.jsx

import React, { useState } from 'react'

export { Counter }

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Counter: {count}
    </button>
  )
}
```

## Examples

- [React example](/examples/react/).
- [Preact example](/examples/preact/).

## File-specific options

To define options a per-file basis, you can pass a function to the `mdx` plugin factory.

```ts
mdx((filename) => {
  // Any options passed to `mdx` can be returned.
  return {
    remarkPlugins: [
      // Enable a plugin based on the current file.
      /\/components\//.test(filename) && someRemarkPlugin,
    ]
  }
})
```

## Pre-built transclusion

To embed an `.mdx` or `.md` file into another, you can import it without naming its export. The file extension is required. Remark plugins are applied to the imported file before it's embedded.

```mdx
import '../foo/bar.mdx'
```
