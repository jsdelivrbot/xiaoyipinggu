<template>
  <div>
    <div class="bodys">
        <div class="search">
            <span>问卷类型:</span>
            <!-- <select class="form-control" id="questionType">
                <option value="">全部</option>
                <option v-for="item in selectData" :value="item.typeId">{{item.typeName}}</option>
            </select> -->
            <input type="text" class="form-control" id="questionType">
            <button class="btn btn-primary" @click="initQuestionTypeManage(typeName,1,10)">查询</button>
            <button class="btn btn-success" @click="typeAdd">添加</button>
            <button class="btn btn-warning" @click="modify">修改</button>
            <button class="btn btn-danger" @click="deleteType">删除</button>
        </div>
        <table class="table table-responsive" id="type_table">
          <thead>
              <tr>
                  <th></th>
                  <th>编号</th>
                  <th>问卷类型</th>
                  <th>创建时间</th>
                  <th>创建者</th>
              </tr>
          </thead>
            <col style="width:4%"/>
            <col style="width:5%"/>
            <col style="width:30.33%"/>
            <col style="width:30.33%"/>
            <col style="width:30.33%"/>
          <tbody>
              <tr v-for="(item,index) in initData" v-show="!noDataIsShow">
                  <td>
                    <input type="radio" name="questionType" :value="item.typeId" v-model="typeId">
                  </td>
                  <td>{{index + 1}}</td>
                  <td :title="item.typeName">{{item.typeName}}</td>
                  <td :title="item.createDate">{{item.createDate}}</td>
                  <td :title="item.creator">{{item.creator}}</td>
              </tr>
              <tr v-show="noDataIsShow">
                  <td colspan='5'>{{noData}}</td>
              </tr>
          </tbody>
        </table>
        <v-page :setting="pageSet" @page-change="pageChange"></v-page>
        <!-- 添加类型 -->
        <div class="bg_box" v-show="isAddShow">
            <div id="add_question" class="add_model">
                <div class="add_title">添加类型
                    <span class="glyphicon glyphicon-remove add_model_close"
                        @click="isAddShow = false"></span>
                </div>
                <div class="add_con">
                    <div class="add_model_con_row">
                        <span>类型名称：</span>
                        <input type="text"  name="name" id="addType"> 
                    </div>
                    <!-- <div class="add_model_con_row">
                        <span>创建者：</span>
                        <input type="text"  name="name" id="creator"> 
                    </div> -->
                    <div class="add_model_btns">
                        <button class="btn btn-primary" @click="add">确定</button>&nbsp;
                        <button class="btn btn-danger" @click="isAddShow = false">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改问题 -->
        <div class="bg_box" v-show="isModifyShow">
            <div id="add_question" class="add_model">
                <div class="add_title">修改类型
                    <span class="glyphicon glyphicon-remove add_model_close"
                        @click="isModifyShow = false"></span>
                </div>
                <div class="add_con">
                    <div class="add_model_con_row">
                        <span>类型名称：</span>
                        <input type="text"  name="name" id="modifyType"> 
                    </div>
                    <div class="add_model_btns">
                        <button class="btn btn-primary" @click="modify2">确定</button>&nbsp;
                        <button class="btn btn-danger" @click="isModifyShow = false">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            isAddShow:false,
            isModifyShow:false,
            pageSet: {
                totalRow: '',//required option
                language: 'cn',//default: 'cn'
                pageSizeMenu: false,//default: [10, 20, 50, 100]
                info: false,
                align: 'center'
            },
            initData: [],
            selectData:[],
            typeName:'',
            page: "",// 分页 页码
            rows: "",//分页 一页显示数据
            noData:'',
            noDataIsShow:false,
            typeId:[]
        }
    },
    methods: {
        pageChange(pInfo){
            //分页方法 pInfo{pageNumber: 1, pageSize: 10}
            this.page = pInfo.pageNumber
            this.rows = pInfo.pageSize
            this.initQuestionTypeManage(this.typeName,this.page,this.rows)
        },
        initQuestionTypeManage(typeName,page,rows){
            this.typeName = $('#questionType').val();
            let param = new URLSearchParams()
            param.append('typeName', this.typeName)
            param.append('page',page)
            param.append('rows',rows)
            this.axios({
                method: 'post',
                url: 'typeManagement.do?FindManagement',
                data: param,
            }).then(res=>{
                if(res.data.e == 0){
                    this.pageSet.totalRow = res.data.n
                    this.initData = res.data.o
                    this.noDataIsShow = false
                }else {
                    this.pageSet.totalRow = 1
                    this.noData = "暂无数据"
                    this.noDataIsShow = true
                }
            })
        },
        typeAdd(){
            //添加
            this.isAddShow = true
            $('#addType').val('');
        },
        add(){
            var addType = $('#addType').val();
            let param = new URLSearchParams()
            param.append('typeName', addType)
            this.axios({
                method: 'post',
                url: 'typeManagement.do?SaveManagement',
                data: param,
            }).then(res=>{
                if(res.data.e == 0){
                    this.$dialog.alert("类型名称已存在")
                }else if(res.data.e == 1){
                    this.$dialog.alert("添加成功")
                    this.isAddShow = false
                    this.initQuestionTypeManage(this.typeName,this.page,this.rows)
                }else{
                    this.$dialog.alert("添加失败")
                }
            })
        },
        modify(){
            if($("#type_table tr td input").length == 0){
                this.$dialog.alert("当前页面暂无数据")
            }else if($("#type_table tr td input:checked").length == 0){
				this.$dialog.alert("请选择一条数据")
			}else {
                this.isModifyShow = true
                let param = new URLSearchParams()
                console.log(this.typeId);
                param.append('id', this.typeId)
                this.axios({
                    method: 'post',
                    url: 'typeManagement.do?FindManagementId',
                    data: param,
                }).then(res=>{
                    console.log(res.data.o)
                    if(res.data.e == 0){
                        $('#modifyType').val(res.data.o[0].typeName)
                    }
                })
            }
        },
        modify2(){
            var modifyType = $('#modifyType').val()
            let param = new URLSearchParams()
            param.append('typeName', modifyType)
            param.append('id', this.typeId)
            this.axios({
                method: 'post',
                url: 'typeManagement.do?updateManagemen',
                data: param,
            }).then(res=>{
                console.log(res);
                console.log(res.data.e);
                if(res.data.e == 0){
                    this.$dialog.alert("类型名称已存在")
                }else if(res.data.e == 1){
                    this.$dialog.alert("类型已被模型使用")
                }else if(res.data.e == 2){
                    this.$dialog.alert("类型已被问卷使用")
                }else if(res.data.e == 3){
                    this.isModifyShow = false
                    this.$dialog.alert("修改成功")
                    this.initQuestionTypeManage(this.typeName,this.page,this.rows)
                }else{
                    this.$dialog.alert("修改失败")
                }
            })
        },
        deleteType(){
            if($("#type_table tr td input").length == 0){
                this.$dialog.alert("当前页面暂无数据")
            }else if($("#type_table tr td input:checked").length == 0){
				this.$dialog.alert("请选择一条数据")
			}else {
                let param = new URLSearchParams()
                param.append('id', this.typeId)
                this.axios({
                    method: 'post',
                    url: 'typeManagement.do?deleteManagement',
                    data: param,
                }).then(res=>{
                    console.log(res)
                    console.log(res.data.o)
                    if(res.data.e == 0){
                        this.$dialog.alert("类型名称已被模型使用，不能删除")
                    }else if(res.data.e == 1){
                        this.$dialog.alert("类型名称已被问卷使用，不能删除")
                    }else if(res.data.e == 2){
                        this.$dialog.alert("删除成功")
                        this.initQuestionTypeManage(this.typeName,this.page,this.rows)
                    }else{
                        this.$dialog.alert("删除失败")
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.add_model_con_row{
    padding: 7px 0;
    font-size: 12px;
}
.add_question_ul{
    margin: 0 auto;
    width: 70%;
}
.add_question_ul li span{
    display: inline-block;
    width: 55px;
    text-align: right;
}
.add_question_ul li input{
    width: 230px;
}
.add_model{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 2px solid #3967AE;
    border-radius: 5px;
    background: #fff;
}
.add_title{
    color: #3967AE;
    background: #F8F8FA;
    padding: 10px 15px;
}
.add_model_close{
    float: right;
    font-size: 18px;
    cursor: pointer;
}
.add_con{
    padding: 15px;
}
.add_model input,.add_model select{
    border: 1px solid #B5B5B5;
    border-radius: 3px;
    padding: 3px 10px;
}
.add_model_con_row{
    padding: 7px 0;
    font-size: 12px;
}
.add_model_btns{
    text-align: center;
    padding-top: 15px;
}
</style>