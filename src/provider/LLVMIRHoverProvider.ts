import { CancellationToken, Hover, HoverProvider, Position, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRHoverVisitor } from "../visitor/LLVMIRHoverVisitor";

export class LLVMIRHoverProvider implements HoverProvider{
  provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    const data = documents.getAllData(document.uri);

    if (data) {
      const { ast, scope } = data;
      const visitor = new LLVMIRHoverVisitor(position, scope);
      
      try {
        ast.accept(visitor);
      } catch (err) { console.log(err); }

      return visitor.result;
    }
    else {
      throw new Error('file not found');
    }
  }

}


