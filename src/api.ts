import type * as vscode from 'vscode';

import type { HOST_API_VERSION } from './constants';

export interface ChatTurnCompletedEvent {
  roleId: string;
  sessionId: string;
  userText: string;
  reply: string;
  roleName: string;
}

export interface KernelReadyEvent {
  mode: 'attached' | 'spawned' | 'offline';
  apiPort: number;
}

export interface EditorContextSnapshot {
  relativePath?: string;
  languageId?: string;
  hasSelection: boolean;
  chipLabel: string;
}

export interface ChatTurnSnapshot {
  userText: string;
  assistantText: string;
}

export type WorkspaceWriteMode = 'append' | 'write';

export interface WorkspaceWriteRequest {
  /** Absolute path inside the workspace root. */
  absolutePath: string;
  content: string;
  mode: WorkspaceWriteMode;
  /** Workspace-relative posix path for glob whitelist check. */
  relativePosix: string;
  allowedGlobs: string[];
}

export interface WorkspaceWriteResult {
  ok: boolean;
  message: string;
  filePath?: string;
}

export interface KernelClientFacade {
  bridgeDispatch(
    command: string,
    params: Record<string, unknown>,
  ): Promise<{ ok: boolean; data?: Record<string, unknown>; error?: { code: string; message: string } }>;
}

export interface ChatToolbarAction {
  id: string;
  label: string;
  command: string;
  icon?: string;
  title?: string;
}

export interface ChatToolbarActionSnapshot {
  id: string;
  label: string;
  command: string;
  icon?: string;
  title?: string;
}

export interface OcliveHostApi {
  readonly apiVersion: typeof HOST_API_VERSION;
  onChatTurnCompleted: vscode.Event<ChatTurnCompletedEvent>;
  onKernelReady: vscode.Event<KernelReadyEvent>;
  getEditorContext(): EditorContextSnapshot;
  getRolePackPath(): string | undefined;
  getRecentTurn(): ChatTurnSnapshot | undefined;
  requestWorkspaceWrite(req: WorkspaceWriteRequest): Promise<WorkspaceWriteResult>;
  getKernelClient(): KernelClientFacade;
  registerChatToolbarAction(action: ChatToolbarAction): vscode.Disposable;
}
