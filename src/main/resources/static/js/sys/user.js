$(function () {
    var colModelAdmin = [
        { label: 'id', name: 'userId', width: 45, key: true, hidedlg:true, hidden:true },
        { label: '用户ID', name: 'userId', width: 35},
        { label: '登录账号', name: 'userName', width: 45},
        { label: '用户状态', name: 'status', width: 45,formatter: function(value, options, row){
                if(value === 0){
                    return '<span type="button"  class="btn btn-primary"><i class="icon-ok"></i> 正常</span>';
                }else{
                    return '<span type="button"  class="btn btn-danger"><i class="icon-remove"></i> 禁用</span>';
                }
            }},
        { label: 'dd', name: 'status', width: 45, hidden:true },
        { label: '用户姓名', name: 'userRealname', width: 55},
        { label: '联系电话', name: 'userPhone', width: 55},
        { label: '创建时间', name: 'createTime', width: 75},
        { label: '功能操作', name: 'userId', width: 95 ,formatter: function(value, options, row){
               return '<a type="button"  class="btn btn-primary" onclick="update('+value+');"><i class="icon-edit"></i> 编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;' +
                     '&nbsp;&nbsp;&nbsp;&nbsp;<a type="button" onclick="delRow('+value+');" class="btn btn-danger"><i class="icon-trash"></i> 删除</a>';
            }},
    ];
   /*
    var colModel = colModelAdmin.concat();
    colModel.splice(4,1);*/
    initGrid(colModelAdmin);

});

function update(userId){
    vm.update(userId);
}

function initGrid(colModel)
{
    $("#jqGrid").jqGrid({
        url: '../user/list',
        datatype: "json",
        colModel: colModel,
        viewrecords: true,
        height: 'auto', //设置table整体高度
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

var vm = new Vue({
    el:'#rrapp',
    data:{
        sysUser:{
            userName:'',
            userPassword:'',
            userRealname:'',
            userId:'',
            createTime:'',
            status:'',
            userPhone:''
        }
    },
    methods: {
        search:function (event) {
            var userName = $("#userName").val();
            $("#jqGrid").jqGrid('setGridParam',{
                url:"../user/list",
                datatype: "json",
                postData:{'userName':userName}, //发送数据
                page:1
            }).trigger("reloadGrid"); //重新载入
        },
        update: function (userId) {
            var rowData = $("#jqGrid").jqGrid("getRowData",userId);
            vm.sysUser.userId = userId;
            vm.sysUser.userName = rowData.userName;
            vm.sysUser.userRealname = rowData.userRealname;
            vm.sysUser.userPhone = rowData.userPhone;
            vm.sysUser.status = rowData.status;
            addFrom("2");
        },
        add:function(){
            vm.sysUser.userId = '';
            vm.sysUser.userName = '';
            vm.sysUser.userRealname = '';
            vm.sysUser.userPhone = '';
            vm.sysUser.status = '';
           addFrom("1");
        },
        del:function(){
            delRow();
        }
    }
});

function addFrom(type) {
    var titleT = '';
    var url = '';
    if(type == '1'){
        url = '../user/add';
        titleT = '新增用户';
        $("#userStatus").hide();
        $("#passwordinput").show();
    }
    if(type == '2'){
        url = '../user/update';
        titleT = '修改用户';
        $("#passwordinput").hide();
        $("#userStatus").show();

        var rObj = document.getElementsByName("userstatus");
        for(var i = 0;i < rObj.length;i++){
            if(rObj[i].value == vm.sysUser.status){
                rObj[i].checked =  'checked';
            }
        }
    }
    layer.open({
        title: titleT,
        type: 1,
        //content: $("#passwordLayer").html(),
        area: ['520px', '350px'],
        shadeClose: false,
        content: jQuery("#passwordLayer"),
       //skin:'layui-layer-lan',
        //skin: 'layui-layer-molv',
        btn: ['确定', '取消'],
        btn1: function (index) {
            if(vm.sysUser.userName == null || vm.sysUser.userName == ''){
                layer.alert("登录账号不能为空！！！");
                return false;
            }
            if(type == '1'){
                if(vm.sysUser.userPassword == null || vm.sysUser.userPassword == ''){
                    layer.alert("密码不能为空！！！");
                    return false;
                }
            }
            if(vm.sysUser.userRealname == null || vm.sysUser.userRealname == ''){
                layer.alert("姓名不能为空！！！");
                return false;
            }
            vm.sysUser.status = $('input[name="userstatus"]:checked').val();
            $.ajax({
                type: "POST",
                //url: "../user/add?userName="+vm.userName+"&passWord="+vm.passWord+"&realName="+vm.realName,
                //data:{},
                url:url,
                data:JSON.stringify(vm.sysUser),
                dataType: "json",
                success: function(result){
                    if(result.code == 0){
                        layer.close(index);
                        layer.alert(result.msg, function(index){
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

function delRow(id) {
    var userIds = '';
    if(id == null || id == ''){
        userIds = getSelectedRows();
        if(userIds == null){
            return ;
        }
    }else{
        var k = [];
        k.push(id.toString());
        userIds = k;
    }

    confirm('确定要删除选中的记录？', function(){
        $.ajax({
            type: "POST",
            url: "../user/delete",
            data: JSON.stringify(userIds),
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