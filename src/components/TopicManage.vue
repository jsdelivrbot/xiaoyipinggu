<template>
  <div style="height:calc(100% - 80px)">
    <div class="analysis_header clearfix">
        <v-title>
          <li><a href="javascript:;" @click="back">问卷管理</a></li>
          <li class="active" slot="name">{{questionnaireName}}</li>
        </v-title>
        <button class="btn btn-warning pull-right" @click="back" style="margin-top: -40px;">返回</button>
    </div>
    <div class="nair_body">
        <transition name="fade">
            <div class="nair_body_left pull-left" v-show="isShow">
              <ul class="nair_left_ul">
                  <li>
                      <div>
                          <span>选择题型：</span>
                          <select id="questionType">
                            <option value="">全部</option>
                            <option value="单选">单选题</option>
                            <option value="多选">多选题</option>
                            <option value="填空">填空题</option>
                          </select>
                      </div>
                      <div>
                          <span>题目关键词：</span><input type="text" id="questionName">
                          <button class="btn btn-warning btn-sm" @click="inquire(questionName,questionType,1,10)" style="padding:5px;">查询</button>
                          <button class="btn btn-primary btn-sm" @click="addQuestionIsShow = true" style="padding:5px 3px;">新增题目</button>
                      </div>
                  </li>
                  <li class="drag" v-for="item in initData" :id="item.questionId" v-show="!noDataIsShow">
                    <p>{{item.questionName}}</p><span>【{{item.questionType}}题】</span>
                  </li>
                  <li v-show="noDataIsShow">{{noData}}</li>
                  <li>
                     <v-page :setting="pageSet" @page-change="pageChange"></v-page>
                  </li>
              </ul>
          </div>
        </transition>
        
        <div class="arrow" @click="isShow = !isShow">
            <span class="glyphicon" :class="{'glyphicon-forward' : !isShow,'glyphicon-backward': isShow}"></span>
        </div>
        <div class="nair_body_right pull-right" :class="{active: !isShow}">
            <div class="nair_right_header" style="width: 70%;float: left;">
                单问卷模型（支持多选）：
                <!-- <v-selectmenu :data="questionnaireModelVal" key-field="FormulaNum" show-field="FormulaName" :multiple="true" ref="sm" style="width: 200px;display: inline-block;">
                </v-selectmenu> -->
                <!-- <v-select 
                    :placeholder="placeholder"
                    multiple 
                    :options="questionnaireModelVal" 
                    label="FormulaName"  
                    @input="questionnaireModel_select"
                    :value.sync="questionnaireModel_obj"
                    style="display:inline-block;vertical-align: middle;">
                </v-select> -->
                <v-selectmenu 
                    v-if="questionnaireModelVal!=''&&questionnaireModelVal!=null" 
                    v-model="value2" 
                    :data="questionnaireModelVal" 
                    key-field="FormulaNum" 
                    show-field="FormulaName" 
                    :multiple="true"
                    :query="false"
                    ref="sm"
                    style="display:inline-block;">
                </v-selectmenu>
                <select v-else class="form-control" style="display:inline-block;width:110px;">
                    <option>暂无数据</option>
                </select>
                总满意度模型:
                <select id="zongmanyiduSelect" class="form-control" style="display:inline-block;width:110px;" @click="zongmanyiduChange">
                    <option value="">请选择</option>
                    <option :value="item.FormulaNum" :data="item.generalFormula" :title="item.generalFormula" v-for="item in zongmanyiduArr">{{item.formulaName}}</option>
                </select>
                <button class="btn btn-primary" @click="match_model_isShow=true">填空题模型匹配</button>
                <button class="btn btn-warning" @click="addShow">添加模型</button>
                <label for="checkAnswer" class="checkAnswer checkAll" data-check='open'>
                    <input type="checkbox" id="checkAnswer" checked="true">
                    展开
                </label>
                <!-- <button class="btn btn-info checkAnswer" id="checkAnswer" data-check='open'>关闭所有题目</button> -->
            </div>
            <div class="nair_right_header" style="width: 30%;float: left;padding: 32px 20px;">问卷所选模型</div>
            <ol class="nair_right_ul" style="width:70%;float:left;overflow: auto;height: calc(100% - 101px);max-height:550px;">
              <li class="drap" v-for="item in initTopicData" :id="item.questionId" v-show="!noDataIsShow">
                <p>{{item.questionName}}</p>
                <span>【{{item.questionType}}题】</span>
                <img src="../../static/remove.png" style="width: 16px;cursor:pointer;" class="removeBtn pull-right">
                <i class="glyphicon glyphicon-chevron-down pull-right" v-if="item.answerOptions != null"></i>
                <div class="answer" v-if="item.answerOptions != null">
                    <div v-for="item2 in item.data" style="line-height:24px;">{{item2.answerOptions}} . {{item2.answerOptionsValue}}</div>
                    <!-- <span v-for="item2 in item.data">{{item2.answerOptions}} . {{item2.answerOptionsValue}} &nbsp;</span> -->
                </div>
              </li>
              <li v-show="noDataIsShow">{{noData}}</li>
            </ol>
            <ul style="width:30%;float:left;overflow: auto;height: calc(100% - 101px);">
                <li style="color:#1975b6;padding: 5px 10px;">
                    <p>单选题模型:</p>
                </li>
                <li style="padding: 5px 10px;">
                    <p>Ar*100+Br*80+Cr*60+Dr*0+(Er*Es)</p>
                </li>
                <li style="color:#1975b6;padding: 5px 10px;" v-if="arr2!=''&&arr2!=null">单问卷模型:</li>
                <li style="padding: 5px 10px;" v-for="(item,index) in arr2" v-if="arr2!=''&&arr2!=null">
                   <p>{{item}}:</p>
                   <p>{{arr3[index]}}</p>
                </li>
                <li style="color:#1975b6;padding: 5px 10px;" v-if="tiankongtiName!=''&&tiankongtiFormula!=''">填空题模型:</li>
                <li style="padding: 5px 10px;">
                   <p>{{tiankongtiName}}</p>
                   <p>{{tiankongtiFormula.split('=').join('*')}}</p>
                </li>
                <li style="color:#1975b6;padding: 5px 10px;" v-if="zongmanyidu!=''&&zongmanyidu!=''">总满意度模型:</li>
                <li style="padding: 5px 10px;">
                   <p>{{zongmanyidu}}</p>
                </li>
            </ul>
            <div style="text-align:center;clear:both;margin-bottom:15px;">
                <button class="btn btn-info" @click="save(0)">保存</button>
            </div>
        </div>
    </div>
    <!-- 添加问题 -->
    <div class="bg_box" v-show="addQuestionIsShow">
         <div id="add_question" class="add_model">
            <div class="add_title">添加题目
                <span class="glyphicon glyphicon-remove add_model_close"
                        @click="addQuestionIsShow = false"></span>
            </div>
            <div class="add_con">
                <div class="add_model_con_row">
                    <span>选择题型：</span>
                    <input type="radio" name="name3" id="name1" value="单选" v-model="radioVal" @click="fill_inthe_blank_isShow=false;add_question_ul_isShow=true;likeQueryShow=false"> 
                    <label for="name1" @click="fill_inthe_blank_isShow=false;add_question_ul_isShow=true">单选</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="name3" id="name2" value="多选" v-model="radioVal" @click="fill_inthe_blank_isShow=false;add_question_ul_isShow=true;likeQueryShow=false">
                    <label for="name2" @click="fill_inthe_blank_isShow=false;add_question_ul_isShow=true">多选</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="name3" id="name3" value="填空" v-model="radioVal" @click="fill_inthe_blank_isShow=true;add_question_ul_isShow=false">
                    <label for="name3" @click="fill_inthe_blank_isShow=true;add_question_ul_isShow=false">填空</label>
                </div>
                <ul class="add_question_ul add_single_ul" v-if="radioVal == '单选'">
                    <li class="add_model_con_row" style="position:relative;">
                        <span>题目：</span>
                        <input type="text" id="topic" maxlength="255" @input="addLikeQuery">
                        <ul class="addLikeQuery" v-show="likeQueryShow" style="position: absolute;top: 28px;left: 61px;max-height: 80px;overflow: auto;background: #fff;width: 230px;border: 1px solid #3967AE;border-radius: 3px;">
                            <li v-for="like in likeQuery" @click="likeQuerySelect(like)" style="padding:3px;">{{like}}</li>
                        </ul>
                    </li>
                    <li class="add_model_con_row"><span>A选项：</span><input type="text" id="A" value="满意" maxlength="255"></li>
                    <li class="add_model_con_row"><span>B选项：</span><input type="text" id="B" value="比较满意" maxlength="255"></li>
                    <li class="add_model_con_row"><span>C选项：</span><input type="text" id="C" value="一般" maxlength="255"></li>
                    <li class="add_model_con_row"><span>D选项：</span><input type="text" id="D" value="不满意" maxlength="255"></li>
                    <li class="add_model_con_row"><span>E选项：</span><input type="text" id="E" value="说不清" maxlength="255"></li>
                </ul>
                <div style="max-height: 300px;overflow: auto;" v-else-if="radioVal == '多选'">
                    <ul class="add_question_ul add_opt_ul" style="position:relative;">
                        <li class="add_model_con_row">
                            <span>题目：</span>
                            <input type="text" id="topic" maxlength="255" @input="addLikeQuery">
                            <ul class="addLikeQuery" v-show="likeQueryShow" style="position: absolute;top: 28px;left: 61px;max-height: 80px;overflow: auto;background: #fff;width: 230px;border: 1px solid #3967AE;border-radius: 3px;">
                                <li v-for="like in likeQuery" @click="likeQuerySelect(like)" style="padding:3px;">{{like}}</li>
                            </ul>
                        </li>
                        <li class="add_model_con_row"><span>A选项：</span><input type="text" id="A" value="满意" maxlength="255"></li>
                        <li class="add_model_con_row"><span>B选项：</span><input type="text" id="B" value="比较满意" maxlength="255"></li>
                        <li class="add_model_con_row"><span>C选项：</span><input type="text" id="C" value="一般" maxlength="255"></li>
                        <li class="add_model_con_row"><span>D选项：</span><input type="text" id="D" value="不满意" maxlength="255"></li>
                        <li class="add_model_con_row"><span>E选项：</span><input type="text" id="E" value="说不清" maxlength="255"></li>
                    </ul>
                    <div style="display: inline-block;width: 50px;">
                        <img src="../../static/circle-add.png" alt="" @click="addOpt">
                        <img src="../../static/circle-minus.png" alt="" @click="minusOpt">
                    </div>
                </div>
                    
                <div class="fill_inthe_blank" v-else-if="fill_inthe_blank_isShow">
                    <div>
                        <span>题目:</span>
                        <q id="fillintheblank1" @keydown="keyAction($event,255)" style="outline: none;display:inline-block;width:270px;border-bottom: 1px solid #000;" contenteditable="true">
                        <span class="mod_fillblank" data-nostyle="true" style="display: inline;">________</span>
                        </q>
                    </div>
                    <div>
                        <span>填空设置:</span>
                        <!-- <select id="setUp1">
                            <option value="txt">文本</option>
                            <option value="num">数字</option>
                            <option value="double">小数点</option>
                        </select> -->
                        <input type="radio" name="blankType" value="txt"> 文本
                        <input type="radio" name="blankType" value="num"> 整数
                        <input type="radio" name="blankType" value="double"> 小数
                    </div>
                </div>
                <div class="add_model_btns">
                    <button class="btn btn-primary" @click="add">确定</button>&nbsp;
                    <button class="btn btn-danger" @click="addQuestionIsShow = false">取消</button>
                </div>
            </div>
            </div>
    </div>
    <!-- 匹配模型 -->
    <div class="bg_box" v-show="match_model_isShow">
        <div class="add_model" id="match_model">
        <div class="add_title">匹配模型
            <span class="glyphicon glyphicon-remove add_model_close" @click="match_model_isShow=false"></span>
        </div>
        <div class="add_model_con_row" style="padding: 10px;">
            <!-- <span>单选题模型:</span>
            <input class="form-control" type="text" readonly="readonly" value="Ar*100+Br*80+Cr*60+Dr*0+(Er*Es)" style="display: inline-block;width: 300px;">
            <br><br> -->
            <span>填空题模型名称:</span>
            <select class="form-control" style="width: 270px;display: inline-block;" id="radioModel" @change="changeMatch">
                <option value="">请选择</option>
                <option :value="item.FormulaNum" :data="item.FormulaName" :title="item.generalFormula" v-for="item in matchingVal" v-if="item.titleTypeValue == '填空题'">{{item.FormulaName}}</option>
            </select>
            <br><br>
            <span>填空题模型:</span>
            <!-- <select class="form-control"  style="width: 200px;display: inline-block;" id="fill_in_the_blankModel">
                <option value="">请选择</option>
                <option :value="item.FormulaNum" v-for="item in matchingVal" v-if="item.titleTypeValue == '填空题'">{{item.FormulaName}}</option>
            </select> -->
            <input type="text" class="form-control" id="tiankongGongshi" style="display: inline-block;width: 300px;"/>
            <br><br>
            <p style="color: #999">注:选择填空题模型名称之后填空题模型自动匹配</p>
        </div>
        <div class="add_model_btns">
            <button class="btn btn-primary" @click="modelOk">确定</button>&nbsp;
            <button class="btn btn-danger" @click="match_model_isShow=false">取消</button>
        </div>
        </div>
    </div>
    <!-- 添加模型 -->
    <div class="bg_box" v-show="add_model_isShow">
        <div class="add_model" id="add_model" style="width: 500px;">
            <div class="add_title">
                添加模型
                <span class="glyphicon glyphicon-remove add_model_close" @click="add_model_isShow=false"></span>
            </div>
            <div class="add_model_con">
                <div class="add">
                    <div style="width: 30.5%;float:left;margin: 10px 5px;text-align: center;">
                        <input type="radio" name="name" id="nameRadio1" value="填空题模型" v-model="radioVal2" @change="changeRadio">
                        <label for="nameRadio1">填空题模型</label>
                    </div>
                    <div style="width: 30.5%;float:left;margin: 10px 5px;text-align: center;">
                        <input type="radio" name="name" id="nameRadio2" value="满意度模型" v-model="radioVal2" @change="changeRadio">
                        <label for="nameRadio2">满意度模型</label>
                    </div>
                    <div style="width: 30.5%;float:left;margin: 10px 5px;text-align: center;">
                        <input type="radio" name="name" id="nameRadio3" value="总满意度模型" v-model="radioVal2" @change="changeRadio">
                        <label for="nameRadio3">总满意度模型</label>
                    </div>
                </div> 
                <div class="addAlertInfo" style="color:red;padding:5px;"></div>
                <div style="margin: 10px 0;clear:both;" class="clearfix">
                    <span>模型名称:</span>  
                    <input type="text" class="form-control modelName"  v-model="formulaNameAdd"
                        style="width: 200px;display:inline-block;"/>
                </div>
                <div style="margin: 10px 0;" class="model_type hide">
                    <span>模型类型:</span>
                    <select id="titleTypeValueAdd" class="form-control" style="width: 200px;display:inline-block;">
                        <option value="填空题">填空题</option>
                    </select>
                </div>
                <div style="margin: 10px 0;" class="hide question_type">
                    <span>问卷类型:</span>
                    <select id="titleTypeValueAdd2" class="form-control" style="width: 200px;display:inline-block;">
                        <option :value="titleTypeValueArr">{{titleTypeValueArr}}</option>
                    </select>
                </div>
                <div class="titleNum hide" style="margin: 10px 0;line-height: 40px;" >
                    <span>题&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                    <div style="display:inline-block;" class="titltNumDiv">
                        <input type="text" class="tilNumInput0 form-control" readonly="readonly" style='width: 46px;display: inline-block;'>
                        <input type="text" class="tilNumInput1 form-control" readonly="readonly" style='width: 46px;display: inline-block;'>
                    </div>
                    <br>
                    <span>权&nbsp;&nbsp;&nbsp;&nbsp;重：</span>
                    <div style="display:inline-block;" class="weightDiv">
                        <input type='text' onblur='weightBlur(0)' class='weightInput0 form-control' style='width:46px;display:inline-block;'>
                        <input type='text' onblur='weightBlur(1)' class='weightInput1 form-control' style='width:46px;display:inline-block;'>
                    </div>
                    <div class="weightAlert hide" style="color:red;margin-left:60px;"></div>
                    <div>
                        本卷单选题题号为：
                        <button class="btn btn-info" v-for="titleNum in assistTopicType" @click="singleNum(titleNum)" style="margin-right:5px;">{{titleNum}}</button>
                        <button class="btn btn-info" @click="product">生成公式</button>
                    </div>
                </div>
                <div>
                    <span id="txtAddTitle1" class="hide">模型公式:</span>
                    <input type="text" 
                        id="txtAdd1"
                        class="form-control txt hide"
                        onpaste="return false" 
                        ondragenter="return false" 
                        oncontextmenu="return false;"  
                        onkeypress = "ValidateValue(this)" 
                        onkeyup = "ValidateValue(this)"
                        style="ime-mode:disabled;display:inline-block;width: 80%;"
                        placeholder="T1*0.2+T2*0.8"
                        readonly='readonly'
                        v-model="textareaText">
                    <!-- <div class="singleNumber" v-if="singleNumStr!=''&&singleNumStr!=null">
                        目前单选题序号为：{{singleNumStr}}
                    </div>  -->
                    <div class="title_add1 hide">
                        提示：请输入以T开头+选择题题号乘以权重值如：T1*0.2+T2*0.8
                    </div>
                    <div class="title_add1 hide">
                        提示：权重值以小数的方式输入
                    </div>
                    <span id="txtAddTitle2" class=""style="margin: 10px 0;">模型题号:</span>
                    <input type="text" 
                        id="txtAdd2"
                        class="form-control txt2"
                        onpaste="return false" 
                        ondragenter="return false" 
                        oncontextmenu="return false;"  
                        onkeypress = "ValidateValue2(this)" 
                        onkeyup = "ValidateValue2(this)"
                        placeholder="T1,T2"
                        style="display:inline-block;width: 80%;margin: 10px 0;" readonly="readonly">
                    <div class="blankNumber" v-if="blankNumStr!=''&&blankNumStr!=null">
                        目前填空题序号为：
                        <button class="btn btn-info" v-for="opt in assistTopicType" @click="modelNum(opt)" style="margin-right:5px;">{{opt}}</button>
                    </div>
                    
                    <div class="title_add2">
                        提示：点击填空序号添加模型题号
                    </div>
                    <br>
                    <span id="txtAddTitle3" class="">模型基数:</span>
                    <input type="text" 
                        id="txtAdd3"
                        class="form-control txt"
                        onpaste="return false" 
                        ondragenter="return false" 
                        oncontextmenu="return false;"  
                        onkeyup = "this.value=this.value.replace(/[^\d\,]/g,'')"
                        placeholder="200,300"
                        @input = "blankChange"
                        style="display:inline-block;width: 80%;">
                    <div class="title_add2">
                        提示：可修改对应填空题的基数；以,号分隔
                        <br />
                        <span style="color:#f00;" class="blankAlert"></span>
                    </div>
                </div>
                <div>
                    <p style="color: red;display:none" id="redAdd"></p>
                    <p style="color: green;display:none" id="greenAdd"></p>
                </div>
                <div class="add_model_btns">
                    <button class="btn btn-info" onclick="regex(0)">校验</button>
                    <span class="checkArray hide">{{checkArray}}</span>
                    &nbsp;&nbsp;
                    <button class="btn btn-primary addBtn hide" @click="addModel">确定</button>
                    &nbsp;&nbsp;
                    <button class="btn btn-danger" @click="add_model_isShow=false">取消</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import vTitle from '../views/vTitle'
