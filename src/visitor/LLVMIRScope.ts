import { DocumentSymbol, Position } from "vscode";
import { LLVMIREntity } from "./LLVMIREntity";

// 符号表查询接口
export interface Scope {
  addChild(name: string, scope: Scope): void;
  getParent(): Scope;

  getNamedType(name: string): LLVMIREntity | undefined;
  getComdat(name: string): LLVMIREntity | undefined;
  getAttrGroup(name: string): LLVMIREntity | undefined;
  getMetadata(name: string): LLVMIREntity | undefined;


  getEntity(name: string): LLVMIREntity | undefined;
  getLabel(name: string): LLVMIREntity | undefined;


  addLabel(name: string, entity: LLVMIREntity): void ;
  addNamedType(name: string, namedType: LLVMIREntity): void;
  addComdat(name: string, entity: LLVMIREntity): void;
  addAttrGroup(name: string, entity: LLVMIREntity): void;
  addMetadata(name: string, entity: LLVMIREntity): void;

  addEntity(name: string, entity: LLVMIREntity): void;


  setTypeTable(types: Map<string, LLVMIREntity>): void ;
  getChild(name: string): Scope | undefined;
  getAllSymbols(): DocumentSymbol[];
  getSymbols(): DocumentSymbol[];
  getRefernces(position: Position): DocumentSymbol[];
}

export class GlobalScope implements Scope {
  // 需要保存类型定义、comdat、全局变量、indirectSymbol、函数、attrgroup、metadata
  protected children: Map<string, Scope>;
  protected namedTypes: Map<string, LLVMIREntity>;
  protected comdats: Map<string, LLVMIREntity>;
  protected attrGroups: Map<string, LLVMIREntity>;
  protected metadatas: Map<string, LLVMIREntity>;
  
  // 变量和函数表
  protected entities: Map<string, LLVMIREntity>;

  constructor() { 
    this.children = new Map(); 
    this.namedTypes = new Map();
    this.comdats = new Map();
    this.attrGroups = new Map();
    this.metadatas = new Map();
    this.entities = new Map();
  }
  getRefernces(position: Position): DocumentSymbol[] {
    for(const ty of this.namedTypes.values()) if(ty.referd(position)) return ty.getSymbols();
    for(const comdat of this.comdats.values()) if(comdat.referd(position)) return comdat.getSymbols();
    for(const attr of this.attrGroups.values()) if(attr.referd(position)) return attr.getSymbols();
    for(const metadata of this.metadatas.values()) if(metadata.referd(position)) return metadata.getSymbols();
    for(const entity of this.entities.values()) if(entity.referd(position)) return entity.getSymbols();
    
    // 再查询 localscope
    for(const child of this.children.values()) {
      const t = child.getRefernces(position);
      if(t.length > 0) return t;
    }
    return [];
  }
  getAllSymbols(): DocumentSymbol[] {
    let result: DocumentSymbol[] = this.getSymbols();
    for(const child of this.children.values()) {
      result.push(...child.getSymbols());
    }
    return result;
  }
  getSymbols(): DocumentSymbol[] {
    let result: DocumentSymbol[] = [];
    for(const ty of this.namedTypes.values()) result.push(...ty.getSymbols());
    for(const comdat of this.comdats.values()) result.push(...comdat.getSymbols());
    for(const attr of this.attrGroups.values()) result.push(...attr.getSymbols());
    for(const metadata of this.metadatas.values()) result.push(...metadata.getSymbols());
    for(const entity of this.entities.values()) result.push(...entity.getSymbols());
    return result;
  }
  getChild(name: string): Scope| undefined {
    return this.children.get(name)
  }
  getParent(): Scope {
    throw new Error("Method not implemented.");
  }
  addChild(name: string, scope: Scope): void {
    this.children.set(name, scope);
  }
  addLabel(name: string, entity: LLVMIREntity): void {
    throw new Error("can't add label in global scope");
  }
  addNamedType(name: string, namedType: LLVMIREntity): void {
    this.namedTypes.set(name, namedType);
  }
  addComdat(name: string, entity: LLVMIREntity): void {
    this.comdats.set(name, entity);
  }
  addAttrGroup(name: string, entity: LLVMIREntity): void {
    this.attrGroups.set(name, entity);
  }
  addMetadata(name: string, entity: LLVMIREntity): void {
    this.metadatas.set(name, entity);
  }
  addEntity(name: string, entity: LLVMIREntity): void {
    this.entities.set(name, entity);
  }
  
