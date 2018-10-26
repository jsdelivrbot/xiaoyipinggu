import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import SurveyResults from '@/components/SurveyResults'
import BenefitEvaluation from '@/components/BenefitEvaluation'
import CustomerFeedback from '@/components/CustomerFeedback'
import SystemManagement from '@/components/SystemManagement'
import QuestionManage from '@/components/QuestionManage'
import QuestionnaireManage from '@/components/QuestionnaireManage'
import ModelManage from '@/components/ModelManage'
import UserManage from '@/components/UserManage'
import AnswerManage from '@/components/AnswerManage'
import LogManage from '@/components/LogManage'
import Analysis from '@/components/Analysis'
import HistoryData from '@/components/HistoryData'
import Alert from '@/views/Alert'
import Review from '@/components/Review'
import Remind from '@/components/Remind'
import TopicManage from '@/components/TopicManage'
import Swap from '@/components/Swap'
import SatisfactionInfo from '@/components/SatisfactionInfo'
import Login from '@/components/Login'
import template from '@/components/template'
import QuestionTypeManage from '@/components/QuestionTypeManage'
import QuestionTemplate from '@/components/QuestionTemplate'
import QuestionTemplate2 from '@/components/QuestionTemplate2'
import feedBack from '@/components/feedBack'
import WeRankList from '@/components/WeRankList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //重定向
      redirect: '/login',
      name: 'Header',
      component: Header,
      children: [
        {
          path: 'surveyResults',
          name: 'SurveyResults',
          component: SurveyResults
        },
        {
          path: 'benefitEvaluation',
          name: 'BenefitEvaluation',
          component: BenefitEvaluation
        },
        {
          path: 'customerFeedback',
          name: 'CustomerFeedback',
          component: CustomerFeedback
        },
        {
          path: 'systemManagement',
          //重定向
          redirect: '/questionManage',
          name: 'SystemManagement',
          component: SystemManagement,
          children: [
            {
              path: '/questionManage',
              name: 'QuestionManage',
              component: QuestionManage
            },
            {
              path: '/questionnaireManage',
              name: 'QuestionnaireManage',
              component: QuestionnaireManage
            },
            {
              path: '/modelManage',
              name: 'ModelManage',
              component: ModelManage
            },
            {
              path: '/userManage',
              name: 'UserManage',
              component: UserManage
            },
            {
              path: '/answerManage',
              name: 'AnswerManage',
              component: AnswerManage
            },
            {
              path: '/logManage',
              name: 'LogManage',
              component: LogManage
            },
            {
              path: '/questionTypeManage',
              name: 'QuestionTypeManage',
              component: QuestionTypeManage
            }
          ]
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: Analysis,
        },
        {
          path: 'historyData',
          name: 'HistoryData',
          component: HistoryData,
        },
        {
          path: 'alert',//重定向
          redirect: '/review',
          name: 'Alert',
          component: Alert,
          children: [
            {
              path: '/review',
              name: 'Review',
              component: Review,
            },
            {
              path: '/remind',
              name: 'Remind',
              component: Remind,
            }
          ]
        },
        {
          path: 'topicManage',
          name: 'TopicManage',
          component: TopicManage,
        },
        {
          path: 'swap',
          name: 'Swap',
          component: Swap,
        },
        {
          path: 'satisfactionInfo',
          name: 'SatisfactionInfo',
          component: SatisfactionInfo,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/template',
      name: 'template',
      component: template
    },
    {
      path: "/questionTemplate",
      name: "questionTemplate",
      component: QuestionTemplate
    },
    {
      path: "/questionTemplate2",
      name: "questionTemplate2",
      component: QuestionTemplate2
    },
    {
      path: "/feedBack",
      name: "feedBack",
      component: feedBack
    },
    {
      path: "/weRankList",
      name: "WeRankList",
      component: WeRankList
    }
  ]
})