# @oclive/vscode-host

OCLive VS Code **宿主 API 契约**（v1）—— 类型、`HOST_API_VERSION` 与 `resolveOcliveHost()` 运行时。

第三方渗透插件或工作区扩展 **只依赖本 npm 包**，无需复制类型或硬编码扩展 ID。

## 安装

```bash
npm install @oclive/vscode-host
```

开发期可 `file:../oclive-vscode-host` 链接姊妹仓。

## 最小示例

```typescript
import {
  HOST_API_VERSION,
  resolveOcliveHost,
  type ChatTurnCompletedEvent,
} from '@oclive/vscode-host';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
  const host = resolveOcliveHost();
  if (!host) {
    void vscode.window.showWarningMessage('请先安装 OCLive 核心扩展 (oclive.oclive-vscode)');
    return;
  }
  if (host.apiVersion !== HOST_API_VERSION) {
    void vscode.window.showWarningMessage('OCLive 宿主 API 版本不匹配，请升级扩展');
    return;
  }

  context.subscriptions.push(
    host.onChatTurnCompleted((e: ChatTurnCompletedEvent) => {
      console.log('turn completed', e.roleId, e.reply.slice(0, 40));
    }),
  );
}
```

## API 概览

| 成员 | 说明 |
|------|------|
| `onChatTurnCompleted` | 成功聊天回合后触发 |
| `onKernelReady` | 内核 attach/spawn 就绪 |
| `getEditorContext()` | 当前编辑器上下文快照 |
| `getRolePackPath()` | 有效角色包目录 |
| `getRecentTurn()` | 最近一轮 user/assistant |
| `requestWorkspaceWrite()` | 白名单 + 授权写盘 |
| `getKernelClient()` | `bridgeDispatch` 等薄封装 |
| `registerChatToolbarAction()` | Chat 顶栏动态按钮 |

完整说明见姊妹仓 `oclive-vscode/docs/HOST_API_V1.md`。

## 版本

- npm `0.1.0` ↔ `HOST_API_VERSION = 1`
- Breaking API → npm major + 文档同步
