<template>
  <div>
    <v-title>
      <li>效益评估统计</li>
    </v-title>
    <div class="bodys">
        <div class="search">
            问卷名称：
            <input type="text" class="form-control" id="quesName">
            时效：
            <!-- <datepicker :language="zh" id="beginDate" format="yyyy-MM-dd"></datepicker>
            <select id="beginDateHour" style="width: 55px;">
                <option :value="item" v-for="item in hour">{{item}}</option>
            </select> -->
            <div class="form-group"  style="display: inline-block; width: 250px;margin: 0;vertical-align: middle;">
                <div class="input-group date form_datetime" 
                data-date="" data-date-format="yyyy-mm-dd hh" 
                data-link-field="dtp_input1"
                >
                    <input class="form-control" style="margin: 0;float: right;" id="beginDate" type="text" value="" placeholder="请选择开始时间">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
            </div>
            到 
            <!-- <datepicker :language="zh" id="endDate" format="yyyy-MM-dd"></datepicker>
            <select  id="endDateHour" style="width: 55px;">
                <option :value="item" v-for="item in hour">{{item}}</option>
            </select> -->
            <div class="form-group" style="display: inline-block; width: 250px;margin: 0;vertical-align: middle;">
                <div class="input-group date form_datetime" data-date="" 
                data-date-format="yyyy-mm-dd hh" data-link-field="dtp_input1"
                >
                    <input class="form-control" style="margin: 0;float: right;" id="endDate" type="text" value=""  placeholder="请选择结束时间">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
            </div>
            问卷类型：
            <select  id="type" class="form-control">
                <option value="">全部</option>
                <option v-for="item in typeArr" :value="item[0]">{{item[1]}}</option>
            </select>
            <button class="btn btn-primary" @click="inquire(quesName,beginDate,endDate,type,1,10)">查询</button>
        </div>
        <table id="result_table" class="table table-responsive">
            <thead>
            <tr>
                <th>问卷名称</th>
                <th>时效</th>
                <th>问卷类型</th>
                <th>参与答卷人数</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in initData" v-show="!noDataIsShow">
                <td :title="item[1]">{{item[1]}}</td>
                <td :title="item[3]+'-'+item[4]">{{item[3]}}-{{item[4]}}</td>
                <td :title="item[12]">{{item[12]}}</td>
                <td>{{item[8]}}</td>
                <td>
                    <router-link :to="{path:'/analysis',query:{questionId:item[0],questionName:item[1]}}">评估分析</router-link>
                </td>
            </tr>
            <tr v-show="noDataIsShow">
                <td colspan="5">暂无数据</td>
            </tr>
            </tbody>
        </table>
         <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import vTitle from '../views/vTitle'
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
            hour:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            initData: [],//初始化数据
            currPage: '',//当前页面
            pageSize: '',//每页条数
            type: "",//类型
            typeArr: [],//类型数据
            quesName: '',//问卷名称
            beginDate: '',//开始时间
            endDate: '',//结束时间
            noDataIsShow: false//控制暂无数据显隐
        }
    },
    components: {vTitle},
    mounted(){
        this.getType()
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
      goSatisfactionInfo(){
          this.$router.push("/satisfactionInfo")
      },
      pageChange(pInfo){
        //分页方法 pInfo{pageNumber: 1, pageSize: 10}
        this.currPage = pInfo.pageNumber
        this.pageSize = pInfo.pageSize
        this.inquire(this.quesName,this.beginDate,this.endDate,this.type,this.currPage,this.pageSize)
     },
     inquire(quesName,beginDate,endDate,type,currPage,pageSize){
        //查询方法 默认加载数据
        this.quesName = $('#quesName').val();
        this.type = $('#type').val();
        this.beginDate = $('#beginDate').val()
        this.endDate = $('#endDate').val()
        let param = new URLSearchParams()
        param.append('quesName',this.quesName)
        param.append('type',this.type)
        param.append('beginDate',this.beginDate)
        param.append('endDate',this.endDate)
        param.append('currPage',currPage)
        param.append('pageSize',pageSize)
        var startTimeStr = $("#beginDate").val()+':00'
        var stopTimeStr = $("#endDate").val()+':00'
        var d1 = new Date(startTimeStr.replace(/\-/g, "\/"));  
        var d2 = new Date(stopTimeStr.replace(/\-/g, "\/"));  
        if(this.beginDate!=""&&this.endDate!=""&&d1 >=d2){  
            this.$dialog.alert("开始时间不能大于结束时间！");  
            return false;  
        }
        this.axios({
            method: 'post',
            url: 'benefitEva.do?findPSQ',
            data: param,
        }).then(res=>{
            console.log(res.data.o)
            if(res.data.e == 0){
                this.pageSet.totalRow = res.data.n
                this.initData = res.data.o
                this.noDataIsShow = false
            }else {
                this.pageSet.totalRow = 1
                this.noDataIsShow = true
            }
        })
     },
     getType(){
         this.axios.get('benefitEva.do?PSQType').then(res=>{
             if(res.data.e == 0){
                 this.typeArr = res.data.o
             }
         })
     }
  }
}
</script>
