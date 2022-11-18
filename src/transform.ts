import { transform } from 'esbuild'
import { MdxOptions } from './types'
import { assertImportExists } from './imports'

export function createTransformer(root: string, namedImports = {}) {
  const mdxImport = import('@mdx-js/mdx')
  const imports = Object.entries(namedImports).map(
    ([packageName, imported]) => {
      assertImportExists(packageName, root)
      return Array.isArray(imported)
        ? `import { ${imported.join(', ')} } from '${packageName}'`
        : `import ${imported} from '${packageName}'`
    }
  )

  return async function transform(code_mdx: string, mdxOptions?: MdxOptions) {
    const mdx = await mdxImport
    const code_jsx = await mdx.compile(code_mdx, mdxOptions as any)
    const code_es2019 = await jsxToES2019(String(code_jsx))
    return imports.concat('', code_es2019).join('\n')
  }
}

async function jsxToES2019(code_jsx: string) {
  // We use `esbuild` ourselves instead of letting Vite doing the esbuild transform,
  // because there don't seem to be a way to change the esbuild options for specific
  // files only: https://vitejs.dev/config/#esbuild

  /* Uncomment this to inspect the type `TransformOptions`
  type TransformOptions = Pick<Parameters<typeof esBuild.transform>, 1>[1];
  let t: TransformOptions;
  t!.format
  t!.jsxFactory
  //*/

  let { code: code_es2019 } = await transform(code_jsx, {
    loader: 'jsx',
    jsxFactory: 'mdx',
    target: 'es2019'
  })

  // TODO stabilize this bugfix
  code_es2019 = code_es2019.replace(
    'export default function MDXContent',
    'export default MDXContent; function MDXContent'
  )

  return code_es2019
}
