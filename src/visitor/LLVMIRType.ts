
export abstract class LLVMIRType {
  // 类型名称 如 void、i32、vector、half
  protected name: string;
  constructor(name: string) { this.name = name; }

  getName(): string { return this.name; }

  // 检查两个类型是否完全相同
  abstract isSameType(other: LLVMIRType): boolean;
  // 检查两个类型是否能够兼容
  abstract isCompatibleTo(other: LLVMIRType): boolean;

  isDefined(): boolean {
    return ! (this instanceof UndefinedType);
  }
  containsUndefined(): boolean {
    return false;
  }
}

export class VoidType extends LLVMIRType {

  constructor() {
    super('void');
  }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof VoidType;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    return this.isSameType(other);
  }
}

// 没有定义的结构体，可以认为他兼容所有的结构体
export class OpaqueType extends LLVMIRType {
  constructor() { super('opaque'); }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof OpaqueType;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    // 兼容 Opaque 和 任何结构体
    return other instanceof (StructType) || other instanceof (OpaqueType);
  }
}


export class IntType extends LLVMIRType {
  protected size: number;
  constructor(size: number) { super(`i${size}`); this.size = size; }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof IntType)) return false;
    return this.size === other.size;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    return this.isSameType(other);
  }

  getSize() { return this.size; }
}

export class FloatType extends LLVMIRType {
  constructor(kind: string) { super(kind); }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof FloatType)) return false;
    return this.name === other.name;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    return this.isSameType(other);
  }
}

export class LabelType extends LLVMIRType {
  constructor() { super('label'); }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof LabelType;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    return other instanceof LabelType;
  }
}

export class MMXType extends LLVMIRType {
  constructor() { super('x86_mmx'); }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof MMXType;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    return other instanceof MMXType;
  }
}

export class TokenType extends LLVMIRType {
  constructor() { super('token'); }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof TokenType;
  }

  isCompatibleTo(other: LLVMIRType): boolean {

    return other instanceof TokenType;
  }
}

export class MetadataType extends LLVMIRType {
  constructor() { super('metadata'); }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof MetadataType;
  }

  isCompatibleTo(other: LLVMIRType): boolean {

    return other instanceof MetadataType;
  }
}

export class OpaquePointerType extends LLVMIRType {
  protected addrSpace: number | undefined;
  constructor(addrSpace?: number) {
    if (addrSpace)
      super(`ptr addrspace(${addrSpace})`);
    else super('ptr');
    this.addrSpace = addrSpace;
  }

  isSameType(other: LLVMIRType): boolean {
    return other instanceof OpaquePointerType && !(other instanceof PointerType) && this.addrSpace === other.addrSpace;
  }

  isCompatibleTo(other: LLVMIRType): boolean {

    if (other instanceof OpaquePointerType || other instanceof PointerType) return this.addrSpace === other.addrSpace;
    return false;
  }

  getAddrSpace() { return this.addrSpace; }
}

export class VectorType extends LLVMIRType {
  protected length: number;
  protected scalable: boolean;
  protected baseType: LLVMIRType;

  getBaseType() {
    return this.baseType;
  }

  setBaseType(type: LLVMIRType) {
    this.baseType = type;
  }

  isScalable() { return this.scalable; }
  getLength() { return this.length; }

  containsUndefined(): boolean {
    return ! this.baseType.isDefined();
  }

  constructor(length: number, scalable: boolean, baseType: LLVMIRType) {
    const name = scalable ? `<vscale x ${length} x ${baseType.getName()}>`
      : `<${length} x ${baseType.getName()}>`;
    super(name);
    this.length = length;
    this.scalable = scalable;
    this.baseType = baseType;
  }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof VectorType)) return false;
    return this.length === other.length && this.scalable === other.scalable
      && this.baseType.isSameType(other.baseType);
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    if (!(other instanceof VectorType)) return false;
    return this.length === other.length && this.scalable === other.scalable
      && this.baseType.isCompatibleTo(other.baseType);
  }
}
export class ArrayType extends LLVMIRType {
  protected length: number;
  protected baseType: LLVMIRType;

  getLength() { return this.length; }

  constructor(length: number, baseType: LLVMIRType) {
    super(`[${length} x ${baseType.getName()}]`);
    this.length = length;
    this.baseType = baseType;
  }
  containsUndefined(): boolean {
    return ! this.baseType.isDefined();
  }

  getBaseType() {
    return this.baseType;
  }

  setBaseType(type: LLVMIRType) {
    this.baseType = type;
  }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof ArrayType)) return false;
    return this.length === other.length && this.baseType.isSameType(other.baseType);
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    if (!(other instanceof ArrayType)) return false;
    return this.length === other.length && this.baseType.isCompatibleTo(other.baseType);
  }
}
export class StructType extends LLVMIRType {
  protected packed: boolean;
  protected members: LLVMIRType[];

