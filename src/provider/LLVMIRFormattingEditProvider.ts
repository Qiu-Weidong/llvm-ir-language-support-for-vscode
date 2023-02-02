import { CancellationToken, DocumentFormattingEditProvider, FormattingOptions, ProviderResult, TextDocument, TextEdit } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRFormattingEditVisitor } from "../visitor/LLVMIRFormattingEditVisitor";




export class LLVMIRFormattingEditProvider implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    const data = documents.getAllData(document.uri);

    const visitor = new LLVMIRFormattingEditVisitor();
    if (data) {
      const { ast } = data;

      try {
        ast.accept(visitor);
      } catch (err) { console.log(err); }

      const results = visitor.getResult();

      for(const result of results) {
        console.log(result.range);
        console.log(result.newText, result.newText.length);
      }
      return visitor.getResult();
    }
    else {
      throw new Error('file not found');
    }
  }
  
}



