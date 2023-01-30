import { workspace, ExtensionContext, languages } from "vscode";
import { LLVMCache } from "./LLVMCache";
import { LLVMIRCodeLensProvider } from "./provider/LLVMIRCodeLensProvider";
import { LLVMIRCompletionItemProvider } from "./provider/LLVMIRCompletionItemProvider";
import { LLVMIRFormattingEditProvider } from "./provider/LLVMIRFormattingEditProvider";
import { LLVMIRHoverProvider } from "./provider/LLVMIRHoverProvider";
import { LLVMIRSemanticTokensProvider } from "./provider/LLVMIRSemanticTokensProvider";
import { LLVMIRSymbolProvider } from "./provider/LLVMIRSymbolProvider";

// 要先编译再运行
export function activate(context: ExtensionContext) {
  const documents = LLVMCache.getInstance();

  // workspace.findFiles('**/*.ll').then(uris => {
  //   // 获取工作空间中所有的 ll 文件, 并缓存
  //   for (const uri of uris) {
  //     workspace.openTextDocument(uri).then(document => {
  //       documents.addDocument(document);
  //     });
  //   }
  // });

  // 绑定事件
  context.subscriptions.push(
    workspace.onDidRenameFiles(e => {
      for (const file of e.files) {
        documents.renameDocument(file.oldUri, file.newUri);
      }
    }),
    workspace.onDidChangeTextDocument(e => {
      documents.updateDocument(e.document);
    })
  );

  const selector = 'llvm-ir';
  // 下面开始注册 provider
  const semanticTokensProvider = new LLVMIRSemanticTokensProvider();
  const symbolProvider = new LLVMIRSymbolProvider();
  context.subscriptions.push(
    languages.registerDocumentSemanticTokensProvider(selector, semanticTokensProvider, semanticTokensProvider.legend),
    languages.registerCodeLensProvider(selector, new LLVMIRCodeLensProvider()),
    languages.registerCompletionItemProvider(selector, new LLVMIRCompletionItemProvider()),
    languages.registerDocumentFormattingEditProvider(selector, new LLVMIRFormattingEditProvider()),
    languages.registerHoverProvider(selector, new LLVMIRHoverProvider()),
    languages.registerDocumentSymbolProvider(selector, symbolProvider),
    languages.registerReferenceProvider(selector, symbolProvider),
    languages.registerRenameProvider(selector, symbolProvider),
  );
}

export function deactivate() { }
