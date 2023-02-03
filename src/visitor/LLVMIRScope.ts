import { LLVMIRType } from "./LLVMIRType";
import { LLVMEitity } from "./LLVMIREntity";

// 符号表查询接口
export interface Scope {
  getNamedType(name: string): LLVMIRType | undefined;
  getComdat(name: string): string | undefined;
  getAttrGroup(name: string): string | undefined;
  getMetadata(name: string): string | undefined;


  getEntity(name: string): LLVMEitity | undefined;
  containsLabel(name: string): boolean;


  addLabel(name: string): void ;
  addNamedType(name: string, namedType: LLVMIRType): void;
  addComdat(name: string, content: string): void;
  addAttrGroup(name: string, content: string): void;
  addMetadata(name: string, content: string): void;

  addEntity(name: string, entity: LLVMEitity): void;
}

export class GlobalScope implements Scope {
  // 需要保存类型定义、comdat、全局变量、indirectSymbol、函数、attrgroup、metadata
  protected children: Map<string, Scope>;
  protected namedTypes: Map<string, LLVMIRType>;
  protected comdats: Map<string, string>;
  protected attrGroups: Map<string, string>;
  protected metadatas: Map<string, string>;
  
  // 变量和函数表
  protected entities: Map<string, LLVMEitity>;

  constructor() { 
    this.children = new Map(); 
    this.namedTypes = new Map();
    this.comdats = new Map();
    this.attrGroups = new Map();
    this.metadatas = new Map();
    this.entities = new Map();
  }
  addLabel(name: string): void {
    throw new Error("can't add label in global scope");
  }
  addNamedType(name: string, namedType: LLVMIRType): void {
    this.namedTypes.set(name, namedType);
  }
  addComdat(name: string, content: string): void {
    this.comdats.set(name, content);
  }
  addAttrGroup(name: string, content: string): void {
    this.attrGroups.set(name, content);
  }
  addMetadata(name: string, content: string): void {
    this.metadatas.set(name, content);
  }
  addEntity(name: string, entity: LLVMEitity): void {
    this.entities.set(name, entity);
  }
  containsLabel(name: string): boolean {
    return false;
  }
  getNamedType(name: string): LLVMIRType | undefined {
    return this.namedTypes.get(name);
  }
  getComdat(name: string): string | undefined {
    return this.comdats.get(name);
  }
  getAttrGroup(name: string): string | undefined {
    return this.attrGroups.get(name);
  }
  getMetadata(name: string): string | undefined {
    return this.metadatas.get(name);
  }
  getEntity(name: string): LLVMEitity | undefined {
    return this.entities.get(name);
  }

  addScope(name: string, scope: Scope) {
    this.children.set(name, scope);
  }

  removeScope(name: string) {
    this.children.delete(name);
  }

  containsScope(name: string): boolean {
    return this.children.has(name);
  }

  getScope(name: string): Scope | undefined {
    return this.children.get(name);
  }
}

export class LocalScope implements Scope {
  protected parent: Scope;
  protected entities: Map<string, LLVMEitity>;
  protected labels: Set<string>;

  constructor(parent: Scope) { 
    this.parent = parent; 
    this.entities = new Map();
    this.labels = new Set();
  }


  containsLabel(name: string): boolean {
    return this.labels.has(name);
  }
  getNamedType(name: string): LLVMIRType | undefined {
    return this.parent.getNamedType(name);
  }
  getComdat(name: string): string | undefined {
    return this.parent.getComdat(name);
  }
  getAttrGroup(name: string): string | undefined {
    return this.parent.getAttrGroup(name);
  }
  getMetadata(name: string): string | undefined {
    return this.parent.getMetadata(name);
  }
  getEntity(name: string): LLVMEitity | undefined {
    return this.entities.get(name) || this.parent.getEntity(name);
  }


  addLabel(name: string): void {
    this.labels.add(name);
  }
  addNamedType(name: string, namedType: LLVMIRType): void {
    this.parent.addNamedType(name, namedType);
  }
  addComdat(name: string, content: string): void {
    this.parent.addComdat(name, content);
  }
  addAttrGroup(name: string, content: string): void {
    this.parent.addAttrGroup(name, content);
  }
  addMetadata(name: string, content: string): void {
    this.parent.addMetadata(name, content);
  }
  addEntity(name: string, entity: LLVMEitity): void {
    this.entities.set(name, entity);
  }
}