  isPacked() { return this.packed; }
  getMembers() { return this.members; }
  containsUndefined(): boolean {
    for(const member of this.members) {
      if(! member.isDefined()) return true;
    }
    return false;
  }

  private resetName() {
    let name = '';
    this.members.forEach(t => name += t.getName() + ',');
    name = this.packed ? `<{${name}}>` : `{${name}}`;
    this.name = name;
  }

  constructor(packed: boolean = false, members: LLVMIRType[] = []) {
    super('struct');
    this.packed = packed;
    this.members = members;
    this.resetName();
  }

  addMember(baseType: LLVMIRType) {
    this.members.push(baseType);
    this.resetName();
  }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof StructType)) return false;
    else if (other.packed !== this.packed || this.members.length !== other.members.length) return false;
    for (let i = 0; i < this.members.length; i++) {
      if (!this.members[i].isSameType(other.members[i])) return false;
    }
    return true;
  }

  isCompatibleTo(other: LLVMIRType): boolean {
    // 兼容 opaque 类型
    if (other instanceof OpaqueType) return true;
    else if (!(other instanceof StructType)) return false;
    else if (other.packed !== this.packed || this.members.length !== other.members.length) return false;
    for (let i = 0; i < this.members.length; i++) {
      if (!this.members[i].isCompatibleTo(other.members[i])) return false;
    }
    return true;
  }
}
export class FuncType extends LLVMIRType {
  protected retType: LLVMIRType;
  protected vaarg: boolean;
  protected params: LLVMIRType[];

  getRetType() { return this.retType; }
  getParams() { return this.params; }
  setRetType(type: LLVMIRType) { this.retType = type; }
  isVaarg() { return this.vaarg; }

  containsUndefined(): boolean {
    if( ! this.retType.isDefined()) return true;
    for(const param of this.params) {
      if(! param.isDefined()) return true;
    }
    return false;
  }

  resetName() {
    let name = this.retType.getName() + '(';
    this.params.forEach(param => name += param.getName() + ',');
    if (this.vaarg) name += '...';
    name += ')';
    this.name = name;
  }
  constructor(retType: LLVMIRType, params: LLVMIRType[], vaarg: boolean = false) {
    super('func');
    this.retType = retType;
    this.vaarg = vaarg;
    this.params = params;
    this.resetName();
  }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof FuncType)) return false;
    else if (!this.retType.isSameType(other.retType)) return false;
    else if (this.vaarg !== other.vaarg || this.params.length !== other.params.length) return false;
    for (let i = 0; i < this.params.length; i++) {
      if (!this.params[i].isSameType(other.params[i])) return false;
    }
    return true;
  }

  isCompatibleTo(other: LLVMIRType): boolean {

    if (!(other instanceof FuncType)) return false;
    else if (!this.retType.isCompatibleTo(other.retType)) return false;
    else if (this.vaarg !== other.vaarg || this.params.length !== other.params.length) return false;
    for (let i = 0; i < this.params.length; i++) {
      if (!this.params[i].isCompatibleTo(other.params[i])) return false;
    }
    return true;
  }
}
export class PointerType extends OpaquePointerType {
  protected baseType: LLVMIRType;

  getBaseType() { return this.baseType; }
  setBaseType(type: LLVMIRType) { this.baseType = type; }
  containsUndefined(): boolean {
    return ! this.baseType.isDefined();
  }

  private resetName() {
    if (this.addrSpace)
      this.name = `${this.baseType.getName()} addrspace(${this.addrSpace}) *`;
    else {
      this.name = `${this.baseType.getName()} *`;
    }
  }

  constructor(baseType: LLVMIRType, addrSpace?: number) {
    super(addrSpace);
    this.baseType = baseType;
    this.resetName();
  }

  isSameType(other: LLVMIRType): boolean {
    if (!(other instanceof PointerType)) return false;
    return this.addrSpace === other.addrSpace && this.baseType.isSameType(other.baseType);
  }

  isCompatibleTo(other: LLVMIRType): boolean {

    if (other instanceof OpaquePointerType && !(other instanceof PointerType)) return other.isCompatibleTo(this);
    else if (other instanceof PointerType) this.baseType.isCompatibleTo(other.baseType) && this.addrSpace === other.addrSpace;
    return false;
  }
}

// 如果 named type 暂未定义。
export class UndefinedType extends LLVMIRType {
  isSameType(other: LLVMIRType): boolean {
    throw new Error("Method not implemented.");
  }
  isCompatibleTo(other: LLVMIRType): boolean {
    throw new Error("Method not implemented.");
  }
  
}

