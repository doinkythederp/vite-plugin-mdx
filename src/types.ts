import type { Plugin as VitePlugin } from 'vite'
import type { Pluggable } from 'unified'
import type * as mdx from '@mdx-js/mdx' assert { 'resolution-mode': 'import' }

export type RemarkPlugin = Pluggable | false
export type RehypePlugin = Pluggable | false

export interface MdxOptions
  extends Omit<mdx.CompileOptions, 'remarkPlugins' | 'rehypePlugins'> {
  remarkPlugins?: Readonly<RemarkPlugin>[]
  rehypePlugins?: Readonly<RehypePlugin>[]
}

export interface MdxPlugin extends VitePlugin {
  mdxOptions: MdxOptions & {
    // Plugin arrays always exist when accessed by Vite plugin.
    remarkPlugins: RemarkPlugin[]
    rehypePlugins: RehypePlugin[]
  }
}
