import{_ as y,d as w,X as V,a4 as F,s as L,ae as _,r as i,o as a,c as u,a as s,f as n,w as l,g as m,t as r,h as f,A as d,V as k}from"./index-1e676509.js";const B=w({name:"tenant-management",components:{FabButton:V,Listbox:F},data(){return{loading:!1,touched:!1,displayModal:!1,hintVisible:!0,cloneKpi:!1,kpiList:[],kpiToClone:{},cloneKpiId:Number,cloneKpiVersion:Number}},setup(){return{store:L()}},async created(){await this.getKpiList()},methods:{async getKpiList(){return this.loading=!0,this.$http.get("/knowage/restful-services/1.0/kpi/listKpi").then(e=>{this.kpiList=[...e.data]}).finally(()=>this.loading=!1)},deleteKpiConfirm(e,t){this.$confirm.require({message:this.$t("common.toast.deleteMessage"),header:this.$t("common.toast.deleteTitle"),icon:"pi pi-exclamation-triangle",accept:()=>this.deleteKpi(e,t)})},async deleteKpi(e,t){await this.$http.delete(`/knowage/restful-services/1.0/kpi/${e}/${t}/deleteKpi`).then(()=>{this.store.setInfo({title:this.$t("common.toast.deleteTitle"),msg:this.$t("common.toast.deleteSuccess")}),this.$router.push("/kpi-definition"),this.getKpiList()})},showForm(e){const t=e.value?`/kpi-definition/${e.value.id}/${e.value.version}`:"/kpi-definition/new-kpi";this.hintVisible=!1,this.touched?this.$confirm.require({message:this.$t("common.toast.unsavedChangesMessage"),header:this.$t("common.toast.unsavedChangesHeader"),icon:"pi pi-exclamation-triangle",accept:()=>{this.touched=!1,this.$router.push(t)}}):this.$router.push(t)},pageReload(){this.touched=!1,this.hintVisible=!0},onFormClose(){this.touched=!1,this.hintVisible=!0},formatDate(e){return _(e,{dateStyle:"short",timeStyle:"short"})},async reloadAndReroute(e){await this.getKpiList();let t=this.kpiList.find(c=>{if(c.name===e)return!0}),p="";t&&(p=`/kpi-definition/${t.id}/${t.version}`),this.$router.push(p),this.touched=!1,this.hintVisible=!1},emitCopyKpi(e,t){this.$router.push("/kpi-definition/new-kpi"),this.hintVisible=!1,setTimeout(()=>{this.cloneKpiId=e,this.cloneKpiVersion=t},200)}}}),D={class:"kn-page"},T={class:"kn-page-content p-grid p-m-0"},M={class:"kn-list--column p-col-4 p-sm-4 p-md-3 p-p-0"},I={class:"kn-list-item","data-test":"list-item"},N={class:"kn-list-item-text"},S={key:0,class:"kn-list-item-text-secondary"},A={class:"kn-list--column p-col-8 p-sm-8 p-md-9 p-p-0 p-m-0"};function R(e,t,p,c,q,G){const g=i("FabButton"),$=i("Toolbar"),b=i("ProgressBar"),h=i("Button"),K=i("Listbox"),C=i("router-view");return a(),u("div",D,[s("div",T,[s("div",M,[n($,{class:"kn-toolbar kn-toolbar--primary"},{start:l(()=>[m(r(e.$t("kpi.kpiDefinition.title")),1)]),end:l(()=>[n(g,{icon:"fas fa-plus",onClick:e.showForm,"data-test":"open-form-button"},null,8,["onClick"])]),_:1}),e.loading?(a(),f(b,{key:0,mode:"indeterminate",class:"kn-progress-bar","data-test":"progress-bar"})):d("",!0),e.loading?d("",!0):(a(),f(K,{key:1,class:"kn-list--column",options:e.kpiList,filter:!0,filterPlaceholder:e.$t("common.search"),optionLabel:"name",filterMatchMode:"contains",filterFields:e.name,emptyFilterMessage:e.$t("common.info.noDataFound"),onChange:e.showForm,"data-test":"kpi-list"},{empty:l(()=>[m(r(e.$t("common.info.noDataFound")),1)]),option:l(o=>[s("div",I,[s("div",N,[s("span",null,r(o.option.name),1),o.option.category?(a(),u("span",S,r(o.option.category.valueDescription),1)):d("",!0)]),n(h,{icon:"far fa-copy",class:"p-button-text p-button-rounded p-button-plain",onClick:k(v=>e.emitCopyKpi(o.option.id,o.option.version),["stop"]),"data-test":"copy-button"},null,8,["onClick"]),n(h,{icon:"far fa-trash-alt",class:"p-button-text p-button-rounded p-button-plain",onClick:k(v=>e.deleteKpiConfirm(o.option.id,o.option.version),["stop"]),"data-test":"delete-button"},null,8,["onClick"])])]),_:1},8,["options","filterPlaceholder","filterFields","emptyFilterMessage","onChange"]))]),s("div",A,[n(C,{cloneKpiId:e.cloneKpiId,cloneKpiVersion:e.cloneKpiVersion,onTouched:t[0]||(t[0]=o=>e.touched=!0),onClosed:e.onFormClose,onKpiUpdated:e.reloadAndReroute,onKpiCreated:e.reloadAndReroute,onShowDialog:e.displayInfoDialog,onOnGuideClose:t[1]||(t[1]=o=>e.showGuide=!1)},null,8,["cloneKpiId","cloneKpiVersion","onClosed","onKpiUpdated","onKpiCreated","onShowDialog"])])])])}var E=y(B,[["render",R]]);export{E as default};
//# sourceMappingURL=KpiDefinition-d5a92b37.js.map