  getLabel(name: string): LLVMIREntity | undefined {
    return undefined;
  }
  getNamedType(name: string): LLVMIREntity | undefined {
    return this.namedTypes.get(name);
  }
  getComdat(name: string): LLVMIREntity | undefined {
    return this.comdats.get(name);
  }
  getAttrGroup(name: string): LLVMIREntity | undefined {
    return this.attrGroups.get(name);
  }
  getMetadata(name: string): LLVMIREntity | undefined {
    return this.metadatas.get(name);
  }
  getEntity(name: string): LLVMIREntity | undefined {
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

  setTypeTable(types: Map<string, LLVMIREntity>): void {
    this.namedTypes = types;
  }
}

export class LocalScope implements Scope {
  protected parent: Scope;
  protected entities: Map<string, LLVMIREntity>;
  protected labels: Map<string, LLVMIREntity>;

  constructor(parent: Scope) { 
    this.parent = parent; 
    this.entities = new Map();
    this.labels = new Map();
  }
  getRefernces(position: Position): DocumentSymbol[] {
    for(const label of this.labels.values()) {
      if(label.referd(position)) return label.getSymbols();
    }
    for(const entity of this.entities.values()) {
      if(entity.referd(position)) return entity.getSymbols();
    }
    return [];
  }

  getAllSymbols(): DocumentSymbol[] {
    return this.parent.getAllSymbols();
  }
  getSymbols(): DocumentSymbol[] {
    let result: DocumentSymbol[] = [];
    for(const label of this.labels.values()) {
      result.push(...label.getSymbols());
    }
    for(const entity of this.entities.values()) {
      result.push(...entity.getSymbols());
    }
    return result;
  }
  getChild(name: string): Scope | undefined {
    return this.parent.getChild(name);
  }
  getParent(): Scope {
    return this.parent;
  }
  addChild(name: string, scope: Scope): void {
    this.parent.addChild(name, scope);
  }
  setTypeTable(types: Map<string, LLVMIREntity>): void {
    this.parent.setTypeTable(types);
  }

  getLabel(name: string): LLVMIREntity | undefined {
    return this.labels.get(name);
  }
  getNamedType(name: string): LLVMIREntity | undefined {
    return this.parent.getNamedType(name);
  }
  getComdat(name: string): LLVMIREntity | undefined {
    return this.parent.getComdat(name);
  }
  getAttrGroup(name: string): LLVMIREntity | undefined {
    return this.parent.getAttrGroup(name);
  }
  getMetadata(name: string): LLVMIREntity | undefined {
    return this.parent.getMetadata(name);
  }
  getEntity(name: string): LLVMIREntity | undefined {
    return this.entities.get(name) || this.parent.getEntity(name);
  }


  addLabel(name: string, entity: LLVMIREntity): void {
    this.labels.set(name, entity);
  }
  addNamedType(name: string, namedType: LLVMIREntity): void {
    this.parent.addNamedType(name, namedType);
  }
  addComdat(name: string, entity: LLVMIREntity): void {
    this.parent.addComdat(name, entity);
  }
  addAttrGroup(name: string, entity: LLVMIREntity): void {
    this.parent.addAttrGroup(name, entity);
  }
  addMetadata(name: string, entity: LLVMIREntity): void {
    this.parent.addMetadata(name, entity);
  }
  addEntity(name: string, entity: LLVMIREntity): void {
    this.entities.set(name, entity);
  }
}




