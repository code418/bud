import type {Bud} from '@roots/bud-framework'

import {BudError} from '@roots/bud-support/errors'

export interface tapAsync<T = Bud> {
  (fn: (app: Bud) => Promise<unknown>): Promise<Bud>
}

/**
 * Execute an async callback
 *
 * @remarks
 * Callback is provided {@link Bud | the Bud instance} as a parameter.
 *
 * @example
 * ```js
 * bud.tapAsync(async bud => {
 *   // do something with bud
 * })
 * ```
 *
 * @example
 * Lexical scope is bound to Bud where applicable, so it
 * is possible to reference the Bud using `this`.
 *
 * ```js
 * bud.tapAsync(async function () {
 *  // do something with this
 * })
 * ```
 */
export const tapAsync: tapAsync = async function (
  this: Bud,
  fn: (app: Bud) => Promise<unknown>,
): Promise<Bud> {
  await this.resolvePromises()
  await fn.call(this, this).catch(error => {
    throw BudError.normalize(`failed on tapAsync`, {
      origin: error,
    })
  })

  return this
}
