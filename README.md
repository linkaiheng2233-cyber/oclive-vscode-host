# @oclive/vscode-host

OCLive VS Code 扩展的 TypeScript Host API 契约：类型、`HOST_API_VERSION` 与 `resolveOcliveHost()`。它供可选的工作区伴随插件接入核心扩展，不是角色运行时或推理后端。

The source-linked Host API for OCLive VS Code extensions. The package version and Host API compatibility version are separate concepts.

## 当前接入方式：源码依赖

目前使用同级克隆和 `file:` 依赖接入；npm 对外发布另行安排。先构建本包，再安装依赖它的核心扩展或插件：

```bash
git clone https://github.com/linkaiheng2233-cyber/oclive-vscode-host.git
cd oclive-vscode-host
npm ci
npm run build
npm test
```

消费方的 `package.json` 使用源码链接：

```json
{
  "dependencies": {
    "@oclive/vscode-host": "file:../oclive-vscode-host"
  }
}
```

## 契约与示例

- [公开 API 类型](src/api.ts)与[版本常量](src/constants.ts)是本仓源码入口。
- [最小伴随插件示例](examples/minimal-penetration/README.md)展示如何消费 API。
- [Host API 文档](https://github.com/linkaiheng2233-cyber/oclive-vscode/blob/master/docs/HOST_API_V1.md)解释核心扩展提供的事件、上下文、受授权写盘与工具栏扩展。

本仓源码包为 `0.1.0`，当前 `HOST_API_VERSION = 1`。消费方需要检查核心扩展是否存在及其 API 兼容性；API 解析成功不代表推理后端已经就绪。

## 相关仓库与反馈

[核心扩展](https://github.com/linkaiheng2233-cyber/oclive-vscode) · [官方日记／来信插件](https://github.com/linkaiheng2233-cyber/oclive-vscode-penetration) · [A.I.Live](https://github.com/linkaiheng2233-cyber/oclivenewnew)

问题请提交 [Issue](https://github.com/linkaiheng2233-cyber/oclive-vscode-host/issues)。公开契约变更需要同步核心扩展和消费插件；包元数据见 [package.json](package.json)。


<!-- Preserve previously published section bookmarks. -->
<a id="安装"></a>
<a id="npm-发布维护者"></a>
<a id="最小示例"></a>
<a id="api-概览"></a>
<a id="版本"></a>

旧版章节书签保留在此。[整理前的首页](https://github.com/linkaiheng2233-cyber/oclive-vscode-host/blob/da07589e69013b1d8b43937ce3bac5d5ae62638a/README.md)可用于查阅历史说明；现行入口以本页与所链文档为准。
