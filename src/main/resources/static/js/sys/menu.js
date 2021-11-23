$(function () {
    var colModelA = [
        { label: '菜单ID', name: 'menuId', width: 20},
        { label: '菜单名称', name: 'menuName', width: 75 },
        { label: '菜单图标', name: 'menuIcon', width: 50, formatter: function(value, options, row){
                return value == null ? '' : '<i class="'+value+'"></i>';
            }},
        { label: '菜单css', name: 'menuIcon', width: 75},
        { label: '菜单URL', name: 'menuUrl', width: 90 },
        { label: '菜单排序', name: 'orderNum', width: 20 },
        { label: '功能操作', name: 'menuId', width: 95 ,formatter: function(value, options, row){
                return '<a type="button"  class="btn btn-primary" onclick="update('+value+');"><i class="icon-edit"></i> 编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '&nbsp;&nbsp;&nbsp;&nbsp;<a type="button" onclick="delRow('+value+');" class="btn btn-danger"><i class="icon-trash"></i> 删除</a>';
            }},
        { label: 'id', name: 'menuId', width: 45, key: true, hidedlg:true, hidden:true }
    ];

    var colModel = colModelA.concat();
   /* var colModel = colModelAdmin.concat();
    colModel.splice(4,1);*/

    initGrid(colModel);

});

function initGrid(colModel)
{
    $("#jqGrid").jqGrid({
        url: '../menu/listM',
        datatype: "json",
        colModel: colModel,
        viewrecords: true,
       // height: 'auto', //设置table整体高度
        height: 710,
        rowNum: 10,
        rowList : [10,20,30,50],
        rownumbers: true,
        rownumWidth: 30,
        autowidth:true,
        altRows: true,//单双行样式不同
        altclass: 'differ',
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
}
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;
var vm = new Vue({
    el:'#rrapp',
    data:{
         menu:{
             menuId:'',
             menuName:'',
             menuIcon:'',
             menuUrl:'',
             orderNum:'',
             parentId:'',
             parentName:''

         }
    },
    created: function() {
        //加载菜单树
         $.get("../menu/select", function(r){
            ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);
            var node = ztree.getNodeByParam("menuId", vm.menu.parentId);
            ztree.selectNode(node);
            vm.menu.parentName = node.menuName;
        })
    },
    methods: {
        search:function (event) {
            var menuName = $("#menuName").val();
            $("#jqGrid").jqGrid('setGridParam',{
                url:"../menu/listM",
                datatype: "json",
                postData:{'menuName':menuName}, //发送数据
                page:1
            }).trigger("reloadGrid"); //重新载入
        },
        update: function (menuId) {
            var rowData = $("#jqGrid").jqGrid("getRowData",menuId);
            vm.menu.menuId = rowData.menuId;
            vm.menu.menuName = rowData.menuName;
            vm.menu.menuIcon = rowData.menuIcon;
            vm.menu.menuUrl = rowData.menuUrl;
            vm.menu.orderNum = rowData.orderNum;

            addFrom("2");
        },
        add:function(){
            vm.menu.menuId = '';
            vm.menu.menuName = '';
            vm.menu.menuIcon = '';
            vm.menu.menuUrl = '';
            vm.menu.orderNum = '';
            addFrom("1");
        },
        del:function(){
            delRow();
        },
        menuTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                //skin: 'layui-layer-molv',
                title: "选择菜单",
                area: ['520px', '350px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer2"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    vm.menu.parentId = node[0].menuId;
                    //var parentname = node[0].getParentNode().name;
                    vm.menu.parentName = node[0].name;
                   // vm.menu.parentId = node[0].id;
                    layer.close(index);
                }
            });
        },


    }
});

function update(menuId){
    vm.update(menuId);
}

function addFrom(type) {
    var titleT = '';
    if(type == '1'){
        titleT = '新增菜单';
    }
    if(type == '2'){
        titleT = '修改菜单';
    }
    layer.open({
        title: titleT,
        type: 1,
        //content: $("#passwordLayer").html(),
        area: ['520px', '450px'],
        shadeClose: false,
        content: jQuery("#menuLayer"),
       //skin:'layui-layer-lan',
        //skin: 'layui-layer-molv',
        btn: ['确定', '取消'],
        btn1: function (index) {
            if(vm.menu.menuName == null || vm.menu.menuName == ''){
                layer.alert("菜单名称不能为空！！！");
                return false;
            }
            if(vm.menu.orderNum == null || vm.menu.orderNum == ''){
                layer.alert("菜单排序不能为空！！！");
                return false;
            }
            if(type == '1'){
                if(vm.menu.parentId == null || vm.menu.parentId == ''){
                    vm.menu.parentId = 0;
                }
            }
            var ur;
            if(vm.menu.menuId == null || vm.menu.menuId == ''){
                 ur = "../menu/add";
            }else{
                 ur = "../menu/update";
            }
            $.ajax({
                type: "POST",
                //url: "../user/add?userName="+vm.userName+"&passWord="+vm.passWord+"&realName="+vm.realName,
                //data:{},
                url:ur,
                data:JSON.stringify(vm.menu),
                dataType: "json",
                success: function(result){
                    if(result.code == 0){
                        layer.close(index);
                        layer.alert('操作成功', function(index){
                            location.reload();
                        });
                    }else{
                        layer.alert(result.msg);
                    }
                }
            });
        }
    });
}

function delRow(menuId) {
    var menuIds = '';
    if(menuId == null || menuId == ''){
        userIds = getSelectedRows();
        if(userIds == null){
            return ;
        }
    }else{
        var k = [];
        k.push(menuId.toString());
        menuIds = k;
    }

    confirm('确定要删除选中的记录？', function(){
        $.ajax({
            type: "POST",
            url: "../menu/delete",
            data: JSON.stringify(menuIds),
            success: function(r){
                if(r.code == 0){
                    alert('删除成功', function(index){
                        location.reload();
                    });
                }else{
                    alert(r.msg);
                }
            }
        });
    });
}