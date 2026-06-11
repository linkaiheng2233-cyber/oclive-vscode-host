# minimal-penetration · 第三方渗透样例

约 80 行：订阅 `onChatTurnCompleted`，将每轮摘要追加到 `notes/whisper.md`。

## 依赖

- 已安装 `oclive.oclive-vscode` ^0.4.0
- `@oclive/vscode-host` ^0.1.0

## 核心代码（`src/extension.ts`）

```typescript
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
      if (!folder) return;
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
```

## F5

将本目录作为独立扩展打开，或并入三仓 workspace；核心扩展须已激活。
