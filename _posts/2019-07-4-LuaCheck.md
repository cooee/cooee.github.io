---
layout:     post
title:      LuaCheck
date:       2019-07-4
author:     myc
header-img: img/post-bg-coffee.jpeg
catalog: true
tags:
    - lua

---

# LuaCheck


## luacheck错误代码表

```lua

Code    Description
011     A syntax error.
021	An invalid inline option.
022	An unpaired inline push directive.
023	An unpaired inline pop directive.
111	Setting an undefined global variable.
112	Mutating an undefined global variable.
113	Accessing an undefined global variable.
121	Setting a read-only global variable.
122	Setting a read-only field of a global variable.
131	Unused implicitly defined global variable.
142	Setting an undefined field of a global variable.
143	Accessing an undefined field of a global variable.
211	Unused local variable.
212	Unused argument.
213	Unused loop variable.
221	Local variable is accessed but never set.
231	Local variable is set but never accessed.
232	An argument is set but never accessed.
233	Loop variable is set but never accessed.
241	Local variable is mutated but never accessed.
311	Value assigned to a local variable is unused.
312	Value of an argument is unused.
313	Value of a loop variable is unused.
314	Value of a field in a table literal is unused.
321	Accessing uninitialized local variable.
331	Value assigned to a local variable is mutated but never accessed.
341	Mutating uninitialized local variable.
411	Redefining a local variable.
412	Redefining an argument.
413	Redefining a loop variable.
421	Shadowing a local variable.
422	Shadowing an argument.
423	Shadowing a loop variable.
431	Shadowing an upvalue.
432	Shadowing an upvalue argument.
433	Shadowing an upvalue loop variable.
511	Unreachable code.
512	Loop can be executed at most once.
521	Unused label.
531	Left-hand side of an assignment is too short.
532	Left-hand side of an assignment is too long.
541	An empty do end block.
542	An empty if branch.
551	An empty statement.
611	A line consists of nothing but whitespace.
612	A line contains trailing whitespace.
613	Trailing whitespace in a string.
614	Trailing whitespace in a comment.
621	Inconsistent indentation (SPACE followed by TAB).
631	Line is too long.
```

## 中文翻译
 
```
011语法错误。
021无效的内联选项。
022一个未成对内联推指令。
023一个不成对的内联POP指令。
111设置未定义的全局变量。
112位未定义的全局变量。
113访问未定义的全局变量。
121设置只读全局变量。
122设置全局变量的只读字段。
131未使用隐式定义的全局变量。
142设置全局变量的未定义字段。
143访问全局变量的未定义字段。
211未使用的本地变量。
212未使用的参数。
213未使用的循环变量。
221局部变量被访问但从不设置。
231设置了局部变量但未访问。
232设置了参数但从不访问。
233设置了循环变量但未访问。
241局部变量发生改变，但从未访问。
311分配给本地变量的值未使用。
312参数的值未使用。
313循环变量的值未使用。
314表中字段的值未使用。
321访问未初始化的局部变量。
331分配给本地变量的值会发生变化，但不会访问。
341修改未初始化的局部变量。
411重定义局部变量。
412重定义参数。
413重定义循环变量。
421局部变量覆盖。
422参数覆盖。
423循环变量覆盖。
431upvalue覆盖。
432覆盖upvalue参数。
433覆盖upvalue循环变量。
511无法运行到的代码。
512循环最多只能执行一次。
521未使用的标签。
531赋值左边的参数太短（少？）。
532赋值左边的参数太长（多？）。
541空闭包。
542空的if分支。
551空申明。
611该行只包含空格。
612行尾有多余空格。
613字符串尾部多余空格。
614注释尾部多余空格。
621不一致缩进（空格后跟制表符）。
631行太长。
```