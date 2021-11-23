$(function () {
    changeActiveDate();
    var colModelA = [
        /*{ label: '用户ID', name: 'id', width: 45, key: true, hidedlg:true, hidden:true },*/
        { label: 'ID', name: 'cid', width: 20},
        { label: '日期', name: 'cdate', width: 55 },
        { label: '红一', name: 'cnum1', width: 55 },
        { label: '红二', name: 'cnum2', width: 55 },
        { label: '红三', name: 'cnum3', width: 55 },
        { label: '红四', name: 'cnum4', width: 55 },
        { label: '红五', name: 'cnum5', width: 55 },
        { label: '红六', name: 'cnum6', width: 55 },
        { label: '蓝一', name: 'cnumLast', width: 55 }


    ];

    var colModel = colModelA.concat();
   /* var colModel = colModelAdmin.concat();
    colModel.splice(4,1);*/
    initGrid(colModel);

});

var startTimeDefault = '';
function changeActiveDate()
{
    console.log("111");
    //选择年月日
    $('#starttimespan').html('');
    var starttimehtml = '<input id="xjDate" type="text" class=""  style="height:32px;width:150px;"/>';
    $('#starttimespan').html(starttimehtml);

    var maxchoose = 0;
    var datetypeDefault = 'date';
    startTimeDefault = '';
    $('#xjDate').val('');

    laydate.render({
        elem: '#xjDate',
        type: datetypeDefault,
        value:startTimeDefault,
        done: function(value, date, endDate){

        },
        max: maxchoose
    });
    $('#xjDate').val(startTimeDefault);
}

function initGrid(colModel)
{
    $("#jqGrid").jqGrid({
        url: '../caipiao/list',
        datatype: "json",
        colModel: colModel,
        viewrecords: true,
        height: 400,
        rowNum: 15,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 30,
        autowidth:true,
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

    },
    created: function() {

    },
    methods: {
        search:function (event) {
            //var rowData = $("#jqGrid").jqGrid("getRowData",userId);
            $.ajax({
                type: "POST",
                url:"../caipiao/yuce",
                data:{},
                dataType: "json",
                success: function(result){
                    if(result.code == 0){
                        layer.alert("下一期中奖号码为："+result.msg);
                    }
                }
            });
        },

    }
});
