import { CancellationToken, DocumentFormattingEditProvider, FormattingOptions, ProviderResult, TextDocument, TextEdit } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRFormattingEditVisitor } from "../visitor/LLVMIRFormattingEditVisitor";




export class LLVMIRFormattingEditProvider implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    const data = documents.getAllData(document.uri);

    if (data) {
      const { ast, tokens } = data;
      const comments = tokens.getTokens().filter(item => item.channel != 0);
      const visitor = new LLVMIRFormattingEditVisitor(comments);
      
      try {
        ast.accept(visitor);
      } catch (err) { console.log(err); }

      return visitor.getResult();
    }
    else {
      throw new Error('file not found');
    }
  }
  
}



