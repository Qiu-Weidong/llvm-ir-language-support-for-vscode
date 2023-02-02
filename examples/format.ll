; 在这里编辑
source_filename = "main.c" 
target datalayout = "e-m:w-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-pc-windows-msvc19.33.31630" 
module asm "inline asm code goes here" 
module asm "more can go here"     

@X = global i32 17     
@Y = global i32 42 
@Z = global [2 x ptr] [ptr @X, ptr @Y]

define void @main(i8* noundef %0, i8* noundef %1, ...) { 
  ; 注释
  fence acquire 
  ; 再来一条注释
  fence syncscope("singlethread") seq_cst 
  fence syncscope("agent") seq_cst 
  ret void 
  ; 注释
  uselistorder i32 %arg1, { 1, 0, 2 } 
  uselistorder label %bb, { 1, 0 } 
}


%mytype = type { %mytype*, i32 } 
define i32 @add() !llvm.loop !0 { 
  ret void 
  uselistorder i32 %arg1, { 1, 0, 2 } 
  ; 注释
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



