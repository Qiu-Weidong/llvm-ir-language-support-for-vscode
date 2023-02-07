import { CancellationToken, Definition, DefinitionLink, DefinitionProvider, Position, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRDefinitionVisitor } from "../visitor/LLVMIRDefinitionVisitor";

export class LLVMIRDefinitionProvider implements DefinitionProvider {
  provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | DefinitionLink[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);

    const data = documents.getAllData(document.uri);
    if (data) {
      const { ast, scope } = data;
      const visitor = new LLVMIRDefinitionVisitor(position, scope);
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


