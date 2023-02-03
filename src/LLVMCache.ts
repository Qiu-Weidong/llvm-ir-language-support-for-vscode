// llvm文件缓存

import { Diagnostic, DiagnosticCollection, languages, TextDocument, Uri } from "vscode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { LLVMIRDiagnosticListener } from "./listener/LLVMIRDiagnosticListener";
import { LLVMIRLexer } from "./llvmir/LLVMIRLexer";
import { LLVMIRParser } from "./llvmir/LLVMIRParser";
import { LLVMIRTypeDefResolver } from "./visitor/LLVMIRTypeDefResolver";
import { GlobalScope, Scope } from "./visitor/LLVMIRScope";
import { LLVMIRScopeVisitor } from "./visitor/LLVMIRScopeVisitor";


export class LLVMCache {
  private diangostics: DiagnosticCollection;
  private static instance: LLVMCache | undefined = undefined;
  private constructor() { this.documents = new Map(); this.diangostics = languages.createDiagnosticCollection(); }
  private documents: Map<string, {
    content: string, // 文档内容
    ast: ParseTree, // 语法树
    tokens: CommonTokenStream, // token 流
    scope: Scope, // 符号表
  }>;
  public static getInstance(): LLVMCache {
    if (!LLVMCache.instance) {
      LLVMCache.instance = new LLVMCache();
    }
    return LLVMCache.instance;
  }


  public addDocument(document: TextDocument) {
    let diagnostics: Diagnostic[] = [];
    const diagnosticListener = new LLVMIRDiagnosticListener(diagnostics);
    const content = document.getText().trimEnd();
    const inputStream = CharStreams.fromString(content + '\n');
    const lexer = new LLVMIRLexer(inputStream);
    lexer.removeErrorListeners();
    lexer.addErrorListener(diagnosticListener);

    const tokens = new CommonTokenStream(lexer);
    const parser = new LLVMIRParser(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(diagnosticListener);

    const ast = parser.compilationUnit();
    // 使用 LLVMIRTypeDefResolver 解析类型表
    const typeDefResolver = new LLVMIRTypeDefResolver(diagnostics);
    try { ast.accept(typeDefResolver); } catch(err) { console.log(err); }
    const types = typeDefResolver.getTypeTable();
    const scope: Scope = new GlobalScope();
    scope.setTypeTable(types);

    const scopeVisitor = new LLVMIRScopeVisitor(diagnostics, scope);
    try { ast.accept(scopeVisitor); } catch(err) { console.log(err); }

    this.documents.set(document.uri.toString(), { content, ast, tokens, scope });
    this.diangostics.set(document.uri, diagnostics);
  }

  public updateDocument(document: TextDocument) {
    const data = this.documents.get(document.uri.toString());
    if (!data) {
      this.addDocument(document);
    }
    else {
      if (data.content == document.getText().trimEnd()) {
        return;
      }
      else {
        this.documents.delete(document.uri.toString());
        this.addDocument(document);
      }

    }

  }

  public removeDocument(document: TextDocument) {
    this.documents.delete(document.uri.toString());
  }

  public renameDocument(oldUri: Uri, newUri: Uri) {
    const data = this.documents.get(oldUri.toString());
    if (data != undefined) {
      this.documents.set(newUri.toString(), data);
    }
  }

  public getAllData(uri: Uri) {
    return this.documents.get(uri.toString());
  }
}


