import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { HOST_API_VERSION, OCLIVE_CORE_EXTENSION_ID } from './constants';

describe('@oclive/vscode-host contract', () => {
  it('HOST_API_VERSION is 1', () => {
    assert.equal(HOST_API_VERSION, 1);
  });

  it('OCLIVE_CORE_EXTENSION_ID matches core publisher.id', () => {
    assert.equal(OCLIVE_CORE_EXTENSION_ID, 'oclive.oclive-vscode');
  });
});
