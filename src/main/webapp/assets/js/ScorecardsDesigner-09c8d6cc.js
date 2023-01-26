import{d as E,_ as z,r as l,o as r,h as x,l as G,n as q,i as H,a6 as F,W,w as k,f as d,g as M,t as u,a as i,G as T,D as A,p as D,b as K,y as _,c as b,z as $,A as w,B as I,C as S,a1 as Y,ad as O,s as B,bf as U,a7 as Z}from"./index-1e676509.js";import{s as V}from"./multiselect.esm-ce4000f7.js";import{s as L}from"./selectbutton.esm-1085ac65.js";import{K as tt}from"./KnHint-6d455703.js";import{f as ot}from"./filterHelper-a723991a.js";import{d as et}from"./ScorecardsDescriptor-357437dd.js";const rt=["M","MP","P"],at={M:"managers.scorecards.majority",MP:"managers.scorecards.majorityWithPriority",P:"managers.scorecards.priority"},nt={GREEN:"scorecard-kpi-icon-green",GREY:"scorecard-kpi-icon-grey","LIGHT-GREY":"scorecard-kpi-icon-light-grey",RED:"scorecard-kpi-icon-red",YELLOW:"scorecard-kpi-icon-yellow"},it={inputContainer:{flex:"0 0 261px"},multiselect:{border:"1px solid rgba(0, 0, 0, 0.12)",height:"35px","max-width":"200px"}},dt={MAJORITY:"M",MAJORITY_WITH_PRIORITY:"MP",PRIORITY:"P"},lt="MAJORITY";var C={criteriaOptions:rt,criteriaTooltipMap:at,kpiIconColorClassMap:nt,style:it,selectedCriteriaMap:dt,defaultCriteriaValue:lt};function X(t,o){return C.criteriaTooltipMap[t]?o(C.criteriaTooltipMap[t]):""}function J(t){return t.status?C.kpiIconColorClassMap[t.status]:C.kpiIconColorClassMap["LIGHT-GREY"]}function j(t){let o={};const e=t.findIndex(a=>a.valueCd===C.defaultCriteriaValue);return e!==-1&&(o=t[e]),o}function Q(t){return C.selectedCriteriaMap[t]?C.selectedCriteriaMap[t]:C.selectedCriteriaMap[C.defaultCriteriaValue]}const ct=E({name:"scorecards-table-hint",props:{hint:{type:String}},components:{KnHint:tt}});function st(t,o,e,a,f,g){const s=l("KnHint");return r(),x(s,{class:"p-my-2",title:"managers.scorecards.scorecardDesigner",hint:t.hint},null,8,["title","hint"])}var R=z(ct,[["render",st]]);const pt=["name","category.valueName","author"],bt="width: 3em",kt={dialog:{height:"80%",scrollHeight:"80vh",width:"80%"}};var ut={globalFilterFields:pt,selectColumnStyle:bt,style:kt};const ft=E({name:"scorecards-kpi-dialog",components:{Column:G,DataTable:q,Dialog:H},props:{visible:{type:Boolean},propKpis:{type:Array,required:!0},selectedKpis:{type:Array,required:!0}},emits:["close","kpiSelected"],data(){return{scorecardsKpiDialogDescriptor:ut,kpis:[],filters:{global:[ot]},selected:[],getKpiIconColorClass:J}},watch:{visible(t){t&&this.loadSelectedKpi()},propKpis(){this.loadKpi()}},created(){this.loadKpi(),this.loadSelectedKpi()},methods:{loadKpi(){var t;this.kpis=(t=this.propKpis)!=null?t:[]},loadSelectedKpi(){this.selected=this.selectedKpis},getFormattedDate(t){const o=F(t).format("DD/MM/YYYY");return W(o,"","DD/MM/YYYY")},closeDialog(){this.$emit("close"),this.selected=[]},save(){this.$emit("kpiSelected",this.selected)}}}),gt=t=>(D("data-v-732d67cf"),t=t(),K(),t),vt={class:"table-header"},mt={class:"p-input-icon-left"},ht=gt(()=>i("i",{class:"pi pi-search"},null,-1));function xt(t,o,e,a,f,g){const s=l("Toolbar"),v=l("InputText"),p=l("Column"),h=l("DataTable"),m=l("Button"),y=l("Dialog");return r(),x(y,{id:"scorecards-kpi-dialog",class:"p-fluid kn-dialog--toolbar--primary",style:A(t.scorecardsKpiDialogDescriptor.style.dialog),visible:t.visible,modal:!0,closable:!1},{header:k(()=>[d(s,{class:"kn-toolbar kn-toolbar--primary p-p-0 p-m-2 p-col-12"},{start:k(()=>[M(u(t.$t("common.kpi")),1)]),_:1})]),footer:k(()=>[d(m,{class:"kn-button kn-button--primary",onClick:t.closeDialog},{default:k(()=>[M(u(t.$t("common.close")),1)]),_:1},8,["onClick"]),d(m,{class:"kn-button kn-button--primary",onClick:t.save},{default:k(()=>[M(u(t.$t("common.save")),1)]),_:1},8,["onClick"])]),default:k(()=>[d(h,{value:t.kpis,paginator:t.kpis.length>20,rows:20,class:"p-datatable-sm kn-table p-p-2",selection:t.selected,"onUpdate:selection":o[1]||(o[1]=c=>t.selected=c),dataKey:"id",filters:t.filters,"onUpdate:filters":o[2]||(o[2]=c=>t.filters=c),globalFilterFields:t.scorecardsKpiDialogDescriptor.globalFilterFields,scrollable:!0,scrollHeight:t.scorecardsKpiDialogDescriptor.style.dialog.scrollHeight},{header:k(()=>[i("div",vt,[i("span",mt,[ht,d(v,{class:"kn-material-input",modelValue:t.filters.global.value,"onUpdate:modelValue":o[0]||(o[0]=c=>t.filters.global.value=c),placeholder:t.$t("common.search")},null,8,["modelValue","placeholder"])])])]),empty:k(()=>[M(u(t.$t("common.info.noDataFound")),1)]),default:k(()=>[d(p,{selectionMode:"multiple",headerStyle:t.scorecardsKpiDialogDescriptor.selectColumnStyle},null,8,["headerStyle"]),d(p,{class:"kn-truncated",field:"status",header:t.$t("common.status"),sortable:!0},{body:k(c=>[i("i",{class:T(["fas fa-square fa-2xl p-mr-2",t.getKpiIconColorClass(c.data)])},null,2)]),_:1},8,["header"]),d(p,{class:"kn-truncated",field:"name",header:t.$t("common.name"),sortable:!0},null,8,["header"]),d(p,{class:"kn-truncated",field:"category.valueName",header:t.$t("common.category"),sortable:!0},null,8,["header"]),d(p,{class:"kn-truncated",field:"creationDate",header:t.$t("common.creationDate"),sortable:!0},{body:k(c=>[i("span",null,u(t.getFormattedDate(c.data.creationDate)),1)]),_:1},8,["header"]),d(p,{class:"kn-truncated",field:"author",header:t.$t("common.author"),sortable:!0},null,8,["header"])]),_:1},8,["value","paginator","selection","filters","globalFilterFields","scrollHeight"])]),_:1},8,["style","visible"])}var wt=z(ft,[["render",xt],["__scopeId","data-v-732d67cf"]]);const yt=E({name:"scorecards-target-item",components:{MultiSelect:V,SelectButton:L,ScorecardsTableHint:R,ScorecardsKpiDialog:wt},props:{propTarget:{type:Object},criterias:{type:Array,required:!0},kpis:{type:Array,required:!0}},emits:["deleteTarget","openKpiDialog","touched"],data(){return{descriptor:C,target:null,expanded:!1,selectedCriteria:"M",kpiDialogVisible:!1,getSelectedCriteriaTooltip:X,getKpiIconColorClass:J}},watch:{propTarget(){this.loadTarget()}},async created(){this.loadTarget()},methods:{loadTarget(){var t;this.target=this.propTarget,this.target.name==="New Target"&&(this.expanded=!0),this.selectedCriteria=Q((t=this.target.criterion)==null?void 0:t.valueCd)},onCriteriaChange(){if(!!this.target){for(let t=0;t<this.criterias.length;t++)if(this.selectedCriteria==="M"&&this.criterias[t].valueCd==="MAJORITY"||this.selectedCriteria==="MP"&&this.criterias[t].valueCd==="MAJORITY_WITH_PRIORITY"||this.selectedCriteria==="P"&&this.criterias[t].valueCd==="PRIORITY"){this.target.criterion=this.criterias[t],this.$emit("touched",!0),this.target.updated=!0;break}}},openKpiDialog(){this.kpiDialogVisible=!0},onKpiSelected(t){this.target&&(this.target.kpis=t,this.$emit("touched",!0),this.target.updated=!0,this.expanded=!0),this.kpiDialogVisible=!1},deleteKpiConfirm(t){this.$confirm.require({message:this.$t("common.toast.deleteMessage"),header:this.$t("common.toast.deleteConfirmTitle"),icon:"pi pi-exclamation-triangle",accept:()=>this.deleteKpi(t)})},async deleteKpi(t){if(!this.target)return;const o=this.target.kpis.findIndex(e=>e.id===t.id);if(o!==-1){if(this.target.kpis.splice(o,1),this.target.criterion.valueCd!=="MAJORITY"){const e=this.target.options.criterionPriority.findIndex(a=>a===t.name);e!==-1&&this.target.options.criterionPriority.splice(e,1)}this.$emit("touched",!0),this.target.updated=!0}},deleteTargetConfirm(){this.$confirm.require({message:this.$t("common.toast.deleteMessage"),header:this.$t("common.toast.deleteConfirmTitle"),icon:"pi pi-exclamation-triangle",accept:()=>this.$emit("deleteTarget",this.target)})},onCriterionPriortyChanged(){this.$emit("touched",!0),this.target&&(this.target.updated=!0)}}}),Mt=t=>(D("data-v-03b37cf6"),t=t(),K(),t),Ct={key:0},At={class:"p-d-flex p-flex-row p-ai-center scorecards-target-container"},Et={class:"p-d-flex p-ai-center p-ml-5"},zt=Mt(()=>i("i",{class:"fa fa-bullseye fa-lg p-mr-1 scorecard-blue-icon"},null,-1)),Tt={class:"p-d-flex p-flex-row p-ai-center"},$t=["data-test"],It={class:"p-ml-auto"},St={key:0},Pt={key:0,class:"p-d-flex p-flex-row p-ai-center scorecards-kpi-container"},Dt={class:"scorecards-kpi-info"},Kt={class:"p-ml-auto"};function _t(t,o,e,a,f,g){const s=l("Button"),v=l("InputText"),p=l("SelectButton"),h=l("MultiSelect"),m=l("ScorecardsTableHint"),y=l("ScorecardsKpiDialog"),c=_("tooltip");return t.target?(r(),b("div",Ct,[i("div",At,[i("div",Et,[t.expanded?(r(),x(s,{key:1,icon:"fas fa-chevron-down",class:"p-button-text p-button-rounded p-button-plain",onClick:o[1]||(o[1]=n=>t.expanded=!1)})):(r(),x(s,{key:0,icon:"fas fa-chevron-right",class:"p-button-text p-button-rounded p-button-plain",onClick:o[0]||(o[0]=n=>t.expanded=!0)})),zt,d(v,{class:"kn-material-input scorecards-target-name-input",modelValue:t.target.name,"onUpdate:modelValue":o[2]||(o[2]=n=>t.target.name=n),maxLength:40,onInput:o[3]||(o[3]=n=>t.$emit("touched",!1))},null,8,["modelValue"])]),i("div",Tt,[d(p,{class:"p-mr-1",modelValue:t.selectedCriteria,"onUpdate:modelValue":o[4]||(o[4]=n=>t.selectedCriteria=n),options:t.descriptor.criteriaOptions,onChange:t.onCriteriaChange},{option:k(n=>[$((r(),b("span",{"data-test":"select-button-"+n.option},[M(u(n.option),1)],8,$t)),[[c,t.getSelectedCriteriaTooltip(n.option,t.$t)]])]),_:1},8,["modelValue","options","onChange"]),t.selectedCriteria!=="M"?(r(),x(h,{key:0,style:A(t.descriptor.style.multiselect),modelValue:t.target.options.criterionPriority,"onUpdate:modelValue":o[5]||(o[5]=n=>t.target.options.criterionPriority=n),options:t.target.kpis,optionLabel:"name",optionValue:"name",onChange:t.onCriterionPriortyChanged,"data-test":"criteria-select-input"},null,8,["style","modelValue","options","onChange"])):w("",!0)]),i("div",It,[$(d(s,{icon:"fa-solid fa-square-plus",class:"p-button-text p-button-rounded p-button-plain",onClick:t.openKpiDialog},null,8,["onClick"]),[[c,t.$t("managers.scorecards.addKpi"),void 0,{top:!0}]]),d(s,{icon:"fas fa-trash-alt",class:"p-button-text p-button-rounded p-button-plain",onClick:t.deleteTargetConfirm},null,8,["onClick"])])]),t.expanded?(r(),b("div",St,[t.target.kpis.length===0?(r(),b("div",Pt,[d(m,{hint:"managers.scorecards.addKpiHint"},null,8,["hint"])])):(r(!0),b(I,{key:1},S(t.target.kpis,(n,P)=>(r(),b("div",{key:P,class:"p-d-flex p-flex-row p-ai-center scorecards-kpi-container"},[i("div",Dt,[i("i",{class:T(["fas fa-square fa-2xl p-mr-2",t.getKpiIconColorClass(n)])},null,2),i("span",null,u(n.name),1)]),i("div",Kt,[d(s,{icon:"fas fa-trash-alt",class:"p-button-text p-button-rounded p-button-plain",onClick:N=>t.deleteKpiConfirm(n)},null,8,["onClick"])])]))),128))])):w("",!0),d(y,{visible:t.kpiDialogVisible,propKpis:t.kpis,selectedKpis:t.target.kpis,onClose:o[6]||(o[6]=n=>t.kpiDialogVisible=!1),onKpiSelected:t.onKpiSelected},null,8,["visible","propKpis","selectedKpis","onKpiSelected"])])):w("",!0)}var Rt=z(yt,[["render",_t],["__scopeId","data-v-03b37cf6"]]);const Nt=E({name:"scorecards-perspective-item",components:{MultiSelect:V,SelectButton:L,ScorecardsTargetItem:Rt,ScorecardsTableHint:R},props:{propPerspective:{type:Object},criterias:{type:Array,required:!0},kpis:{type:Array,required:!0}},emits:["deletePerspective","openKpiDialog","touched"],data(){return{descriptor:C,perspective:null,expanded:!1,selectedCriteria:"M",getSelectedCriteriaTooltip:X}},watch:{propPerspective(){this.loadPerspective()}},async created(){this.loadPerspective()},methods:{loadPerspective(){var t;this.perspective=this.propPerspective,this.perspective.name==="New Perspective"&&(this.expanded=!0),this.selectedCriteria=Q((t=this.perspective.criterion)==null?void 0:t.valueCd)},addTarget(){this.perspective&&(this.perspective.targets.push({id:Y({length:16,type:"base64"}),name:"New Target",status:"GRAY",criterion:j(this.criterias),options:{criterionPriority:[]},kpis:[],groupedKpis:[],new:!0}),this.$emit("touched"),this.expanded=!0,this.perspective.updated=!0)},onCriteriaChange(){if(!!this.perspective){for(let t=0;t<this.criterias.length;t++)if(this.selectedCriteria==="M"&&this.criterias[t].valueCd==="MAJORITY"||this.selectedCriteria==="MP"&&this.criterias[t].valueCd==="MAJORITY_WITH_PRIORITY"||this.selectedCriteria==="P"&&this.criterias[t].valueCd==="PRIORITY"){this.perspective.criterion=this.criterias[t],this.$emit("touched"),this.perspective.updated=!0;break}this.perspective.options.criterionPriority=[]}},deletePerspectiveConfirm(){this.$confirm.require({message:this.$t("common.toast.deleteMessage"),header:this.$t("common.toast.deleteConfirmTitle"),icon:"pi pi-exclamation-triangle",accept:()=>this.$emit("deletePerspective",this.perspective)})},deleteTarget(t){if(!this.perspective)return;const o=this.perspective.targets.findIndex(e=>e.id===t.id);if(o!==-1){if(this.perspective.targets.splice(o,1),this.perspective.criterion.valueCd!=="MAJORITY"){const e=this.perspective.options.criterionPriority.findIndex(a=>a===t.name);e!==-1&&this.perspective.options.criterionPriority.splice(e,1)}this.$emit("touched"),this.perspective.updated=!0}},onTargetTouched(t){this.$emit("touched"),this.perspective&&t&&(this.perspective.updated=!0)},onCriterionPriortyChanged(){this.$emit("touched",!0),this.perspective&&(this.perspective.updated=!0)}}}),Ut=t=>(D("data-v-033918c4"),t=t(),K(),t),Yt={key:0,id:"perspective"},Ot={class:"p-d-flex p-flex-row p-ai-center"},Bt=Ut(()=>i("i",{class:"fa-solid fa-rectangle-list fa-lg p-mr-1 scorecard-blue-icon"},null,-1)),Vt={class:"p-d-flex p-flex-row p-ai-center kn-flex"},Lt=["data-test"],Xt={class:"p-d-flex p-ai-center"},Jt={key:0},jt={key:0,class:"p-d-flex p-flex-row p-ai-center scorecards-kpi-container"};function Qt(t,o,e,a,f,g){const s=l("Button"),v=l("InputText"),p=l("SelectButton"),h=l("MultiSelect"),m=l("ScorecardsTableHint"),y=l("ScorecardsTargetItem"),c=_("tooltip");return t.perspective?(r(),b("div",Yt,[i("div",Ot,[i("div",{class:"p-d-flex p-ai-center",style:A(t.descriptor.style.inputContainer)},[t.expanded?(r(),x(s,{key:1,icon:"fas fa-chevron-down",class:"p-button-text p-button-rounded p-button-plain",onClick:o[1]||(o[1]=n=>t.expanded=!1)})):(r(),x(s,{key:0,icon:"fas fa-chevron-right",class:"p-button-text p-button-rounded p-button-plain",onClick:o[0]||(o[0]=n=>t.expanded=!0)})),Bt,d(v,{class:"kn-material-input scorecards-target-perspective-input",modelValue:t.perspective.name,"onUpdate:modelValue":o[2]||(o[2]=n=>t.perspective.name=n),maxLength:40,onInput:o[3]||(o[3]=n=>t.$emit("touched"))},null,8,["modelValue"])],4),i("div",Vt,[d(p,{class:"p-mr-1",modelValue:t.selectedCriteria,"onUpdate:modelValue":o[4]||(o[4]=n=>t.selectedCriteria=n),options:t.descriptor.criteriaOptions,onChange:t.onCriteriaChange},{option:k(n=>[$((r(),b("span",{"data-test":"select-button-"+n.option},[M(u(n.option),1)],8,Lt)),[[c,t.getSelectedCriteriaTooltip(n.option,t.$t)]])]),_:1},8,["modelValue","options","onChange"]),t.selectedCriteria!=="M"?(r(),x(h,{key:0,style:A(t.descriptor.style.multiselect),modelValue:t.perspective.options.criterionPriority,"onUpdate:modelValue":o[5]||(o[5]=n=>t.perspective.options.criterionPriority=n),options:t.perspective.targets,optionLabel:"name",optionValue:"name",onChange:t.onCriterionPriortyChanged,"data-test":"criteria-select-input"},null,8,["style","modelValue","options","onChange"])):w("",!0)]),i("div",Xt,[$(d(s,{icon:"fa-solid fa-square-plus",class:"p-button-text p-button-rounded p-button-plain",onClick:t.addTarget},null,8,["onClick"]),[[c,t.$t("managers.scorecards.addTarget"),void 0,{top:!0}]]),d(s,{icon:"fas fa-trash-alt",class:"p-button-text p-button-rounded p-button-plain",onClick:t.deletePerspectiveConfirm},null,8,["onClick"])])]),t.expanded?(r(),b("div",Jt,[t.perspective.targets.length===0?(r(),b("div",jt,[d(m,{hint:"managers.scorecards.addTargetHint","data-test":"no-targets-hint"},null,8,["hint"])])):(r(!0),b(I,{key:1},S(t.perspective.targets,(n,P)=>(r(),x(y,{key:P,propTarget:n,criterias:t.criterias,kpis:t.kpis,onDeleteTarget:t.deleteTarget,onOpenKpiDialog:o[6]||(o[6]=N=>t.$emit("openKpiDialog",N)),onTouched:t.onTargetTouched},null,8,["propTarget","criterias","kpis","onDeleteTarget","onTouched"]))),128))])):w("",!0)])):w("",!0)}var Gt=z(Nt,[["render",Qt],["__scopeId","data-v-033918c4"]]);const qt=E({name:"scorecards-table",components:{ScorecardsPerspectiveItem:Gt,ScorecardsTableHint:R},props:{propScorecard:{type:Object},criterias:{type:Array,required:!0},kpis:{type:Array,required:!0}},emits:["touched"],data(){return{scorecard:null}},watch:{propScorecard(){this.loadScorecard()}},created(){this.loadScorecard()},methods:{loadScorecard(){this.scorecard=this.propScorecard},addPerspective(){this.scorecard&&(this.scorecard.perspectives.push({id:Y({length:16,type:"base64"}),name:"New Perspective",status:"GRAY",criterion:j(this.criterias),options:{criterionPriority:[]},targets:[],groupedKpis:[],new:!0}),this.$emit("touched"))},deletePerspective(t){if(!this.scorecard)return;const o=this.scorecard.perspectives.findIndex(e=>e.id===t.id);o!==-1&&(this.scorecard.perspectives.splice(o,1),this.$emit("touched"))}}}),Ht={key:0,class:"p-d-flex p-flex-column kn-flex kn-overflow"},Ft={key:1,class:"kn-flex kn-overflow"};function Wt(t,o,e,a,f,g){const s=l("Button"),v=l("Toolbar"),p=l("ScorecardsTableHint"),h=l("ScorecardsPerspectiveItem");return t.scorecard?(r(),b("div",Ht,[d(v,{class:"kn-toolbar kn-toolbar--secondary"},{start:k(()=>[M(u(t.$t("managers.scorecards.perspectives")),1)]),end:k(()=>[d(s,{label:t.$t("managers.scorecards.addPerspective"),class:"p-button-text p-button-rounded p-button-plain kn-white-color",onClick:t.addPerspective,"data-test":"add-perspective-button"},null,8,["label","onClick"])]),_:1}),t.scorecard.perspectives.length===0?(r(),x(p,{key:0,class:"p-my-2",hint:"managers.scorecards.addPerspectiveHint","data-test":"no-perspective-hint"},null,8,["hint"])):(r(),b("div",Ft,[(r(!0),b(I,null,S(t.scorecard.perspectives,(m,y)=>(r(),x(h,{key:y,propPerspective:m,criterias:t.criterias,kpis:t.kpis,onDeletePerspective:t.deletePerspective,onTouched:o[0]||(o[0]=c=>t.$emit("touched"))},null,8,["propPerspective","criterias","kpis","onDeletePerspective"]))),128))]))])):w("",!0)}var Zt=z(qt,[["render",Wt]]);const to=E({name:"kn-perspective-card",components:{Card:O},props:{propPerspective:{type:Object}},data(){return{perspective:null,toolbarBorderClass:"perspective-toolbar-light-grey"}},computed:{perspectiveUpdated(){var t;return(t=this.perspective)==null?void 0:t.updated}},watch:{propPerspective(){this.loadPerspective()},async perspectiveUpdated(t){t&&this.perspective&&(await this.evaluatePerspective(),this.evaluatePerspectiveTargets(),this.perspective.updated=!1)}},setup(){return{store:B()}},created(){this.loadPerspective()},methods:{async loadPerspective(){this.perspective=this.propPerspective?this.propPerspective:{},this.perspective&&this.perspective.criterion.valueId&&(await this.evaluatePerspective(),this.evaluatePerspectiveTargets())},getTargetIconLetter(t){switch(t||(t=""),t){case"MAJORITY":return"M";case"MAJORITY_WITH_PRIORITY":return"MP";case"PRIORITY":return"P";default:return""}},async evaluateCriteria(t,o,e){this.store.setLoading(!0),await this.$http.post(`/knowage/restful-services/1.0/kpiee/${t}/evaluateCriterion`,o).then(a=>{!e&&this.perspective?(this.perspective.statusColor=a.data?a.data.status:null,this.setPerspectiveToolbarClass()):e&&(e.statusColor=a.data?a.data.status:null)}).catch(()=>{}),this.store.setLoading(!1)},async evaluatePerspective(){if(!this.perspective)return;for(let o=0;o<this.perspective.targets.length;o++)this.addGroupedTargets(this.perspective.targets[o].status),this.addGroupedKpiItems(this.perspective.targets[o]);const t=[];for(let o=0;o<this.perspective.targets.length;o++)t.push({status:this.perspective.targets[o].status,priority:!1});for(let o=0;o<this.perspective.options.criterionPriority.length;o++)for(let e=0;e<this.perspective.targets.length;e++)this.perspective.options.criterionPriority[o]===this.perspective.targets[e].name&&(t[e].priority=!0);await this.evaluateCriteria(this.perspective.criterion.valueId,t,null)},evaluatePerspectiveTargets(){var t;!this.perspective||(t=this.perspective.targets)==null||t.forEach(o=>{(o.updated||o.updated===void 0)&&(this.evaluateTarget(o),o.updated=!1)})},async evaluateTarget(t){const o=[];for(let e=0;e<t.kpis.length;e++)o.push({status:t.kpis[e].status,priority:!1});for(let e=0;e<t.options.criterionPriority.length;e++)for(let a=0;a<t.kpis.length;a++)t.options.criterionPriority[e]===t.kpis[a].name&&(o[a].priority=!0);await this.evaluateCriteria(t.criterion.valueId,o,t)},addGroupedTargets(t){var o,e,a;if(!(!this.perspective||!this.perspective.groupedTargets)){for(let f=0;f<((o=this.perspective.groupedTargets)==null?void 0:o.length);f++)if(U(this.perspective.groupedTargets[f].status,t)){this.perspective.groupedTargets[f].count++;break}(a=(e=this.perspective)==null?void 0:e.groupedTargets)==null||a.push({status:t,count:1})}},addGroupedKpiItems(t){var o,e,a;if(!(!this.perspective||!t.groupedKpis)){this.perspective.groupedKpis||(this.perspective.groupedKpis=[]);for(let f=0;f<t.groupedKpis.length;f++){const g=t.groupedKpis[f];let s=!1;for(let v=0;v<((e=(o=this.perspective)==null?void 0:o.groupedKpis)==null?void 0:e.length);v++)if(U(this.perspective.groupedKpis[v].status,g.status)){this.perspective.groupedKpis[v].count+=g.count,s=!0;break}s||(a=this.perspective.groupedKpis)==null||a.push({status:g.status,count:g.count})}}},setPerspectiveToolbarClass(){var t;if((t=this.perspective)!=null&&t.statusColor)switch(this.perspective.statusColor){case"RED":this.toolbarBorderClass="perspective-toolbar-red";break;case"YELLOW":this.toolbarBorderClass="perspective-toolbar-yellow";break;case"GREEN":this.toolbarBorderClass="perspective-toolbar-green";break;case"GREY":this.toolbarBorderClass="perspective-toolbar-grey"}else this.toolbarBorderClass="perspective-toolbar-light-grey"},getTargetStatusIconColor(t){if(t!=null&&t.statusColor)switch(t.statusColor){case"RED":return"scorecard-icon-red";case"YELLOW":return"scorecard-icon-yellow";case"GREEN":return"scorecard-icon-green";case"GREY":return"scorecard-icon-grey"}else return"scorecard-icon-light-grey"},getSelectedCriteriaTooltip(t){switch(t){case"MAJORITY":return this.$t("managers.scorecards.majority");case"MAJORITY_WITH_PRIORITY":return this.$t("managers.scorecards.majorityWithPriority");case"PRIORITY":return this.$t("managers.scorecards.priority");default:return""}},getPriorityItems(t){let o="";if(t&&t.options)for(let e=0;e<t.options.criterionPriority.length;e++)o+=t.options.criterionPriority[e],o+=e===t.options.criterionPriority.length-1?" ":", ";return o}}}),oo={class:"p-m-0 p-p-2"},eo={class:"perspective-target-icon kn-cursor-pointer"},ro={key:0,class:"p-ml-2 kn-truncated priority-items-container"},ao={class:"p-d-flex p-flex-row"},no={class:"p-mr-2 kn-flex"},io={class:"p-ml-auto perspective-target-icon kn-cursor-pointer"},lo={key:0,class:"p-ml-2 kn-truncated priority-items-container"},co={class:"p-ml-auto"};function so(t,o,e,a,f,g){const s=l("Card"),v=_("tooltip");return t.perspective?(r(),x(s,{key:0,class:"perspective-card"},{header:k(()=>{var p,h,m;return[i("div",{class:T(["perspective-header p-d-flex p-flex-row p-ai-center",t.toolbarBorderClass])},[i("h2",oo,u(t.perspective.name),1),$((r(),b("span",eo,[M(u(t.getTargetIconLetter((p=t.perspective.criterion)==null?void 0:p.valueCd)),1)])),[[v,t.getSelectedCriteriaTooltip((h=t.perspective.criterion)==null?void 0:h.valueCd)]]),((m=t.perspective.criterion)==null?void 0:m.valueCd)!=="MAJORITY"?(r(),b("div",ro,u("("+t.getPriorityItems(t.perspective)+")"),1)):w("",!0)],2)]}),content:k(()=>[(r(!0),b(I,null,S(t.perspective.targets,(p,h)=>{var m,y,c;return r(),b("div",{class:T(["target-row p-d-flex p-flex-row p-ai-center p-p-3 p-my-2",{"perspective-target-container":h!==t.perspective.targets.length-1}]),key:h},[i("div",ao,[i("span",no,u(p.name),1),$((r(),b("span",io,[M(u(t.getTargetIconLetter((m=p.criterion)==null?void 0:m.valueCd)),1)])),[[v,t.getSelectedCriteriaTooltip((y=p.criterion)==null?void 0:y.valueCd)]]),((c=p.criterion)==null?void 0:c.valueCd)!=="MAJORITY"?(r(),b("div",lo,u("("+t.getPriorityItems(p)+")"),1)):w("",!0)]),i("div",co,[i("i",{class:T(["fas fa-square fa-2xl p-mr-2",t.getTargetStatusIconColor(p)])},null,2)])],2)}),128))]),_:1})):w("",!0)}var po=z(to,[["render",so]]);const bo=E({name:"scorecards-designer",components:{Card:O,KnPerspectiveCard:po,ScorecardsTable:Zt},props:{id:{type:String}},data(){return{descriptor:et,scorecard:null,nameTouched:!1,criterias:[],kpis:[],touched:!1}},computed:{saveButtonDisabled(){return!this.scorecard||!this.scorecard.name||this.scorecard.perspectives.length===0}},watch:{async id(){await this.loadScorecard()}},setup(){return{store:B()}},async created(){await this.loadScorecard(),await this.loadCriterias(),await this.loadKpis()},methods:{async loadScorecard(){this.store.setLoading(!0),this.id?await this.$http.get(`/knowage/restful-services/1.0/kpiee/${this.id}/loadScorecard`).then(t=>this.scorecard=t.data):this.scorecard={name:"",description:"",perspectives:[]},this.store.setLoading(!1)},async loadCriterias(){this.store.setLoading(!0),await this.$http.get("/knowage/restful-services/2.0/domains/listByCode/KPI_SCORECARD_CRITE").then(t=>this.criterias=t.data),this.store.setLoading(!1)},async loadKpis(){this.store.setLoading(!0),await this.$http.get("/knowage/restful-services/1.0/kpi/listKpiWithResult").then(t=>this.kpis=t.data),this.store.setLoading(!1)},async saveScorecard(){const t=this.getFormattedScorecard(),o=t&&t.id?"update":"create";this.store.setLoading(!0),await this.$http.post("/knowage/restful-services/1.0/kpiee/saveScorecard",t).then(e=>{e.data.id&&this.scorecard&&(this.store.setInfo({title:this.$t("common.toast."+o+"Title"),msg:this.$t("common.toast.success")}),this.scorecard.id=e.data.id,o==="create"&&this.$router.push(`/scorecards/${this.scorecard.id}`),this.touched=!1)}).catch(()=>{}),this.store.setLoading(!1)},getFormattedScorecard(){var e;const t=Z(this.scorecard);if(!t)return;delete t.description;const o=["groupedKpis","statusColor","updated"];return(e=t.perspectives)==null||e.forEach(a=>{var f;a.new&&(delete a.id,delete a.new),o.forEach(g=>delete a[g]),(f=a.targets)==null||f.forEach(g=>{g.new&&(delete g.id,delete g.new),o.forEach(s=>delete g[s])})}),t},close(){this.touched?this.$confirm.require({message:this.$t("common.toast.unsavedChangesMessage"),header:this.$t("common.toast.unsavedChangesHeader"),icon:"pi pi-exclamation-triangle",accept:()=>{this.touched=!1,this.$router.push("/scorecards"),this.scorecard=null}}):(this.$router.push("/scorecards"),this.scorecard=null)}}}),ko={class:"p-fluid p-formgrid p-grid"},uo={class:"p-field p-col-6"},fo={class:"p-float-label"},go={class:"kn-material-input-label"},vo={key:0,class:"p-error"},mo={class:"p-col-12"},ho={class:"p-field p-col-6"},xo={class:"p-float-label"},wo={class:"kn-material-input-label"};function yo(t,o,e,a,f,g){const s=l("Button"),v=l("Toolbar"),p=l("InputText"),h=l("Card"),m=l("ScorecardsTable"),y=l("KnPerspectiveCard");return r(),b("div",{class:"p-d-flex kn-flex",style:A(t.descriptor.style.mainDialog)},[i("div",{class:"kn-list--column",style:A(t.descriptor.style.designer)},[d(v,{class:"kn-toolbar kn-toolbar--primary"},{start:k(()=>[M(u(t.$t("managers.scorecards.scorecardDesigner")),1)]),end:k(()=>[d(s,{class:"kn-button p-button-text",disabled:t.saveButtonDisabled,onClick:t.saveScorecard},{default:k(()=>[M(u(t.$t("common.save")),1)]),_:1},8,["disabled","onClick"]),d(s,{class:"kn-button p-button-text",onClick:t.close},{default:k(()=>[M(u(t.$t("common.close")),1)]),_:1},8,["onClick"])]),_:1}),t.scorecard?(r(),x(h,{key:0,class:"p-m-2"},{content:k(()=>[i("div",ko,[i("div",uo,[i("span",fo,[d(p,{class:T(["kn-material-input",{"p-invalid":!t.scorecard.name&&t.nameTouched}]),modelValue:t.scorecard.name,"onUpdate:modelValue":o[0]||(o[0]=c=>t.scorecard.name=c),onInput:o[1]||(o[1]=c=>t.touched=!0)},null,8,["modelValue","class"]),i("label",go,u(t.$t("common.name")+" *"),1)]),!t.scorecard.name&&t.nameTouched?(r(),b("div",vo,[i("small",mo,u(t.$t("common.validation.required",{fieldName:t.$t("documentExecution.olap.crossNavigationDefinition.parameterName")})),1)])):w("",!0)]),i("div",ho,[i("span",xo,[d(p,{class:"kn-material-input",modelValue:t.scorecard.description,"onUpdate:modelValue":o[2]||(o[2]=c=>t.scorecard.description=c),onInput:o[3]||(o[3]=c=>t.touched=!0)},null,8,["modelValue"]),i("label",wo,u(t.$t("common.description")),1)])])])]),_:1})):w("",!0),t.scorecard?(r(),x(m,{key:1,propScorecard:t.scorecard,criterias:t.criterias,kpis:t.kpis,onTouched:o[4]||(o[4]=c=>t.touched=!0)},null,8,["propScorecard","criterias","kpis"])):w("",!0)],4),t.scorecard?(r(),b("div",{key:0,id:"sideMenu",class:"kn-overflow",style:A(t.descriptor.style.perspective)},[(r(!0),b(I,null,S(t.scorecard.perspectives,(c,n)=>(r(),x(y,{class:"p-m-4",key:n,propPerspective:c,"data-test":"perspective-"+c.name},null,8,["propPerspective","data-test"]))),128))],4)):w("",!0)],4)}var $o=z(bo,[["render",yo]]);export{$o as default};
//# sourceMappingURL=ScorecardsDesigner-09c8d6cc.js.map
