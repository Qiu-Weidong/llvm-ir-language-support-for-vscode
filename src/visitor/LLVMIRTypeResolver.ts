import { LLVMIRBasicTypeResolver } from "./LLVMIRBasicTypeResolver";
import { Scope } from "./LLVMIRScope";


export class LLVMIRTypeResolver extends LLVMIRBasicTypeResolver {
  protected scope: Scope;
  constructor(scope: Scope) {
    super();
    this.scope = scope;
  }
}


