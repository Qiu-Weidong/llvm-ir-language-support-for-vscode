import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, Location, Position, ProviderResult, Range, ReferenceContext, ReferenceProvider, RenameProvider, SymbolInformation, TextDocument, TextEdit, WorkspaceEdit } from "vscode";
import { LLVMCache } from "../LLVMCache";

export class LLVMIRSymbolProvider
  implements DocumentSymbolProvider, RenameProvider, ReferenceProvider {


  provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    // 首先确定是什么符号 函数、comdat、attrgroup、变量、参数、自定义类型、metadata
    const data = documents.getAllData(document.uri);
    if (data) {
      const { symbols } = data;
      const symbol = symbols.find(item => item.range.contains(position));
      if (symbol)
        return symbols.filter(item => item.name === symbol.name && item.detail === symbol.detail).map(item => new Location(document.uri, item.range));
    }
    else {
      throw new Error('file not found');
    }
  }
  provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);

    const data = documents.getAllData(document.uri);
    if (data) {
      const { symbols } = data;
      const symbol = symbols.find(item => item.range.contains(position));
      if(! symbol) throw new Error('no Symbol at this positon');
      let result = new WorkspaceEdit();
      const edits = symbols.filter(item => item.name == symbol.name && item.detail == symbol.detail).map(item =>
        new TextEdit(item.range, newName)
      );
      result.set(document.uri, edits);
      return result;
    }
    else {
      throw new Error('file not found');
    }
  }
  prepareRename?(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Range | { range: Range; placeholder: string; }> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    const data = documents.getAllData(document.uri);
    if (data) {
      const { symbols } = data;
      const symbol = symbols.find(item => item.range.contains(position));
      if (symbol)
        return symbol.range;
    }
    else {
      throw new Error('file not found');
    }
  }
  provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    const data = documents.getAllData(document.uri);
    if (data) {
      const { symbols } = data;
      return symbols;
    }
    else {
      throw new Error('file not found');
    }
  }

}



