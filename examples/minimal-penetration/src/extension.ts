import * as path from 'path';
import * as vscode from 'vscode';
import { HOST_API_VERSION, resolveOcliveHost } from '@oclive/vscode-host';

export function activate(context: vscode.ExtensionContext): void {
  const host = resolveOcliveHost();
  if (!host || host.apiVersion !== HOST_API_VERSION) {
    return;
  }

  context.subscriptions.push(
    host.onChatTurnCompleted(async (e) => {
      const folder = vscode.workspace.workspaceFolders?.[0];
      if (!folder) {
        return;
      }
      const filePath = path.join(folder.uri.fsPath, 'notes', 'whisper.md');
      const line = `- [${e.roleId}] 你：${e.userText.slice(0, 80)} → ${e.reply.slice(0, 80)}\n`;
      await host.requestWorkspaceWrite({
        absolutePath: filePath,
        content: line,
        mode: 'append',
        relativePosix: 'notes/whisper.md',
        allowedGlobs: ['notes/**', '.oclive/**'],
      });
    }),
  );
}

export function deactivate(): void {}
