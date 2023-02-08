; 在这里编辑
module asm "inline asm code goes here"
module asm "more can go here"  

@K = external dso_preemptable protected  dllimport  global i32 
@G = thread_local(initialexec) global i32 0, align 4

%hello = type {  i32, i64, %world }
%world = type { %hello, i32 }
%integer = type i32
; %hello = type {}

define dso_local fastcc void @main() { 
  fence acquire 
  fence syncscope("singlethread") seq_cst 
  fence syncscope("agent") seq_cst 
  %1 = call i32 @add() 
  %var1 = add i64 3, 4
  %4 = add i32 %var1, 3
  ret void 
}

%mytype = type { %mytype*, i32 }

define i32 @add() !llvm.loop !0 { 
  %var1 = add i32 1, 2
  %3 = alloca %world, align 4
  ret void 
  uselistorder i32 %arg1, { 1, 0, 2 } 
  uselistorder label %bb, { 1, 0 } 
}

declare !llvm.break !17 i64 @sub()
; 来一条注释

; 注意 不能这样使用，虽然语法不报错
attributes #0 = { #1 #2 #14 }

attributes #1 = { alwaysinline alignstack = 4 }

; named metadata
!name = ! { !0, !1, !2 }
!0 = distinct ! { ! "zero" }
!1 = ! { ! "one" }
!2 = ! { ! "two" }



uselistorder ptr @global, { 1, 2, 0 }
uselistorder i32 7, { 1, 0 }
; uselistorder i32 (i32) @bar, { 1, 0 }
uselistorder_bb @foo, %bb, { 5, 1, 3, 2, 0, 4 }

