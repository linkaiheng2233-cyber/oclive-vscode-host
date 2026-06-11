import type * as vscode from 'vscode';

import type { OcliveHostApi } from './api';
import { OCLIVE_CORE_EXTENSION_ID } from './constants';

/**
 * Resolve the OCLive core extension host API.
 * Returns `undefined` when the core extension is not installed or not yet activated.
 */
export function resolveOcliveHost(): OcliveHostApi | undefined {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vscodeApi = require('vscode') as typeof vscode;
  const ext = vscodeApi.extensions.getExtension(OCLIVE_CORE_EXTENSION_ID);
  if (!ext) {
    return undefined;
  }
  return ext.exports as OcliveHostApi | undefined;
}
