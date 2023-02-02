
export abstract class LLVMType {
  // 类型名称 如 void、i32、vector、half
  protected name: string;
  constructor(name: string) { this.name = name; }

  getName(): string { return this.name; }

  // 检查两个类型是否完全相同
  abstract isSameType(other: LLVMType): boolean;
}

export class VoidType extends LLVMType {
  constructor() {
    super('void');
  }

  isSameType(other: LLVMType): boolean {
    return other instanceof VoidType;
  }
}

// 没有定义的结构体，可以认为他兼容所有的结构体
export class OpaqueType extends LLVMType {
  constructor() { super('opaque'); }

  isSameType(other: LLVMType): boolean {
    return other instanceof OpaqueType;
  }
}


export class IntType extends LLVMType {
  protected size: number;
  constructor(size: number) { super(`i${size}`); this.size = size; }

  isSameType(other: LLVMType): boolean {
    if (!(other instanceof IntType)) return false;
    return this.size === other.size;
  }
}

export class FloatType extends LLVMType {
  constructor(kind: string) { super(kind); }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof FloatType)) return false;
    return this.name === other.name;
  }
}

export class VectorType extends LLVMType {
  protected length: number;
  protected scalable: boolean;
  protected baseType: LLVMType;

  constructor(length: number, scalable: boolean, baseType: LLVMType) {
    const name = scalable ? `<vscale x ${length} x ${baseType.getName()}>`
      : `<${length} x ${baseType.getName()}>`;
    super(name);
    this.length = length;
    this.scalable = scalable;
    this.baseType = baseType;
  }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof VectorType)) return false;
    return this.length === other.length && this.scalable === other.scalable
      && this.baseType.isSameType(other.baseType);
  }
}

export class LabelType extends LLVMType {
  constructor() { super('label'); }

  isSameType(other: LLVMType): boolean {
    return other instanceof LabelType;
  }
}

export class ArrayType extends LLVMType {
  protected length: number;
  protected baseType: LLVMType;

  constructor(length: number, baseType: LLVMType) {
    super(`[${length} x ${baseType.getName()}]`);
    this.length = length;
    this.baseType = baseType;
  }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof ArrayType)) return false;
    return this.length === other.length && this.baseType.isSameType(other.baseType);
  }
}

export class StructType extends LLVMType {
  protected packed: boolean;
  protected members: LLVMType[];

  private resetName() {
    let name = '';
    this.members.forEach(t => name += t.getName() + ',');
    name = this.packed ? `<{${name}}>` : `{${name}}`;
    this.name = name;
  }

  constructor(packed: boolean = false, members: LLVMType[] = []) {
    super('struct');
    this.packed = packed;
    this.members = members;
    this.resetName();
  }

  addMember(baseType: LLVMType) {
    this.members.push(baseType);
    this.resetName();
  }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof StructType)) return false;
    else if(other.packed !== this.packed || this.members.length !== other.members.length) return false;
    for(let i=0; i<this.members.length; i++) {
      if(! this.members[i].isSameType(other.members[i])) return false;
    }
    return true;
  }
}

export class NamedType extends LLVMType {
  protected realType: LLVMType
  constructor(name: string, realType: LLVMType) {
    super(name);
    this.realType = realType;
  }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof NamedType)) return false;
    return this.name === other.name;
  }
}

export class MMXType extends LLVMType {
  constructor() { super('x86_mmx'); }

  isSameType(other: LLVMType): boolean {
    return other instanceof MMXType;
  }
}

export class TokenType extends LLVMType {
  constructor() { super('token'); }

  isSameType(other: LLVMType): boolean {
    return other instanceof TokenType;
  }
}

export class MetadataType extends LLVMType {
  constructor() { super('metadata'); }

  isSameType(other: LLVMType): boolean {
    return other instanceof MetadataType;
  }
}

export class FuncType extends LLVMType {
  protected retType: LLVMType;
  protected vaarg: boolean;
  protected params: LLVMType[];

  resetName() {
    let name = this.retType.getName() + '(';
    this.params.forEach(param => name += param.getName() + ',');
    if (this.vaarg) name += '...';
    name += ')';
    this.name = name;
  }
  constructor(retType: LLVMType, params: LLVMType[], vaarg: boolean = false) {
    super('func');
    this.retType = retType;
    this.vaarg = vaarg;
    this.params = params;
    this.resetName();
  }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof FuncType)) return false;
    else if(! this.retType.isSameType(other.retType)) return false;
    else if(this.vaarg !== other.vaarg || this.params.length !== other.params.length) return false;
    for(let i=0; i<this.params.length; i++) {
      if(! this.params[i].isSameType(other.params[i])) return false;
    }
    return true;
  }
}

export class OpaquePointerType extends LLVMType {
  protected addrSpace: number | undefined;
  constructor(addrSpace?: number) {
    if (addrSpace)
      super(`ptr addrspace(${addrSpace})`);
    else super('ptr');
    this.addrSpace = addrSpace;
  }

  isSameType(other: LLVMType): boolean {
    return other instanceof OpaquePointerType && !(other instanceof PointerType) && this.addrSpace === other.addrSpace;
  }
}

export class PointerType extends OpaquePointerType {
  protected baseType: LLVMType;

  private resetName() {
    if (this.addrSpace)
      this.name = `${this.baseType.getName()} addrspace(${this.addrSpace}) *`;
    else {
      this.name = `${this.baseType.getName()} *`;
    }
  }

  constructor(baseType: LLVMType, addrSpace?: number) {
    super(addrSpace);
    this.baseType = baseType;
    this.resetName();
  }

  isSameType(other: LLVMType): boolean {
    if(! (other instanceof PointerType)) return false;
    return this.addrSpace === other.addrSpace && this.baseType.isSameType(other.baseType);
  }
}


