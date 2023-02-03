; 在这里编辑
module asm "inline asm code goes here"
module asm "more can go here"  

%hello = type {  i32, i64, %world }
%world = type { %hello, i32 }
; %hello = type {}

define void @main() { 
  fence acquire 
  fence syncscope("singlethread") seq_cst 
  fence syncscope("agent") seq_cst 
  ret void 
}

%mytype = type { %mytype*, i32 }

define i32 @add() !llvm.loop !0 { 
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

