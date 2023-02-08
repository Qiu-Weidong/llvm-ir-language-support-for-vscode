import { CancellationToken, DocumentSemanticTokensProvider, Event, ProviderResult, SemanticTokens, SemanticTokensBuilder, SemanticTokensEdits, SemanticTokensLegend, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRSemanticTokensVisitor } from "../visitor/LLVMIRSemanticTokensVisitor";



export class LLVMIRSemanticTokensProvider implements DocumentSemanticTokensProvider {
  readonly legend = new SemanticTokensLegend(
    [
      'namespace', 'class', 'enum', 'interface', 'struct',
      'typeParameter', 'type', 'parameter', 'variable',
      'property', 'enumMember', 'decorator',
      'event', 'function', 'method', 'macro', 'label', 'comment',
      'string', 'keyword', 'number', 'regexp', 'operator',
    ],
    [
      'declaration', 'definition', 'readonly', 'static', 'deprecated',
      'abstract', 'async', 'modification', 'documentation', 'defaultLibrary',
    ]
  );
  onDidChangeSemanticTokens?: Event<void> | undefined;
  provideDocumentSemanticTokens(document: TextDocument, _token: CancellationToken): ProviderResult<SemanticTokens> {
    // 首先更新文档
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);

    const builder = new SemanticTokensBuilder(this.legend);
    const visitor = new LLVMIRSemanticTokensVisitor(builder);

    const data = documents.getAllData(document.uri);
    if (data) {
      const { ast } = data;

      try {
        ast.accept(visitor);
      } catch (err) { console.log(err); }

      return builder.build();
    }
    else {
      throw new Error('file not found');
    }
  }
}

