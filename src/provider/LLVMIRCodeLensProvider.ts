import { CancellationToken, CodeLens, CodeLensProvider, Event, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRCodeLensVisitor } from "../visitor/LLVMIRCodeLensVisitor";


export class LLVMIRCodeLensProvider implements CodeLensProvider {
  onDidChangeCodeLenses?: Event<void> | undefined;
  provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);

    const visitor = new LLVMIRCodeLensVisitor();
    const data = documents.getAllData(document.uri);
    if (data) {
      const { ast } = data;

      try {
        ast.accept(visitor);
      } catch (err) { console.log(err); }

      return visitor.getCodelens();
    }
    else {
      throw new Error('file not found');
    }
  }
}




