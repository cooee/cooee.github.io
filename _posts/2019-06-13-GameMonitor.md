---
layout:     post
title:      Lua内存泄露检测
subtitle:   弱引用
date:       2019-6-13
author:     BY
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - Lua
---
# 内存泄露检测（myc）
对于使用lua进行游戏开发而言，lua内存泄露往往是最容易忽视的问题，很多开发者并不知道自己的代码是否存在内存泄露，没严格测试过就上线了，或者使用xcode及其他工具简单看看内存是否增长，如果增长不多或者不明显就认为无内存泄露。但是上线之后往往会报`xxx is nil`,通常初级的程序员加个判断就绕过去了，但是没有深究到底是因为什么导致的异常。类似于上下文看着都没问题的代码，还是报了`xxx is nil`此类问题往往都是lua的内存泄露导致的问题，往往对象已经从场景上销毁，但是事件监听或者回调函数，协程里面还存在着该对象的引用，等到回调触发，或者协程恢复就会报该类错误（因为对象已经销毁），那么此类问题可以借助GameMonitor来检测，具体原理是借助lua的弱引用，把某个需要观察的对象加入到弱表，如果不存在外部引用，那么在gc时候，弱表上的该对象也就自然消失，如果弱表还存在该对象，说明外部存在引用. 一个典型的例子，比如打开了个人信息场景，然后退出个人信息界面，理论上所有的东西都应该被释放了，我们在进入场景的时候把该场景加入到GameMonitor，退出的时候主动调用gc，打印GameMonitor内弱表的内容，如果此时还存在个人信息场景相关的东西，说明存在内存泄露。此时就需要检查一下代码，是否注册了事件没有反注册，定时器没有及时取消，协程是否销毁等

给某个模块（场景）加入内存泄露检测，然后打开该模块，再关闭该模块，然后按键盘M键，观看日志输出， 如果按键没反应，那么需要在响应按键的地方加上代码，其实就是触发GameMonitor

## GameMonitor代码
``` lua
--[[--内存泄露检测工具
@module MemoryMonitor
@author myc

Date   2018-05-10 14:12:05
Last Modified by   myc
Last Modified time 2019-06-13 10:04:41
]]

--监控间隔配置（单位：秒） 
local MonitorConfig =   
{  
    --内存泄露监控间隔  
    memLeaksInterval    = 1,  
}  
  
local MemoryMonitor = {};  
 
function MemoryMonitor:ctor()  
   --内存泄露弱引用表  
    self.__memLeakTbl   = {}
    setmetatable(self.__memLeakTbl, {__mode='kv'})
    --内存泄露监控器  
    self.__memLeakMonitor   = nil  

    self:start();
end  
 
---开始检测
--@usage g_MemoryMonitor:start();  
function MemoryMonitor:start()  
    self.__memLeakMonitor = self:__memLeaksMonitoring()  
end  

--[[--
    更新弱表信息，一般可以按某个按键的时候调用该接口，例如按m键打印出当前存在的内存泄露信息
]]
function MemoryMonitor:update(dt)
    dt = dt or 10;
    if self.__memLeakMonitor then
        self.__memLeakMonitor(dt)  
    end
end  
  
  
--[[--
    把一个表或者对象添加到内存检测工具中，如果该表或者对象不存在外部引用，则说明释放干净
    否则内存泄露检测工具会输出日志

    @param tab 观察的对象，表
    @string tabname 别名，为了好识别

    @usage
    MemoryMonitor:add_to_leak_monitor(self,"用户信息模块")
]]
function MemoryMonitor:add_to_leak_monitor(tab, tabname)  
    if not self.__memLeakMonitor then
        return;
    end
    assert('string' == type(tabname), "Invalid parameters")  
    --必须以名字+地址的方式作为键值  
    --内存泄露经常是一句代码多次分配出内存而忘了回收，因此tblName经常是相同的
    local name = string.format("%s@%s", tabname, tostring(tab))  
    if nil == self.__memLeakTbl[name] then  
        self.__memLeakTbl[name] = tab
    end  
end


  
--内存泄露监控逻辑  
function MemoryMonitor:__memLeaksMonitoring()  
    local monitorTime   = MonitorConfig.memLeaksInterval  
    local interval      = MonitorConfig.memLeaksInterval  
    local str           = nil  
    return function(dt)  
        interval = interval + dt  
        if interval >= monitorTime then  
            interval = interval - monitorTime  
            --强制性调用gc  
            collectgarbage("collect")  
            collectgarbage("collect")
            collectgarbage("collect")  
            collectgarbage("collect")
            local flag = false;  
            --打印当前内存泄露监控表中依然存在（没有被释放）的对象信息  
            str = "存在以下内存泄漏:"  
            for k, v in pairs(self.__memLeakTbl) do  
                str = str..string.format("  \n%s = %s", tostring(k), tostring(v))  
            	flag = true;
            end  
            str = str.."\n请仔细检查代码！！！"  
            if flag then
            	print(str);
            end
       end  
    end  
end


return MemoryMonitor;

```

按键代码
```lua
    if key == 77 then --按键M
        MemoryMonitor:update(10); --打印内部弱引用表
    end
```

监控示例
```lua
    local MemoryMonitor = require("MemoryMonitor")
    local CanvasView = class();
    CanvasView.className_ = "CanvasView";--类名
    function CanvasView:ctor()
        self.m_name = "CanvasView";
        MemoryMonitor:add_to_leak_monitor(self,"CanvasView", );--传入该模块引用，第2个参数是别名，日志输出的名字
    end
```

如果按键之后没输出异常，那么说明该模块没有内存，如果存在泄漏则输出如下：

<figure>
<a><img src="{{site.url}}/img/gameMonitor.png"></a>
</figure>

最常见的内存泄漏就是注册了事件监听没有反注册，所以遇到此类问题先检查是否反注册了事件，其余的就是回调函数，协程内部等，需要开发人员自行定位，但是大体上都是此类问题了
