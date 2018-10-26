<template>
  <div>
     <div class="bodys">
        <div class="search">
            <span>操作者:</span>
            <input type="text" class="form-control" v-model="userName"/>
            <span>日志类型:</span>
            <select class="form-control" id="operationType">
                <option value="">全部</option>
                <option v-for="item in operationTypeArr" :value="item.TYPE">{{item.TYPE}}</option>
            </select>
            <span>操作时间:</span>
            <!-- <datepicker :language="zh" format="yyyy-MM-dd" id="startTime"></datepicker>
            <select id="startTimeHour" style="width: 55px;">
                <option :value="item" v-for="item in hour">{{item}}</option>
            </select> -->
            <div class="form-group"  style="display: inline-block; width: 250px;margin: 0;vertical-align: middle;">
                <div class="input-group date form_datetime" 
                data-date="" data-date-format="yyyy-mm-dd hh" 
                data-link-field="dtp_input1"
                >
                    <input class="form-control" style="margin: 0;float: right;" id="startTime" type="text" value="" placeholder="请选择开始时间">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
            </div>
            <span>到</span>
            <!-- <datepicker :language="zh" format="yyyy-MM-dd" id="stopTime"></datepicker>
            <select id="stopTimeHour" style="width: 55px;">
                <option :value="item" v-for="item in hour">{{item}}</option>
            </select> -->
            <div class="form-group" style="display: inline-block; width: 250px;margin: 0;vertical-align: middle;">
                <div class="input-group date form_datetime" data-date="" 
                data-date-format="yyyy-mm-dd hh" data-link-field="dtp_input1"
                >
                    <input class="form-control" style="margin: 0;float: right;" id="stopTime" type="text" value=""  placeholder="请选择结束时间">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
            </div>
            <button class="btn btn-info" @click="inquire(userName,startTime,stopTime,operationType,1,10)">查询</button>
        </div>
         <table class="table table-responsive">
          <thead>
              <tr>
                  <th>编号</th>
                  <th>操作者</th>
                  <th>时间</th>
                  <th>模块</th>
                  <th>内容</th>
                  <th>状态</th>
                  <th>类型</th>
                  <th>浏览器</th>
              </tr>
          </thead>
        <col style="width:5%"/>
        <col style="width:13.57%"/>
        <col style="width:13.57%"/>
        <col style="width:13.57%"/>
        <col style="width:13.57%"/>
        <col style="width:13.57%"/>
        <col style="width:13.57%"/>
        <col style="width:13.57%"/>
          <tbody>
              <tr v-for="(item,index) in initData" v-show="!noData">
                  <td>{{index + 1}}</td>
                  <td :title="item.userName">{{item.userName}}</td>
                  <td :title="item.operationTime">{{item.operationTime}}</td>
                  <td :title="item.operationModule">{{item.operationModule}}</td>
                  <td :title="item.operationContent">{{item.operationContent}}</td>
                  <td :title="item.state">{{item.state}}</td>
                  <td :title="item.type">{{item.type}}</td>
                  <td :title="item.browser">{{item.browser}}</td>
              </tr>
              <tr v-show="noData">
                  <td colspan="8">暂无数据</td>
              </tr>
          </tbody>
      </table>
      <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    </div>
  </div>
</template>
<script>
// import datepicker from 'vuejs-datepicker'
// import {zh} from 'vuejs-datepicker/dist/locale'
export default {
    data() {
        return {
            // zh:zh,
            pageSet: {
                totalRow: 1,//required option
                language: 'cn',//default: 'cn'
                pageSizeMenu: false,//default: [10, 20, 50, 100]
                info: false,
                align: 'center'
            },
            initData: [],//初始化数据
            hour:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            page: "",//分页页码
            rows: "",//分页条数
            userName: "",//输入框名称
            startTime: "",//开始时间
            stopTime: "",//结束时间
            operationType: "",//类型
            operationTypeArr: [],//类型数据
            noData: false//暂无数据判断
        }
    },
    mounted(){
        this.operationTypeFn()
        $('.form_datetime').datetimepicker({
            weekStart: 0, //一周从哪一天开始
            todayBtn:  1, //
            autoclose: 1,
            minView: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: false,
            minuteStep: 1,
            language: 'zh-CN'
        });
    },
    methods: {
      pageChange(pInfo){
        //分页方法 pInfo{pageNumber: 1, pageSize: 10}
        this.page = pInfo.pageNumber
        this.rows = pInfo.pageSize
        this.inquire(this.userName,this.startTime,this.stopTime,this.operationType,this.page,this.rows)
     },
     inquire(userName,startTime,stopTime,operationType,page,rows){
        this.startTime = $('#startTime').val()
        this.stopTime = $('#stopTime').val()
        this.operationType = $('#operationType').val()
        var startTimeStr = $("#startTime").val()+':00'
        var stopTimeStr = $("#stopTime").val()+':00'
        var d1 = new Date(startTimeStr.replace(/\-/g, "\/"));  
        var d2 = new Date(stopTimeStr.replace(/\-/g, "\/"));  
        if(this.startTime!=""&&this.stopTime!=""&&d1 >=d2){  
            this.$dialog.alert("开始时间不能大于结束时间！");  
            return false;  
        }
        let param = new URLSearchParams()
        param.append('userName', this.userName)
        param.append('startTime', this.startTime)
        param.append('stopTime', this.stopTime)
        param.append('operationType', this.operationType)
        param.append('page',page)
        param.append('rows',rows)
        this.axios({
            method: 'post',
            url: 'journal.do?FindLog',
            data: param
        }).then(res=>{
            if(res.data.e == 0){
                this.initData = res.data.o
                this.pageSet.totalRow = res.data.n
                this.noData = false
            }else {
                this.pageSet.totalRow = 1
                this.noData = true
            }
        })
     },
     operationTypeFn(){
         this.axios.get('journal.do?FindLogType').then(res=>{
             if(res.data.e == 0){
                 this.operationTypeArr = res.data.o
             }
         })
     }
  }
}
</script>
