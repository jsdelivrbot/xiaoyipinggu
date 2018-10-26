<template>
  <div>
    <v-title>
      <li class="active">调查结果统计</li>
    </v-title>
    <div class="bodys">
        <div class="search">
            问卷名称：
            <input type="text" class="form-control" v-model="questionnaireName">
            时效：
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
            <!-- <select style="width: 55px;" id="startHour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
            </select> -->
            <span>到</span>
            <!-- <datepicker :language="zh" format="yyyy-MM-dd" id="stopTime"></datepicker>
            <select  style="width: 55px;" id="stopHour">
                <option value="00">00</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
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
            问卷类型：
            <select class="form-control" v-model="questionnaireType">
                <option value="">全部</option>
                <option v-for="item in questionnaireTypeArr" :value="item.typeId">{{item.typeName}}</option>
            </select>
            <button class="btn btn-primary" @click="initSurveyResults">查询</button>
        </div>
        <table id="result_table" class="table table-responsive">
            <thead>
            <tr>
                <th>问卷名称</th>
                <th>时效</th>
                <th>问卷类型</th>
                <th>推送人数</th>
                <th>参与调查人数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="!noDataShow" @click="goSatisfactionInfo(item.questionnaireId,item.questionnaireName)" v-for="item in initData">
                <td :title="item.questionnaireName">{{item.questionnaireName}}</td>
                <td :title="item.startTime+'-'+item.endTime">{{item.startTime}} - {{item.endTime}}</td>
                <td :title="item.questionnaireTypeName">{{item.questionnaireTypeName}}</td>
                <td :title="item.peleaseNum" v-if="item.questionnaireName.substring(0,2) != '公众'">{{item.peleaseNum}}</td>
                <td title="--" v-else>--</td>
                <td :title="item.participantsNum">{{item.participantsNum}}</td>
            </tr>
            <tr v-show="noDataShow">
                <td colspan="5">暂无数据</td>
            </tr>
            </tbody>
        </table>
        <v-page :setting="pageSet" @page-change="pageChange"></v-page>
    </div>
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
            initData: [],
            page:'',
            rows:'',
            questionnaireName:'',
            questionnaireType:[],
            startTime:'',
            stopTime:'',
            noDataShow: false,
            questionnaireTypeArr: []//问卷类型数据
        }
    },
    mounted(){
        // this.initSurveyResults()
        this.stateCommit()
        this.questionnaireTypeFn()
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
    components: {vTitle},
    methods: {
    pageChange(pInfo){
        this.page = pInfo.pageNumber
        this.rows = pInfo.pageSize
        this.initSurveyResults(this.questionnaireName,this.questionnaireType,this.startTime,this.stopTime,this.page,this.rows)
    },
    initSurveyResults(naireName,type,startTime,stopTime,page,rows){
        this.startTime = $("#startTime").val()
        this.stopTime = $("#stopTime").val()
        var startTimeStr = $("#startTime").val()+':00'
        var stopTimeStr = $("#stopTime").val()+':00'
        var d1 = new Date(startTimeStr.replace(/\-/g, "\/"));  
        var d2 = new Date(stopTimeStr.replace(/\-/g, "\/"));  
        if(this.startTime!=""&&this.stopTime!=""&&d1 >=d2){  
            this.$dialog.alert("开始时间不能大于结束时间！");  
            return false;  
        }
        let param = new URLSearchParams()
        param.append('questionnaireName',this.questionnaireName)
        param.append('questionnaireType',this.questionnaireType)
        param.append('startTime',this.startTime)
        param.append('stopTime',this.stopTime)
        param.append('page',this.page)
        param.append('rows',this.rows)
        this.axios({
            method: 'post',
            url: 'questionnaireAnswer.do?queryAnswer',
            data: param,
        }).then(res=>{
            if(res.data.e == 0){
                this.initData = res.data.o
                this.pageSet.totalRow = res.data.n
                this.noDataShow = false
            }else {
                this.pageSet.totalRow = 1
                this.noDataShow = true
            }
        })
    },
    goSatisfactionInfo(naireId,nairName){
        this.$router.push({path:'/satisfactionInfo',query:{'id':naireId,'nairName':nairName}})
    },
    stateCommit(){
        this.axios.get('FeedbackIng.do?StatisticalFeedbackState').then(res=>{
            if(res.data.e == 0){
                this.$store.commit('updateFeedbackNum',res.data.o)
            }
        })
        this.axios.get('informationaudit.do?FindInformationAuditTotal').then(res=>{
            if(res.data.e == 0){
                this.$store.commit('updateMessageNum',res.data.o.totalQuantity)
            }
        })
    },
    questionnaireTypeFn(){
        this.axios.get('typeManagement.do?FindIdAndName').then(res=>{
            if(res.data.e == 0){
                this.questionnaireTypeArr = res.data.o
            }
        })
    }
  }
}
</script>
<style scoped>
#result_table tbody tr {
    cursor: pointer;
}
</style>

