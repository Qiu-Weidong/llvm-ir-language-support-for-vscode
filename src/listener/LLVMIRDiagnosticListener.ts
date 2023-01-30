import { ANTLRErrorListener } from "antlr4ts/ANTLRErrorListener";
import { Diagnostic, DiagnosticSeverity, Position, Range } from "vscode";
import { Recognizer, RecognitionException } from 'antlr4ts';


export class LLVMIRDiagnosticListener<TSymbol> implements ANTLRErrorListener<TSymbol> {
  diagnostics: Diagnostic[];

  constructor(diagnostics: Diagnostic[]) {
    this.diagnostics = diagnostics;
  }


  syntaxError<T extends TSymbol>(
    recognizer: Recognizer<T, any>,
    offendingSymbol: T | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined) {

    const len = e?.context?.text?.length || 1;
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Error,
      range: new Range(
        new Position(line - 1, charPositionInLine),
        new Position(line - 1, charPositionInLine + len)
      ),
      message: msg,
      source: 'llvm-ir'
    };
    this.diagnostics.push(diagnostic);
  }
} 