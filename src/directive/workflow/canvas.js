//draw2d文档:http://draw2d.org/draw2d_touch/jsdoc_5/#!/example
d2.directive("draw2dCanvas", ["$window", "$parse", "$timeout", "$interval",'ngDialog',"$rootScope", function ($window, $parse, $timeout, $interval,ngDialog,$rootScope) {

    return {
        restrict: 'E,A',
        link: function (scope, element, attrs, controller) {
            scope.wfData = scope.data.tab_data.tab1.workflow_data;
            //画板
            var canvas;
            //私有方法 =================================================================
            scope.wfData.click_time = function (figure) {
                //console.log(figure);
                var win = ngDialog.open({
                    template: 'html/directive/workflow/time.html',
                    disableAnimation: true,
                    width:'300px',
                    controller: ['$scope', function ($scope) {
                        if (typeof figure.userData.data != 'undefined') {
                            $scope.data = figure.userData.data;
                        }
                        $scope.title = '设置时间';
                        $scope.save_time = function () {
                            figure.userData.data = $scope.data;
                            ngDialog.close(win);
                        }
                    }]
                });
            }


            //控件组设置
            var figures = {
                'start': {
                    name: '开始',
                    class: 'start',
                    ico: 'images/workflow/start.png',
                    color:'white',
                    input: false,
                    output: true,
                    output_node: ['time'],
                    data: {}
                },
                'time': {
                    name: '时间',
                    class: 'time',
                    ico: 'images/workflow/time.png',
                    color:'white',
                    input: true,
                    output: true,
                    output_node: ['time', 'end'],
                    dbclick: 'click_time',
                    data: {}
                },
                'search': {
                    name: '查询',
                    class: 'search',
                    ico: 'images/workflow/search.png',
                    color:'green',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'goods': {
                    name: '商品',
                    class: 'goods',
                    ico: 'images/workflow/goods.png',
                    color:'green',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'order': {
                    name: '订单',
                    class: 'order',
                    ico: 'images/workflow/order.png',
                    color:'green',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },

                'group': {
                    name: '目标组',
                    class: 'group',
                    ico: 'images/workflow/group.png',
                    color:'blue',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'balance': {
                    name: '抽样',
                    class: 'balance',
                    ico: 'images/workflow/balance.png',
                    color:'blue',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'remove': {
                    name: '排除',
                    class: 'remove',
                    ico: 'images/workflow/remove.png',
                    color:'blue',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'merge': {
                    name: '合并',
                    class: 'merge',
                    ico: 'images/workflow/merge.png',
                    color:'blue',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'combine': {
                    name: '交集',
                    class: 'combine',
                    ico: 'images/workflow/combine.png',
                    color:'blue',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },

                'coupon': {
                    name: '优惠券',
                    class: 'coupon',
                    ico: 'images/workflow/coupon.png',
                    color:'orange',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'message': {
                    name: '发短信',
                    class: 'message',
                    ico: 'images/workflow/message.png',
                    color:'orange',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'wechat': {
                    name: '发微信',
                    class: 'wechat',
                    ico: 'images/workflow/wechat.png',
                    color:'orange',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'email': {
                    name: '发邮件',
                    class: 'email',
                    ico: 'images/workflow/email.png',
                    color:'orange',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'receive': {
                    name: '响应',
                    class: 'receive',
                    ico: 'images/workflow/receive.png',
                    color:'orange',
                    input: true,
                    output: true,
                    output_node: [],
                    dbclick: 'click_time',
                    data: {}
                },
                'end': {
                    name: '结束',
                    class: 'end',
                    ico: 'images/workflow/end.png',
                    color:'red',
                    input: true,
                    output: false,
                    output_node: [],
                    data: {}
                },
            };

            //编辑器参数设置
            scope.editor = $.extend(true, {
                canvas: {
                    width: 2000,
                    height: 2000,
                    onDrop: function (droppedDomNode, x, y, shiftKey, ctrlKey) {
                        var key = droppedDomNode[0].attributes['data-shape'].value;
                        var node = scope.editor.palette.figures[key];
                        scope.editor.addNode(canvas, node, x, y);
                    }
                },
                palette: {
                    figures: figures
                },
                state: {
                    dirty: false,
                    canUndo: false,
                    canRedo: false
                },
                selection: {
                    className: null,
                    figure: null,
                    attr: null
                }
            }, scope.editor);

            //新增节点动作 ==================================================
            /**
             * c      canvas 画布对象
             * node   figure 控件配置
             * x      int 控件在画布上的x位置
             * y      int 控件在画布上的y位置
             * reload boolean 是否为重新载入,重新载入时,数据不在重复推入页面数据数组
             */
            scope.editor.addNode = function (c, node, x, y, reload) {
                var add_command = new draw2d.command.Command('addTask');
                var conf = {
                    path: node.ico,
                    resizeable: false,
                    angle: 0,
                    //selectable: false
                    userData: JSON.parse(JSON.stringify(node))
                };
                if(node.id){
                    conf.id = node.id;
                }
                //创建基本图形
                var task_node = new draw2d.shape.basic.Image(conf);
                //创建输入输出
                if (node.input)
                    task_node.createPort("input", new draw2d.layout.locator.LeftLocator());
                if (node.output)
                    task_node.createPort("output", new draw2d.layout.locator.RightLocator());
                //创建标签
                task_node.add(new draw2d.shape.basic.Label({ text: node.name }), new draw2d.layout.locator.BottomLocator());
                //绑定事件
                task_node.onDoubleClick = function (figure, mouseX, mouseY, shiftKey, ctrlKey) {
                    if(typeof scope.wfData[node.dbclick]=='function'){
                        scope.wfData[node.dbclick](task_node);
                    }
                }

                add_command.execute = function () {
                    c.add(task_node, x, y);
                    return task_node;
                }
                add_command.undo = function () {
                    c.remove(task_node);
                }
                add_command.redo = function () {
                    c.add(task_node, x, y);
                    return task_node;
                }
                //用户操作数据: 节点坐标,节点数据
                task_node.userData.x = x;
                task_node.userData.y = y;
                task_node.userData.type = 'task';
                task_node.userData.dbclick = node.dbclick;
                if(typeof node.t == 'undefined'||node.t==''){
                    task_node.userData.t = new Date().getTime();        //时间戳
                }else{
                    task_node.userData.t = node.t;
                }
                
                task_node.userData.id = task_node.id;
                task = c.getCommandStack().execute(add_command);    

                //如果是从控制面板手动拖入，则纳入页面数据数组
                //如果是切换页签或者从数据库取出数据重载，则不需要推入
                if (reload===true) {
                    return;
                } else {
                    scope.wfData.task_data.push(task_node.userData);
                    return;
                }
            };

            /**
             * c      canvas 画布对象
             * sourcePort   起点节点
             * targetPort   终点节点
             * start    int 起点的xy坐标
             * end      int 终点的yx坐标
             * reload boolean 是否为重新载入,重新载入时,数据不在重复推入页面数据数组
             */
            scope.editor.restoreLine = function(c, id, output_id, input_id){
                var add_command = new draw2d.command.Command('restoreLine');
                var line_node = new draw2d.Connection();
                //console.log(id);
                //var output_id = line.sourcePort.parent.id;
                //var input_id = line.targetPort.parent.id;
                var outputPort, inputPort;
                c.getFigures().data.forEach(function(e){
                    if(output_id == e.id){
                        outputPort = e.getOutputPort(0);
                    }
                    if(input_id == e.id){
                        inputPort = e.getInputPort(0);
                    }
                });
                line_node.setId(id);
                line_node.setSource(outputPort);
                line_node.setTarget(inputPort);

                add_command.execute = function () {
                    c.add(line_node);
                    return line_node;
                }
                add_command.undo = function () {
                    c.remove(line_node);
                }
                add_command.redo = function () {
                    c.add(line_node);
                    return line_node;
                }
                c.getCommandStack().execute(add_command); 
                saveline();
            }

            // =====================================================================

            canvas = new draw2d.Canvas(element.attr("id"), scope.editor.canvas.width, scope.editor.canvas.height);
            canvas.setScrollArea("#" + element.attr("id"));
            canvas.onDrop = $.proxy(scope.editor.canvas.onDrop, canvas);

            // update the scope model with the current state of the
            // CommandStack
            var stack = canvas.getCommandStack();
            stack.addEventListener(function (event) {
                $timeout(function () {
                    scope.editor.state.canUndo = stack.canUndo();
                    scope.editor.state.canRedo = stack.canRedo();
                }, 0);
            });

            // Update the selection in the model
            // and Databinding Draw2D -> Angular
            var changeCallback = function (emitter, attribute) {
                $timeout(function () {
                    if (scope.editor.selection.attr !== null) {
                        scope.editor.selection.attr[attribute] = emitter.attr(attribute);
                    }
                }, 0);
            };
            canvas.on("select", function (canvas, event) {
                // var figure = event.figure;
                // if (figure instanceof draw2d.Connection) {
                //     return; // silently
                // }

                // $timeout(function () {
                //     if (figure !== null) {
                //         scope.editor.selection.className = figure.NAME;
                //         scope.editor.selection.attr = figure.attr();
                //     }
                //     else {
                //         scope.editor.selection.className = null;
                //         scope.editor.selection.attr = null;
                //     }

                //     // unregister and register the attr listener to the new figure
                //     //
                //     if (scope.editor.selection.figure !== null) { scope.editor.selection.figure.off("change", changeCallback); }
                //     scope.editor.selection.figure = figure;
                //     if (scope.editor.selection.figure !== null) { scope.editor.selection.figure.on("change", changeCallback); }
                // }, 0);
            });

            // Databinding: Angular UI -> Draw2D
            // it is neccessary to call the related setter of the draw2d object. "Normal" Angular 
            // Databinding didn't work for draw2d yet
            //
            // scope.$watchCollection("editor.selection.attr", function (newValues, oldValues) {

            //     // if (oldValues !== null && scope.editor.selection.figure !== null) {
            //     //     // for performance reason we post only changed attributes to the draw2d figure
            //     //     //
            //     //     var changes = draw2d.util.JSON.diff(newValues, oldValues);
            //     //     scope.editor.selection.figure.attr(changes);
            //     // }
            // });

            //撤销和重做
            scope.editor.undo = $.proxy(stack.undo, stack);
            scope.editor.redo = $.proxy(stack.redo, stack);
            //放大和缩小
            scope.editor.zoomin = function(){
                if(scope.wfData.zoom<0.5){
                    return;
                }
                scope.wfData.zoom = scope.wfData.zoom * 0.8;
                canvas.setZoom(scope.wfData.zoom);
            };
            scope.editor.zoomout = function(){
                if(scope.wfData.zoom>2){
                    return;
                }
                scope.wfData.zoom = scope.wfData.zoom * 1.25;
                canvas.setZoom(scope.wfData.zoom);
            };
            //删除和清空
            scope.editor["delete"] = $.proxy(function () {
                var command = new draw2d.command.CommandDelete(this.selection.all.data[0]);
                this.getCommandStack().execute(command);
                savetask();
                saveline();
            }, canvas);
            scope.editor.clear = $.proxy(function () {
                scope.confirm('清空整个流程以后不能还原，确认要清空吗？',function(){
                    canvas.clear();
                    scope.wfData.task_data = [];
                    scope.wfData.line_data = [];
                });
            }, canvas);

            //加载数据
            scope.editor.load = $.proxy(function (json) {
                canvas.clear();
                var reader = new draw2d.io.json.Reader();
                reader.unmarshal(canvas, json);
            }, canvas);


            scope.editor.console = function () {
                savetask();
                saveline();
                console.log(scope.wfData);
            }

            //数据保存和重载相关私有方法 =======================================
            
            //任务节点
            var savetask = function () {
                scope.wfData.task_data = [];
                canvas.getFigures().data.forEach(function (i) {
                    i.userData.x = i.x;
                    i.userData.y = i.y;
                    scope.wfData.task_data.push(i.userData);
                });
            }
            //线段节点
            var saveline = function () {
                //scope.wfData.line_data = [];
                //console.log(canvas.getLines());
                //检查新增线条 -----------------------------------------------
                canvas.getLines().data.forEach(function (i) {
                    //console.log(i.id);
                    var line = {
                        type: 'line',
                        start: i.start,
                        end: i.end,
                        sourcePort: i.sourcePort.parent.id,
                        targetPort: i.targetPort.parent.id,
                        id: i.id,
                        t: new Date().getTime()
                    }
                    //判断当前线条是否在数据数组中，如果不在则纳入
                    if(scope.wfData.line_data.length == 0){
                        //scope.wfData.line_data.push(JSON.parse(JSON.stringify(line)));
                        scope.wfData.line_data.push(line);
                    }else{
                        var in_arr = false;
                        scope.wfData.line_data.forEach(function(li){
                            if(li.id==line.id) in_arr = true;
                        });
                        if(!in_arr){
                           scope.wfData.line_data.push(line); 
                        }
                    }
                });
                //console.log(scope.wfData.line_data);
                //检查删除线条 -----------------------------------------------
                scope.wfData.line_data.forEach(function(li,index){
                    var in_arr = false;
                    canvas.getLines().data.forEach(function (i) {
                        if(i.id==li.id) in_arr=true;
                    });
                    if(!in_arr){
                        scope.wfData.line_data.splice(index,1);
                    }
                });
            }
            //生成保存数据方法
            var refresh_data = function(){
                savetask();
                saveline();
            }
            //定时保存页面编辑的内容
            $interval(refresh_data, 1000);
            //切换路由时,也需要保存
            //console.log($rootScope);
            $rootScope.$on('$routeChangeStart',function(evt, next, current){
                refresh_data();
            });

            //载入数据
            var load_data = function () {
                //将线条和任务数据合并
                var new_data = [];
                scope.wfData.task_data.forEach(function(i){
                    new_data.push(i);
                });
                scope.wfData.line_data.forEach(function(i){
                    new_data.push(i);
                });
                //按时间排序
                new_data.sort(function(a,b){
                    return a.t-b.t;
                });
                //console.log(new_data);
                //生成流程图
                new_data.forEach(function(node){
                    if(node.type=='task'){
                        scope.editor.addNode(canvas, node, node.x, node.y, true);
                    }
                    if(node.type=='line'){
                        scope.editor.restoreLine(canvas, node.id, node.sourcePort, node.targetPort);
                    }
                });
            }
            load_data();
        }
    };
}]);