export default {
  data(){
    return {
        isShow: true,
        addQuestionIsShow: false,
        fill_inthe_blank_isShow: false,
        add_question_ul_isShow: true,
        add_model_isShow: false,
        match_model_isShow: false,
        pageSet: {
            totalRow: 1,//required option
            language: 'cn',//default: 'cn'
            pageSizeMenu: false,//default: [10, 20, 50, 100]
            info: false,
            align: 'center'
        },
        initData: [],//初始化数据
        page: '',//分页页码
        rows: '',//分页条数
        questionName: '',//题目名称
        questionType: '',//题目类型
        noData: '',//暂无数据
        radioVal: "单选",//题目类型-单选
        radioVal2: '填空题模型',
        initTopicData: [],//答案数据
        questionnaireModelId: [],
        questionnaireModelVal:[],
        questionnaireModel_obj: [],
        matchingVal:[],
        placeholder: '请选择',
        formulaNameAdd:'',
        textareaText:'',
        noDataIsShow: false,//判断暂无数据显隐
        questionnaireName: this.$route.query.questionnaireName,
        titleTypeValueArr:　this.$route.query.questionnaireType,
        value2: '',
        arr2: new Array(),
        arr3: new Array(),
        assistTopicType:[],
        assistTopicTypeString:'',
        blankNumStr:'',
        singleNumStr:'',
        tiankongtiName: '',
        tiankongtiFormula:'',
        txt2html : '',
        txt2Array : [],
        txt3html : '',
        txt3Array : [],
        checkArray: [],
        zongmanyidu:'',
        zongmanyiduArr: [],
        blankNumArr : [],  //满意度模型选中题号数组
        blankNumStr : '',  //满意度模型选中题号字符串
        likeQuery:[],    //添加题目模糊查询结果
        likeQueryShow:false
    }
  },
  components: {
    vTitle
  },
  mounted(){
    this.initTopic()
    this.matching()
    this.initQuestionnaireModelVal()
    this.changeMatch2()
    this.initZongmanyidu()
    //this.titleTypeValueFn()
    var filterFn = function (obj) {
      return this.questionnaireModelId.indexOf(obj.FormulaNum) > -1
    }
    this.questionnaireModel_obj = this.questionnaireModelVal.filter(filterFn, this)
    setTimeout(function(){
        //答案显隐
        $('.nair_right_ul li').off('click').on('click',function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).find('div.answer').slideToggle()
        });
        $('#checkAnswer').off('click').on('click',function(){  //答案全部展开 全部关闭
            $('.nair_right_ul li div.answer').slideToggle()
        })
        //删除题目
        $('.nair_right_ul li .removeBtn').on('click',function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().remove();
        });
        
        //拖动
        $( "#add_question" ).draggable({ containment: "parent"});
        $( "#add_model" ).draggable({ containment: "parent"});
        $( "#match_model" ).draggable({ containment: "parent"});
        
    },1000)
  },
  methods: {
    likeQuerySelect(info){
        $('#topic').val(info);
        this.likeQueryShow=false
    },
    addLikeQuery(){
        let param = new URLSearchParams()
        if(this.radioVal == '单选'){
            param.append('questionName', $('.add_single_ul #topic').val())
            console.log($('.add_single_ul #topic').val());
        }else if(this.radioVal == '多选'){
            param.append('questionName', $('.add_opt_ul #topic').val())
            console.log($('.add_opt_ul #topic').val());
        }
        param.append('questionType', this.radioVal)
        this.axios({
            method: 'post',
            url: 'questionBank.do?FindQuestionLike',
            data: param,
        }).then(res=>{
            console.log(res.data.e);
            if(res.data.e == 2){
                this.likeQueryShow=true;
                this.likeQuery = res.data.o
            }else {
                this.likeQueryShow=false;
                this.likeQuery = [];
            }
        })
    },
    pageChange(pInfo){
        //分页方法 pInfo{pageNumber: 1, pageSize: 10}
        this.page = pInfo.pageNumber
        this.rows = pInfo.pageSize
        this.inquire(this.questionName,this.questionType,this.page,this.rows)
    },
    inquire(questionName,questionType,page,rows){
        //查询方法 默认加载数据
        this.questionName = $('#questionName').val();
        this.questionType = $('#questionType').val();
        let param = new URLSearchParams()
        param.append('questionName', this.questionName)
        param.append('questionType', this.questionType)
        param.append('page',page)
        param.append('rows',rows)
        this.axios({
            method: 'post',
            url: 'questionBank.do?FindQuestion',
            data: param
        }).then(res=>{
            if(res.data.e == 0){
                this.pageSet.totalRow = res.data.n
                this.initData = res.data.o
                this.noDataIsShow = false
                var that = this
                setTimeout(()=>{
                    $(".nair_left_ul li.drag" ).draggable({
                        appendTo: "body",
                        helper: "clone"
                    });
                    $( ".nair_right_ul" ).droppable({
                        activeClass: "ui-state-default",
                        hoverClass: "ui-state-hover",
                        accept: ":not(.ui-sortable-helper)",
                        drop: function( event, ui ) {
                            var id = ui.draggable.context.id
                            var _this = this;
                            var flag = true;   //问卷中是否存在本题,true为不存在，false为存在
                            $('.nair_right_ul .drap p').each(function(){
                                if(ui.draggable[0].firstElementChild.innerText == $(this).text()){
                                    that.$dialog.alert('题目已存在,不能重复添加')
                                    flag = false;
                                    return false;
                                }else {
                                    flag = true;
                                }
                            })
                            if(flag){
                                $.ajax({
                                url:'questionBank.do?FindQuestionValue',
                                type:'post',
                                dataType:'json',
                                data:{'id':id},
                                success:function(data){
                                    if(data.e == 0){
                                        var questionType = data.o[0].questionType
                                        var answerOptions = data.o[0].answerOptions
                                        if(answerOptions != null){
                                            var answerOptionsArr = answerOptions.split(',')
                                            var answerOptionsValue = data.o[0].answerOptionsValue
                                            var answerOptionsValueArr = answerOptionsValue.split(',')
                                            var answer = "";
                                            answer += "<div class='answer'>";
                                            for(var i=0;i<answerOptionsArr.length;i++){
                                                answer += '<div style="line-height:24px;">'
                                                    +answerOptionsArr[i]+'.'+answerOptionsValueArr[i]+'</div>';
                                            }
                                            answer += "</div>";
                                        }
                                        var li = "<li class='drap' id='"+id+"'>";
                                        var p = "<p>"+ui.draggable[0].firstElementChild.innerText+"</p>";
                                        var span = '<span>【'+questionType+'题】</span>';
                                        var img = '<img src="./static/remove.png" style="width: 16px;cursor:pointer;" class="removeBtn pull-right">';
                                        var i = '<i class="glyphicon glyphicon-chevron-down pull-right"></i>';
                                        li += p;
                                        li += span;
                                        li += img;
                                        if(questionType != "填空"){
                                            li += i;
                                            li += answer;
                                        }
                                            li += "</li>";
                                            $(li).appendTo(_this);
                                            flag = false;
                                        }
                                        //答案显隐
                                        $('.nair_right_ul li').off('click').on('click',function(e){
                                            e.stopPropagation();
                                            e.preventDefault();
                                            $(this).find('div.answer').slideToggle()
                                            // $(this).find('div').slideToggle();
                                        });
                                        $('#checkAnswer').off('click').on('click',function(){  //答案全部展开 全部关闭
                                            // var checkTxt = $(this).attr('data-check');
                                            // if(checkTxt == 'close'){
                                            //     $('.nair_right_ul li div.answer').slideDown();
                                            //     $(this).attr('data-check','open');
                                            //     $(this).text('关闭所有题目')
                                            // }else if(checkTxt == 'open'){
                                            //     $('.nair_right_ul li div.answer').slideUp();
                                            //     $(this).attr('data-check','close');
                                            //     $(this).text('展开所有题目')
                                            // }
                                            $('.nair_right_ul li div.answer').slideToggle();
                                        })
                                        //删除题目
                                        $('.nair_right_ul li .removeBtn').on('click',function(e){
                                            e.stopPropagation();
                                            e.preventDefault();
                                            $(this).parent().remove();
                                        });
                                    }
                                });
                            }
                        }
                    }).sortable({
                        sort: function() {
                        // 获取由 droppable 与 sortable 交互而加入的条目
                        // 使用 connectWithSortable 可以解决这个问题，但不允许您自定义 active/hoverClass 选项
                        $( this ).removeClass( "ui-state-default" );
                        }
                    });
                },500)
            }else {
                this.pageSet.totalRow = 1
                this.noData = "暂无数据"
                this.noDataIsShow = true
            }
        })
    },
    addShow(){
        this.add_model_isShow=true
        this.formulaNameAdd='';
        this.radioVal2='填空题模型'
        $('#txtAddTitle2,#txtAddTitle3,#txtAdd2,#txtAdd3,.title_add2,.blankNumber').removeClass('hide')
        $('.question_type,#txtAddTitle1,#txtAdd1,.title_add1,.titleNum').addClass('hide')
        this.findAssistTopic("【填空题】");
        $('.addAlertInfo').text('');
        this.blankUnlock();
        if(this.blankNumStr == ''){
            $('.addAlertInfo').text('当前问卷未选择填空题');
            this.blankLocking();
        }
    },
    add(){
        //添加
        if(this.radioVal == "单选"){
            var questionName = $('#topic').val()
            var questionType = this.radioVal
            var answerOptions = ""
            var answerOptionsValue = ""
            var A = $('#A').attr('id');
            var B = $('#B').attr('id');
            var C = $('#C').attr('id');
            var D = $('#D').attr('id');
            var E = $('#E').attr('id');
            answerOptions = A+','+B+','+C+','+D+','+E
            var aVal = $('#A').val();
            var bVal = $('#B').val();
            var cVal = $('#C').val();
            var dVal = $('#D').val();
            var eVal = $('#E').val();
            answerOptionsValue = aVal+','+bVal+','+cVal+','+dVal+','+eVal
            if(questionName == ""){
                this.$dialog.alert("题目名称必须填写")
                return false
            }
            if(aVal == "" || bVal == "" || cVal == "" || dVal == "" || eVal == ""){
                this.$dialog.alert("题目答案必须填写")
                return false
            }
            var arr = answerOptionsValue.split(',')
            if(this.isRepeat(arr)){
                this.$dialog.alert("题目答案不能填写相同值")
                return false
            }
            let param = new URLSearchParams()
            param.append('questionName', questionName)
            param.append('questionType', questionType)
            param.append('answerOptions',answerOptions)
            param.append('answerOptionsValue',answerOptionsValue)
            this.axios({
                method: 'post',
                url: 'questionBank.do?SaveQuestion',
                data: param,
            }).then(res=>{
                if(res.data.e == 0){
                    this.$dialog.alert("题目名称已存在")
                }else if(res.data.e == 1){
                    this.$dialog.alert("添加成功")
                    this.addQuestionIsShow = false
                    this.inquire(questionName,this.radioVal,this.page,this.rows)
                }else {
                    this.$dialog.alert("添加失败")
                }
            })
        }
        if(this.radioVal == "多选"){
            var questionName = $('#topic').val()
            var questionType = this.radioVal
            var answerOptions = ""
            var answerOptionsValue = ""
            // var A = $('#A').attr('id');
            // var B = $('#B').attr('id');
            // var C = $('#C').attr('id');
            // var D = $('#D').attr('id');
            // var E = $('#E').attr('id');
            // answerOptions = A+','+B+','+C+','+D+','+E
            for(var i=1;i<$('.add_opt_ul li input').length;i++){
                if(answerOptions == ''){
                    answerOptions=$('.add_opt_ul li input')[1].id;
                }else{
                    answerOptions+=','+$('.add_opt_ul li input')[i].id;
                }
            }
            // var aVal = $('#A').val();
            // var bVal = $('#B').val();
            // var cVal = $('#C').val();
            // var dVal = $('#D').val();
            // var eVal = $('#E').val();
            // answerOptionsValue = aVal+','+bVal+','+cVal+','+dVal+','+eVal
            for(var i=1;i<$('.add_opt_ul li input').length;i++){
                if(answerOptionsValue == ''){
                    answerOptionsValue=$('.add_opt_ul li input')[1].value;
                }else{
                    answerOptionsValue+=','+$('.add_opt_ul li input')[i].value;
                }
            }
            if(questionName == ""){
                this.$dialog.alert("题目名称必须填写")
                return false
            }
            if(aVal == "" || bVal == "" || cVal == "" || dVal == "" || eVal == ""){
                this.$dialog.alert("题目答案必须填写")
                return false
            }
            var arr = answerOptionsValue.split(',')
            if(this.isRepeat(arr)){
                this.$dialog.alert("题目答案不能填写相同值")
                return false
            }
            let param = new URLSearchParams()
            param.append('questionName', questionName)
            param.append('questionType', questionType)
            param.append('answerOptions',answerOptions)
            param.append('answerOptionsValue',answerOptionsValue)
            this.axios({
                method: 'post',
                url: 'questionBank.do?SaveQuestion',
                data: param,
            }).then(res=>{
                if(res.data.e == 0){
                    this.$dialog.alert("题目名称已存在")
                }else if(res.data.e == 1){
                    this.$dialog.alert("添加成功")
                    this.addQuestionIsShow = false
                    this.inquire(questionName,this.radioVal,this.page,this.rows)
                }else {
                    this.$dialog.alert("添加失败")
                }
            })
        }
        if(this.radioVal == "填空"){
            var questionName = $('#fillintheblank1').text()
            //var fillingType = $('#setUp1').val()
            var fillingType = $("input[name='blankType']:checked").val();
            if(questionName == "" || questionName == "________"){
                this.$dialog.alert("题目名称必须填写")
                return false
            }
            let param = new URLSearchParams()
            param.append('questionName', questionName)
            param.append('questionType', this.radioVal)
            param.append('fillingType',fillingType)
            this.axios({
                method: 'post',
                url: 'questionBank.do?SaveQuestion',
                data: param,
            }).then(res=>{
                if(res.data.e == 0){
                    this.$dialog.alert("题目名称已存在")
                }else if(res.data.e == 1){
                    this.$dialog.alert("添加成功")
                    this.addQuestionIsShow = false
                    this.inquire(questionName,this.radioVal,this.page,this.rows)
                }else {
                    this.$dialog.alert("添加失败")
                }
            })
        }
    },
    save(num){
        // if(num == 0){
        //      if($('#radioModel').val() == "" || $('#tiankongGongshi').val() == ""){
        //         this.$dialog.alert("匹配模型之后才可以进行保存")
        //         return false
        //     }
        // }
        if(num == 0){
            this.$dialog.confirm('请确认问卷模型是否完善').then(()=>{
                // 点击确定执行
                let paramId = new URLSearchParams()
                paramId.append('id',this.$route.query.questionnaireId)
                this.axios({
                    method: 'post',
                    url: 'topicManagement.do?FindTopicManagementId',
                    data: paramId,
                }).then(res=>{
                    if(res.data.e == 0){
                        // var arrId = this.$cookies.get('arrId')
                        // console.log(arrId)
                        var questionIdArr = [];
                        $('.nair_right_ul li.drap').each(function(){
                            questionIdArr.push($(this).attr('id'));
                        });
                        var questionId = questionIdArr.join();
                        var questionnaireModelId = ""
                        var fill_in_the_blankModel = $('#tiankongGongshi').val()
                        var radioModel = $('#radioModel').val()
                        var zongmanyidu = $('#zongmanyiduSelect').val()
                        if(radioModel == "" && this.value2!=""&&zongmanyidu!=""){
                            questionnaireModelId = this.value2+','+zongmanyidu
                        }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu!=""){
                            questionnaireModelId = radioModel+','+zongmanyidu
                        }else if(zongmanyidu == ""&&radioModel!=""&&this.value2!=""){
                            questionnaireModelId = radioModel+','+this.value2
                        }else if(radioModel == "" && this.value2==""&&zongmanyidu!=""){
                            questionnaireModelId = zongmanyidu
                        }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu==""){
                            questionnaireModelId = radioModel
                        }else if(zongmanyidu == ""&&radioModel==""&&this.value2!=""){
                            questionnaireModelId = this.value2
                        }else if(this.value2 == ""&&radioModel==""&&zongmanyidu==""){
                            questionnaireModelId = ''
                        }else {
                            questionnaireModelId = radioModel+','+this.value2+','+zongmanyidu
                        }
                        let param = new URLSearchParams()
                        param.append('questionnaireId', this.$route.query.questionnaireId)
                        param.append('questionId',questionId)
                        param.append('questionModelId',1)
                        param.append('questionnaireModelId',questionnaireModelId)
                        this.axios({
                            method: 'post',
                            url: 'topicManagement.do?SaveTopicManagement',
                            data: param,
                        }).then(res=>{
                            if(res.data.e == 0){
                                if(num == 0){
                                    this.$dialog.alert("保存成功")
                                    this.$router.push('/questionnaireManage')
                                }else {
                                    location.reload()
                                }
                            }else {
                                this.$dialog.alert("请添加题目再进行保存")
                            }
                        })

                    }else {
                        // var arrId = this.$cookies.get('arrId')
                        // console.log(arrId)
                        var questionIdArr = [];
                        $('.nair_right_ul li.drap').each(function(){
                            questionIdArr.push($(this).attr('id'));
                        });
                        var questionId = questionIdArr.join();
                        var questionnaireModelId = ""
                        var fill_in_the_blankModel = $('#tiankongGongshi').val()
                        var radioModel = $('#radioModel').val()
                        var zongmanyidu = $('#zongmanyiduSelect').val()
                        if(radioModel == "" && this.value2!=""&&zongmanyidu!=""){
                            questionnaireModelId = this.value2+','+zongmanyidu
                        }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu!=""){
                            questionnaireModelId = radioModel+','+zongmanyidu
                        }else if(zongmanyidu == ""&&radioModel!=""&&this.value2!=""){
                            questionnaireModelId = radioModel+','+this.value2
                        }else if(radioModel == "" && this.value2==""&&zongmanyidu!=""){
                            questionnaireModelId = zongmanyidu
                        }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu==""){
                            questionnaireModelId = radioModel
                        }else if(zongmanyidu == ""&&radioModel==""&&this.value2!=""){
                            questionnaireModelId = this.value2
                        }else if(this.value2 == ""&&radioModel==""&&zongmanyidu==""){
                            questionnaireModelId = ''
                        }else {
                            questionnaireModelId = radioModel+','+this.value2+','+zongmanyidu
                        }
                        
                        let param = new URLSearchParams()
                        param.append('questionnaireId', this.$route.query.questionnaireId)
                        param.append('questionId',questionId)
                        param.append('questionModelId',1)
                        param.append('questionnaireModelId',questionnaireModelId)
                        this.axios({
                            method: 'post',
                            url: 'topicManagement.do?UpdateTopicManagement',
                            data: param,
                        }).then(res=>{
                        if(res.data.e == 0){
                                if(num == 0){
                                    this.$dialog.alert("保存成功")
                                    this.$router.push('/questionnaireManage')
                                }else {
                                    location.reload()
                                }
                            }else {
                                this.$dialog.alert("请添加题目再进行保存")
                            }
                        })
                    }
                })
            }).catch(()=>{
            // 点击取消执行
                console.log('')
            })
        }else {
            let paramId = new URLSearchParams()
            paramId.append('id',this.$route.query.questionnaireId)
            this.axios({
                method: 'post',
                url: 'topicManagement.do?FindTopicManagementId',
                data: paramId,
            }).then(res=>{
                if(res.data.e == 0){
                    // var arrId = this.$cookies.get('arrId')
                    // console.log(arrId)
                    var questionIdArr = [];
                    $('.nair_right_ul li.drap').each(function(){
                        questionIdArr.push($(this).attr('id'));
                    });
                    var questionId = questionIdArr.join();
                    var questionnaireModelId = ""
                    var fill_in_the_blankModel = $('#tiankongGongshi').val()
                    var radioModel = $('#radioModel').val()
                    var zongmanyidu = $('#zongmanyiduSelect').val()
                    if(radioModel == "" && this.value2!=""&&zongmanyidu!=""){
                        questionnaireModelId = this.value2+','+zongmanyidu
                    }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu!=""){
                        questionnaireModelId = radioModel+','+zongmanyidu
                    }else if(zongmanyidu == ""&&radioModel!=""&&this.value2!=""){
                        questionnaireModelId = radioModel+','+this.value2
                    }else if(radioModel == "" && this.value2==""&&zongmanyidu!=""){
                        questionnaireModelId = zongmanyidu
                    }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu==""){
                        questionnaireModelId = radioModel
                    }else if(zongmanyidu == ""&&radioModel==""&&this.value2!=""){
                        questionnaireModelId = this.value2
                    }else if(this.value2 == ""&&radioModel==""&&zongmanyidu==""){
                        questionnaireModelId = ""
                    }else {
                        questionnaireModelId = radioModel+','+this.value2+','+zongmanyidu
                    }
                    let param = new URLSearchParams()
                    param.append('questionnaireId', this.$route.query.questionnaireId)
                    param.append('questionId',questionId)
                    param.append('questionModelId',1)
                    param.append('questionnaireModelId',questionnaireModelId)
                    this.axios({
                        method: 'post',
                        url: 'topicManagement.do?SaveTopicManagement',
                        data: param,
                    }).then(res=>{
                        if(res.data.e == 0){
                            if(num == 0){
                                this.$dialog.alert("保存成功")
                                this.$router.push('/questionnaireManage')
                            }else {
                                location.reload()
                            }
                        }else {
                            this.$dialog.alert("请添加题目再进行保存")
                        }
                    })

                }else {
                    // var arrId = this.$cookies.get('arrId')
                    // console.log(arrId)
                    var questionIdArr = [];
                    $('.nair_right_ul li.drap').each(function(){
                        questionIdArr.push($(this).attr('id'));
                    });
                    var questionId = questionIdArr.join();
                    var questionnaireModelId = ""
                    var fill_in_the_blankModel = $('#tiankongGongshi').val()
                    var radioModel = $('#radioModel').val()
                    var zongmanyidu = $('#zongmanyiduSelect').val()
                    if(radioModel == "" && this.value2!=""&&zongmanyidu!=""){
                        questionnaireModelId = this.value2+','+zongmanyidu
                    }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu!=""){
                        questionnaireModelId = radioModel+','+zongmanyidu
                    }else if(zongmanyidu == ""&&radioModel!=""&&this.value2!=""){
                        questionnaireModelId = radioModel+','+this.value2
                    }else if(radioModel == "" && this.value2==""&&zongmanyidu!=""){
                        questionnaireModelId = zongmanyidu
                    }else if(this.value2 == ""&&radioModel!=""&&zongmanyidu==""){
                        questionnaireModelId = radioModel
                    }else if(zongmanyidu == ""&&radioModel==""&&this.value2!=""){
                        questionnaireModelId = this.value2
                    }else if(this.value2 == ""&&radioModel==""&&zongmanyidu==""){
                        questionnaireModelId = ""
                    }else {
                        questionnaireModelId = radioModel+','+this.value2+','+zongmanyidu
                    }
                    
                    let param = new URLSearchParams()
                    param.append('questionnaireId', this.$route.query.questionnaireId)
                    param.append('questionId',questionId)
                    param.append('questionModelId',1)
                    param.append('questionnaireModelId',questionnaireModelId)
                    this.axios({
                        method: 'post',
                        url: 'topicManagement.do?UpdateTopicManagement',
                        data: param,
                    }).then(res=>{
                    if(res.data.e == 0){
                            if(num == 0){
                                this.$dialog.alert("保存成功")
                                this.$router.push('/questionnaireManage')
                            }else {
                                location.reload()
                            }
                        }else {
                            this.$dialog.alert("请添加题目再进行保存")
                        }
                    })
                }
            })
        }
    },
    initTopic(){
      let param = new URLSearchParams()
      param.append('id', this.$route.query.questionnaireId)
      this.axios({
          method: 'post',
          url: 'questionBank.do?PreviewQuestionnaire',
          data: param
      }).then(res=>{
          if(res.data.e == 0){
             for(var i = 0;i < res.data.o.length;i++){
                if(res.data.o[i].questionType != "填空"){
                  var answerOptions = res.data.o[i].answerOptions
                  if(answerOptions != null){
                    var answerOptionsArr = answerOptions.split(',')
                    var answerOptionsValue = res.data.o[i].answerOptionsValue
                    var answerOptionsValueArr = answerOptionsValue.split(',')
                  }
                //   var data = [
                //       {"answerOptions":answerOptionsArr[0],"answerOptionsValue":answerOptionsValueArr[0]},
                //       {"answerOptions":answerOptionsArr[1],"answerOptionsValue":answerOptionsValueArr[1]},
                //       {"answerOptions":answerOptionsArr[2],"answerOptionsValue":answerOptionsValueArr[2]},
                //       {"answerOptions":answerOptionsArr[3],"answerOptionsValue":answerOptionsValueArr[3]},
                //       {"answerOptions":answerOptionsArr[4],"answerOptionsValue":answerOptionsValueArr[4]}
                //     ]
                  var data = []
                  for(var j = 0;j<answerOptionsArr.length;j++){
                      data.push({"answerOptions":answerOptionsArr[j],"answerOptionsValue":answerOptionsValueArr[j]})
                  }
                  res.data.o[i].data= data
                }else {
                    var data = [
                        {
                        "answerOptions":null,"answerOptionsValue":null,"fillingType":res.data.o[i].fillingType
                        }
                    ]
                    res.data.o[i].data= data
                }
            }
            this.initTopicData = res.data.o
            this.value2 = res.data.two.问卷
            // if(this.value2 !='' && this.value2!=null){
            //     this.changeMatch2()
            // }
            // var arr = res.data.two.问卷.split(',')
            // for(var i = 0;i<arr.length;i++){
            //     this.questionnaireModelId.push(parseInt(arr[i]))
            // }
                
            var tiankongGongshi = res.data.two.填空题模型公式.split('=').join('*')
            
            $('#radioModel').val(res.data.two.填空题模型名称)
            $('#tiankongGongshi').val(tiankongGongshi)
            if($('#radioModel').find("option:selected").attr('data') ==undefined || $('#radioModel').find("option:selected").attr('data') ==''||$('#radioModel').find("option:selected").attr('data') ==null){
                this.tiankongtiName = '';
            }else {
                this.tiankongtiName = $('#radioModel').find("option:selected").attr('data')+':'; 
            }
            this.tiankongtiFormula = tiankongGongshi
            this.zongmanyidu = res.data.two.总满意度模型公式
            $('#zongmanyiduSelect').val(res.data.two.总满意度模型公式Id)
          }
      })
    },
    initQuestionnaireModelVal(){
        let param = new URLSearchParams()
        param.append('questionnaireType',this.$route.query.questionnaireType)
        this.axios({
          method: 'post',
          url: 'calcFun.do?FindCalcFunNames',
          data: param
        }).then(res=>{
            if(res.data.e == 0){
                if(res.data.o == ""){
                    this.questionnaireModelVal = ['暂无数据']
                }else {
                    for(var i = 0;i < res.data.o.length;i++){
                       this.$set(this.questionnaireModelVal,i,res.data.o[i])
                    }
                    setTimeout(function(){
                        $('.sm-selectall-button').hide()
                        $('.sm-removeall-button').hide()
                        $('div.vPagination>ul>li>a').css('padding','6px 10px')
                        var dv = $('div.v-dropdown-container .sm-results li div.sm-item-text')
                        for(var i =0;i <　dv.length;i++){
                            dv.eq(i).attr('title',res.data.o[i].generalFormula);
                        }
                    },1000)
                }
                
            }
        })
    },
    matching(){
        this.axios.get('calcFun.do?FindCalcFunName').then(res=>{
            if(res.data.e == 0){
                this.matchingVal = res.data.o
            }
        })
    },
    initZongmanyidu(){
        this.axios.get('calcFun.do?findTotalCalc').then(res=>{
            if(res.data.e == 0){
                this.zongmanyiduArr = res.data.o
            }
        })
    },
    changeMatch(){
        var radioModel = $('#radioModel').val()
        if(radioModel == ""){
            $('#tiankongGongshi').val("")
            return 
        }
        for(var arr in this.matchingVal){
            var formula=this.matchingVal[arr]
            if(formula['FormulaNum']==radioModel){
                $('#tiankongGongshi').val(formula['generalFormula'].split('=').join('*'))
            }
            
        }
    },
    changeMatch2(){
        this.arr2 = new Array();
        this.arr3 = new Array();
        if(this.value2 == ""){
            return 
        }
        var val = this.value2.split(',')
        for(var key in val){
           var radioModel=val[key]; 
            for(var arr in this.questionnaireModelVal){
                var formula=this.questionnaireModelVal[arr]
                if(formula['FormulaNum']==radioModel){
                    this.arr2.push(formula['FormulaName']);
                    this.arr3.push(formula['generalFormula']);
                }
            }
        }
    },
    zongmanyiduChange(){
        if($('#zongmanyiduSelect').find("option:selected").attr('data') ==undefined || $('#zongmanyiduSelect').find("option:selected").attr('data') ==''||$('#zongmanyiduSelect').find("option:selected").attr('data') ==null){
            this.zongmanyidu = '';
        }else {
            this.zongmanyidu = $('#zongmanyiduSelect').find("option:selected").attr('data'); 
        } 
    },
    questionnaireModel_select: function(values){
        this.questionnaireModelId =values.map(function(obj){
            return obj.FormulaNum
        })
    },
    changeSelect(){
            if($('#titleTypeValueAdd').val() == "单选题"){
                $('#txtAdd1,#txtAddTitle1').show()
                $('#txtAdd2,#txtAddTitle2').hide()
                $('#txtAdd3,#txtAddTitle3').hide()
            }else {
                $('#txtAdd1,#txtAddTitle1').hide()
                $('#txtAdd2,#txtAddTitle2').show()
                $('#txtAdd3,#txtAddTitle3').show()
            }
    },
    addModel(){
        let param = new URLSearchParams()
        // if(this.radioVal == "题目模型"){
        //     titleTypeValueAdd = $('#titleTypeValueAdd').val()
        // }else {
        //     titleTypeValueAdd = $('#titleTypeValueAdd2').val()
        // }
        var txt2 = $('#txtAdd2').val().split(',')
        var txt3 = $('#txtAdd3').val().split(',')
        var varval = "";
        for(var i = 0;i < txt2.length;i++){
            if(i == txt2.length - 1){
                varval += txt2[i]+'='+txt3[i]
            }else {
                varval += txt2[i]+'='+txt3[i]+","
            }
        }
        varval = "{"+varval+"}"
        if(this.radioVal2 == "满意度模型"){
            param.append('formulaName', this.formulaNameAdd)
            param.append('generalFormula', this.textareaText)
            param.append('titleTypeValue',$('#titleTypeValueAdd2').val())
            param.append('modelType','满意度')
        }else if(this.radioVal2 == "填空题模型"){
            param.append('formulaName', this.formulaNameAdd)
            param.append('generalFormula',varval)
            param.append('titleTypeValue',$('#titleTypeValueAdd').val())
            param.append('modelType','填空题')
        }else {
            param.append('formulaName', this.formulaNameAdd)
            param.append('generalFormula', this.textareaText)
            param.append('titleTypeValue','总满意度')
            param.append('modelType','总满意度')
            this.zongmanyidu = this.textareaText
        }
        if(this.formulaNameAdd == ""){
            this.$dialog.alert("模型名称不能为空")
            return false
        }
        this.axios({
            method: 'post',
            url: 'calcFun.do?SaveCalcFun',
            data: param,
        }).then(res=>{
            if(res.data.e == 0){
                this.$dialog.alert("模型名称已存在")
                return;
            }else if(res.data.e == 2){
                this.$dialog.alert("模型添加失败")
                return;
            }else {
                this.$dialog.alert("模型添加成功").then(()=>{
                    this.initQuestionnaireModelVal()
                    this.save(1)
                    //setTimeout(location.reload(),1000)
                    //this.initTopic()
                })
                
                this.matching()
                this.add_model_isShow = false
                $('.addBtn,#redAdd,#greenAdd').addClass('hide')
            }
        })
    },
    // titleTypeValueFn(){
    //     // this.axios.get('typeManagement.do?FindIdAndName').then(res=>{
    //     //     if(res.data.e == 0){
    //     //         this.titleTypeValueArr = res.data.o
    //     //     }
    //     // })
    // },
    changeRadio(){
        this.formulaNameAdd='';
        $('#txtAdd2').val('');
        $('#txtAdd3').val('');
        $('#redAdd').text('');
        $('#greenAdd').text('');
        $('.addAlertInfo').text('');
        if(this.radioVal2 == "满意度模型"){
            $('.model_type,#txtAddTitle2,#txtAddTitle3,#txtAdd2,#txtAdd3,.title_add2,.blankNumber,.weightAlert').addClass('hide')
            $('.question_type,#txtAddTitle1,#txtAdd1,.title_add1,.titleNum').removeClass('hide')
            $(".weightAlert").text('');
            this.blankNumArr = [];
            $('.titltNumDiv').html("<input type='text' class='tilNumInput0 form-control' readonly='readonly' style='width: 46px;display: inline-block;'>+"+
                "<input type='text' class='tilNumInput1 form-control' readonly='readonly' style='width: 46px;display: inline-block;'>");
            $('.weightDiv').html("<input type='text' onblur='weightBlur(0)' class='weightInput0 form-control' style='width:46px;display:inline-block;'>+"+
                "<input type='text' onblur='weightBlur(1)' class='weightInput1 form-control' style='width:46px;display:inline-block;'>");
            this.textareaText='';    //清空模型公式
            this.findAssistTopic("【单选题】");
            this.satisUnlock();
            if(this.singleNumStr == ''){
                $('.addAlertInfo').text('当前问卷未选择单选题');
                this.satisLocking();
            }
            $('#txtAdd1').attr('readonly','readonly');
        }else if(this.radioVal2 == "填空题模型"){
            //$('.model_type,#txtAddTitle2,#txtAddTitle3,#txtAdd2,#txtAdd3,.title_add2').removeClass('hide')
            $('#txtAddTitle2,#txtAddTitle3,#txtAdd2,#txtAdd3,.title_add2,.blankNumber').removeClass('hide')
            $('.question_type,#txtAddTitle1,#txtAdd1,.title_add1,.titleNum').addClass('hide')
            this.findAssistTopic("【填空题】");
            this.blankUnlock();
            if(this.blankNumStr == ''){
                $('.addAlertInfo').text('当前问卷未选择填空题');
                this.blankLocking();
            }
        }else if(this.radioVal2 == "总满意度模型"){
            $('#txtAddTitle1,#txtAdd1,.title_add1').removeClass('hide')
            $('.model_type,.question_type,#txtAddTitle2,#txtAddTitle3,#txtAdd2,#txtAdd3,.title_add2,.blankNumber,.titleNum').addClass('hide')
            this.findAssistTopic("【单选题】");
            this.satisUnlock();
            if(this.singleNumStr == ''){
                $('.addAlertInfo').text('当前问卷未选择单选题');
                this.satisLocking();
            }
            this.addModelToInput();
            $('#txtAdd1').removeAttr('readonly');
        }
    },
    findAssistTopic(str){
        if( this.assistTopicType!=null&& this.assistTopicType.length>0) {
            this.assistTopicType.length=0;
        }
        var _this=this;
        $('.nair_right_ul li>span').each(function(index){
            if(str==$(this).text()){
                _this.assistTopicType.push(index+1);
            }
        });
        if(str=="【填空题】"){
            this.blankNumStr = this.assistTopicType.join(',')
        }else{
            this.singleNumStr = this.assistTopicType.join(',')
        }
        
        this.checkArray = []
        if(str!="【填空题】"){
            for(var i=0;i<_this.assistTopicType.length;i++){
                this.checkArray.push('T'+_this.assistTopicType[i]);
            }
        }
        this.checkArray = this.checkArray.join(',')
    },
    addModelToInput(){
      var allTopicNumber = this.checkArray.split(",");
      var remainder=0;
      var weight=0;
      var modelArr=new Array();
      if(100%allTopicNumber.length!=0){
          remainder=100%allTopicNumber.length;
      }
      weight=parseInt(100/allTopicNumber.length);
      for(var key in allTopicNumber){
          if(key==(allTopicNumber.length-1)){
              weight+=remainder;
          }
          modelArr.push(allTopicNumber[key]+"*"+(weight/100));
      }
      if(modelArr.length>0){
          var str=modelArr.join("+");
          //$("#txtAdd1").val(str);
          this.textareaText = str
      }else{
          //$("#txtAdd1").val("当前答卷无单选题");
           this.textareaText = "当前答卷无单选题"
      }
    },
    addOpt(){
        var num = $(".add_opt_ul li").length-1;
        console.log(num);
        if(num<26){
            var charCode = String.fromCharCode(65+num)
            console.log(charCode);
            $(".add_opt_ul").append("<li class='add_model_con_row' style='padding:7px 0;'><span style='display: inline-block;width: 58px;text-align: right;'>"
                +charCode+"选项：</span><input type='text' style='width: 230px;border: 1px solid #b5b5b5;border-radius: 3px;padding: 3px 10px;' id='"
                +charCode+"' value='' placeholder='请输入选项内容' maxlength='255'></li>");
        }
        
    },
    minusOpt(){
        var num = $(".add_opt_ul li").length-1;
        console.log(num);
        if(num>2){
            $(".add_opt_ul").children("li:last-child").remove();
        }
    },
    modelOk(){
       this.match_model_isShow=false
       if($('#radioModel').find("option:selected").attr('data') ==undefined || $('#radioModel').find("option:selected").attr('data') ==''||$('#radioModel').find("option:selected").attr('data') ==null){
           this.tiankongtiName = '';
       }else {
           this.tiankongtiName = $('#radioModel').find("option:selected").attr('data')+':'; 
       }
       this.tiankongtiFormula = $('#tiankongGongshi').val()
    },
    singleNum(num){
        var weightDivHtml = '';
        var titltNumHtml = '';
        var weightDivHtml1 = "<input type='text' onblur='weightBlur(0)' class='weightInput0 form-control' style='width:46px;display:inline-block;'>";
        var titltNumHtml1 = "<input type='text' class='tilNumInput0 form-control'  readonly='readonly'  style='width: 46px;display: inline-block;'>";
        var weightDivHtml2 = "<input type='text' onblur='weightBlur(0)' class='weightInput0 form-control' style='width:46px;display:inline-block;'>+"+
            "<input type='text' onblur='weightBlur(1)' class='weightInput1 form-control' style='width:46px;display:inline-block;'>";
        var titltNumHtml2 = "<input type='text' class='tilNumInput0 form-control'  readonly='readonly'  style='width: 46px;display: inline-block;'>+"+
            "<input type='text' class='tilNumInput1 form-control' readonly='readonly' style='width: 46px;display: inline-block;'>"
        $(".weightAlert").text('').addClass('hide');
        this.textareaText = '';
        if(this.blankNumArr.length <2){
            if(this.blankNumArr.length == 0){    //未选择题号
                this.blankNumArr.push(num);
                // weightDivHtml = weightDivHtml1;
                // titltNumHtml = titltNumHtml1;
                $('.titltNumDiv').html(titltNumHtml1)
                $('.weightDiv').html(weightDivHtml1)
                $('.tilNumInput0').val(num);
            }else if(this.blankNumArr.length == 1){
                if(this.blankNumArr.indexOf(num) == -1){   //length=2
                　　this.blankNumArr.push(num);
                    $('.titltNumDiv').html(titltNumHtml2)
                    $('.weightDiv').html(weightDivHtml2)
                    $('.tilNumInput0').val(this.blankNumArr[0]);
                    $('.tilNumInput1').val(this.blankNumArr[1]);
                }else{    //length=0
                    this.blankNumArr.splice(this.blankNumArr.indexOf(num),1)
                    $('.titltNumDiv').html(titltNumHtml1)
                    $('.weightDiv').html(weightDivHtml1)
                    $('.tilNumInput0').val('');
                }
            }
        }else{
            if(this.blankNumArr.indexOf(num) == -1){   //2+
            　　this.blankNumArr.push(num); 
                for(var i=2;i<this.blankNumArr.length;i++){
                    titltNumHtml2+="+<input type='text' class='tilNumInput"+i+" form-control' readonly='readonly' value='"+this.blankNumArr[i]+"' style='width: 46px;display: inline-block;'>";
                    weightDivHtml2+="+<input type='text' onblur='weightBlur("+i+")' class='weightInput"+i+" form-control' style='width:46px;display:inline-block;'>"
                }
                $('.titltNumDiv').html(titltNumHtml2)
                $('.weightDiv').html(weightDivHtml2)
                $('.tilNumInput0').val(this.blankNumArr[0]);
                $('.tilNumInput1').val(this.blankNumArr[1]);
            }else{  //2-
                this.blankNumArr.splice(this.blankNumArr.indexOf(num),1)
                $('#txtAdd1').val('');
                if(this.blankNumArr.length <2){   //删除一个后少于2
                    $('.titltNumDiv').html(titltNumHtml1)
                    $('.weightDiv').html(weightDivHtml1)
                    $('.tilNumInput0').val(this.blankNumArr[0]);
                    // $('.tilNumInput1').val('');
                }else{    //删除一个后多于2
                    for(var i=2;i<this.blankNumArr.length;i++){
                        titltNumHtml2+="+<input type='text' class='tilNumInput"+i+" form-control' readonly='readonly' value='"+this.blankNumArr[i]+"' style='width: 46px;display: inline-block;'>";
                        weightDivHtml2+="+<input type='text' onblur='weightBlur("+i+")' class='weightInput"+i+" form-control' style='width:46px;display:inline-block;'>"
                    }
                    $('.titltNumDiv').html(titltNumHtml2)
                    $('.weightDiv').html(weightDivHtml2)
                    $('.tilNumInput0').val(this.blankNumArr[0]);
                    $('.tilNumInput1').val(this.blankNumArr[1]);
                }
            }
        }
    },
    product(){
        var production = '';
        var weight = '';
        $('#redAdd').text('');
        if(this.blankNumArr.length == 0){      //未选择题号
            production = '';
        }else{
        //}else if(this.blankNumArr.length > 1){     //选择一个题号
            // console.log('blankNumArr.length:'+this.blankNumArr.length);
            // weight = $('.weightInput0').val();
            // if(weight == ''){     //选择一个题号，但是未填写权重
            //     $('.weightAlert').removeClass('hide')
            //     $('.weightAlert').text('请填写权重');
            // }else{     //选择一个题号，并且填写正确权重
            //     console.log(weightBlur(0));
            //     if(weightBlur(0)){
            //         production = 'T'+this.blankNumArr[0]+'*'+weight;
            //     }
            // }
        // }else{     //选择题号多余一个
        //     if($('.weightInput0').val() == ''){
        //         $('.weightAlert').removeClass('hide')
        //         $('.weightAlert').text('请填写权重');
        //     }else{
        //         $('.weightAlert').text('');
        //         $('.weightAlert').addClass('hide');
        //         production = 'T'+this.blankNumArr[0]+'*'+$('.weightInput0').val();
        //     }
            
            for(var i=0;i<this.blankNumArr.length;i++){   //循环判断权重值是否符合规则
                weight = $('.weightInput'+i).val();
                if(weight == ''){
                    $('.weightAlert').removeClass('hide')
                    $('.weightAlert').text('请填写完整权重');
                    return;
                }else if(weight < 0 || weight > 1){
                    $('.weightAlert').removeClass('hide')
                    $('.weightAlert').text('权重值应大于等于0小于等于1');
                    return;
                }else{
                    $('.weightAlert').text('');
                    $('.weightAlert').addClass('hide');
                }
            }
            
            if(this.blankNumArr.length > 1){
                for(var j=0;j<this.blankNumArr.length;j++){
                    production += "+T"+this.blankNumArr[j]+'*'+$('.weightInput'+j).val();
                }
                production = production.slice(1)
            }else {
                production = "T"+this.blankNumArr[0]+'*'+$('.weightInput'+0).val();
            }
        }
        //$('#txtAdd1').val(production);
        this.textareaText = production;
        $('#greenAdd').hide()
        $('.addBtn').addClass('hide')
        return false
    },
    modelNum(num){
        $(".blankAlert").text('');
        if($('#txtAdd2').val() == ''){
            this.txt2Array.push(num)
            this.txt2html = 'T'+ num;
            this.txt3Array.push('400');
            this.txt3html = '400';
        }else{
            if(this.txt2Array.indexOf(num) == -1){
            　　 this.txt2Array.push(num)
                this.txt3Array.push('400');
            }else{
                this.txt2Array.splice(this.txt2Array.indexOf(num),1)
                console.log(this.txt2Array);
                this.txt3Array.pop();
            }

            if(this.txt2Array.join('') == ''){
                $('#txtAdd2').val('')
                this.txt2html = '';
                $('#txtAdd3').val('')
                this.txt3html = '';
            }else{
                this.txt2html = 'T'+this.txt2Array.join(',T');
                this.txt3html = this.txt3Array.join(',');
            }
        }
        $('#txtAdd2').val(this.txt2html);
        $('#txtAdd3').val(this.txt3html);
    },
    blankChange(){   //模型基数改变
        $(".blankAlert").text('');
        if($('#txtAdd2').val() == ''){  //题号为空，填写基数报错
            $(".blankAlert").text('请先选择模型题号');
            $('#greenAdd').hide()
            $('.addBtn').addClass('hide')
            return false
        }else{    //题号不为空
            if($('#txtAdd3').val() == ''){  //基数为空
                $(".blankAlert").text('模型基数不可为空');
                $('#greenAdd').hide()
                $('.addBtn').addClass('hide')
                return false
            }else{   //有逗号
                var linshi = [];
                linshi= $('#txtAdd3').val().split(',');
                if(linshi.length != this.txt2Array.length){
                    $(".blankAlert").text('模型基数的个数应与题目个数相一致');
                    $('#greenAdd').hide()
                    $('.addBtn').addClass('hide')
                    return false
                }
                for(var i=0;i<linshi.length;i++){
                    if(linshi[i] == ''){   //逗号在开头 结尾 有多个逗号相连
                        $(".blankAlert").text('模型基数格式错误');
                        $('#greenAdd').hide()
                        $('.addBtn').addClass('hide')
                        return false
                    }else if(linshi[i].length > 1){  //最少是两位数
                        if(linshi[i][0] == '0'){
                            $(".blankAlert").text('模型基数格式错误');
                            $('#greenAdd').hide()
                            $('.addBtn').addClass('hide')
                            return false
                        }
                    }
                }
            }
        }
    },
    blankLocking(){
        $('.modelName').attr('readonly','readonly');
        $('#txtAdd3').attr('readonly','readonly');
    },
    blankUnlock(){
        $('.modelName').removeAttr('readonly');
        $('#txtAdd3').removeAttr('readonly');
    },
    satisLocking(){
        $('.modelName').attr('readonly','readonly');
        $('#txtAdd1').attr('readonly','readonly');
    },
    satisUnlock(){
        $('.modelName').removeAttr('readonly');
        //$('#txtAdd1').removeAttr('readonly');
    },
    back(){
        this.$router.push({path:'/questionnaireManage',query:{index:1}})
    },
    keyAction(event,num){
        if(event.currentTarget.innerText.length > num){
            $('#fillintheblank1').attr('contenteditable',false)
            return false
        }else {
            $('#fillintheblank1').attr('contenteditable',true)
        }
    },
    isRepeat(arr){
        let  hash = {};
        for(let i in arr) {
            if(hash[arr[i]]) {
                return true;
    　　     }
            hash[arr[i]] = true;
        }
        return false;
    }
  },
  watch:{
      value2:function(){
          this.$nextTick(function(){
             this.changeMatch2();
          });
          deep:true;
      }
  }
}
</script>
<style scoped>
.analysis_header {
    padding: 2px 3%;
    background: rgb(242,242,242);
}
.analysis_header button.btn {
    padding: 5px 30px;
    margin-top: 4px;
}
.nair_body {
    width: 94%;
    margin: 0 auto;
    height: calc(100% - 60px);
    min-width: 1091px;
    overflow-x: auto;
}
.nair_body_left {
    width: 400px;
    height:calc(100% - 140px);
    position: absolute;
    overflow: auto;
}
.nair_left_ul{
    border: 1px solid #BBBBBB;
    border-radius: 3px;
}
.nair_left_ul li {
    padding: 10px 6px;
    cursor: pointer;
}
.nair_left_ul li:first-child div{
    padding: 5px 10px;
}
.nair_left_ul li:first-child div span{
    display: inline-block;
    width: 90px;
    text-align: right;
}
.nair_left_ul li:nth-child(even) {
    background: rgb(244,244,244)
}
.nair_left_ul li:hover {
    background: rgba(211,231,238,0.2);
    color: rgb(39,107,178);
}
.nair_left_ul li span {
    color: #428bca;
}
.arrow {
    width: 3%;
    background: rgba(211,231,238,0.2);
    color: rgb(39,107,178);
    height: calc(100% - 60px);
    position: absolute;
    left: 0px;
    top: 60px;
    cursor: pointer;
    text-align: right;
}
.arrow span {
    position: absolute;
    top: 50%;
    right: 50%;
    margin-top: -7px;
    margin-right: -7px;
}
.nair_body_right {
    width: calc(100% - 400px);
    height: calc(100% - 80px);
}
.nair_body_right.active {
  width: 100%;
}
.nair_right_header {
    background: #F5F9FD;
    padding: 15px 20px;
    line-height: 0;
}
img.removeBtn{
    width: 16px;
    cursor: pointer;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
#add_question{ width: 500px; }
.add_model_con_row{
    padding: 10px 20px;
    font-size: 12px;
}
.add_question_ul{
    /* margin: 0 auto; */
    width: 70%;
    display: inline-block;
    margin-left: 50px;
}
.add_question_ul li span{
    display: inline-block;
    width: 58px;
    text-align: right;
}
.add_question_ul li input{
    width: 230px;
}
.add_model{
    position: absolute;
    top: 20%;
    left: 35%;
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
.add_model_con{padding: 15px;background: #fff;}
.add_model_con>div>span{
    display: inline-block;
    width:60px;
    text-align: right;
}
.add_model_con_row{
    padding: 3px 0;
    font-size: 12px;
    background: #fff;
}
.add_model input,.add_model select{
    border: 1px solid #B5B5B5;
    border-radius: 3px;
    padding: 3px 10px;
}
.add_model_btns{
    text-align: center;
    padding: 15px;
}
.fill_inthe_blank div span {
    display: inline-block;
    width: 100px;
    text-align: right;
}
.fill_inthe_blank div {
    margin: 10px 0;
}
.fill_inthe_blank div select {
    width: 270px;
}
.weightDiv input{
    width:46px;
    display:inline-block;
}
.titltNumDiv input{
    width: 46px;
    display: inline-block;
}
.checkAll {
    padding: 6px;
    vertical-align: middle;
    margin: 0;
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    text-align: center;
    line-height: 20px;
}
</style>
