import{s as Y,i as B}from"./tag.esm-b36a6db8.js";import{d as $,i as X,_ as D,r,o as t,h as d,w as a,f as i,a as c,t as b,j as q,k as Q,l as G,n as H,q as Z,u as oo,v as eo,s as L,F as M,x as U,y as R,z as E,A as k,c as p,g,B as C,C as I,D as V,E as to,G as O,H as ro,I as no,m as ao}from"./index-1e676509.js";import{s as io}from"./fileupload.esm-1d15ac9e.js";const lo=$({name:"export-dialog",components:{Dialog:X},props:{visibility:Boolean},data(){return{fileName:""}},created(){},emits:["update:visibility","export"],methods:{closeDialog(){this.$emit("update:visibility",!1)},emitExport(){this.$emit("export",this.fileName)}}}),so={class:"exportDialogContent"},co={class:"p-float-label"},po={class:"kn-material-input-label",for:"label"};function bo(o,e,n,m,z,T){const f=r("InputText"),h=r("Button"),v=r("Dialog");return t(),d(v,{class:"kn-dialog--toolbar--primary exportDialog",visible:o.visibility,header:o.$t("common.export"),closable:!1,modal:""},{footer:a(()=>[i(h,{class:"p-button-text kn-button",label:o.$t("common.cancel"),onClick:o.closeDialog},null,8,["label","onClick"]),i(h,{class:"kn-button kn-button--primary",label:o.$t("common.export"),autofocus:"",disabled:o.fileName&&o.fileName.length==0,onClick:o.emitExport},null,8,["label","disabled","onClick"])]),default:a(()=>[c("div",so,[c("span",co,[i(f,{class:"kn-material-input fileNameInputText",type:"text",modelValue:o.fileName,"onUpdate:modelValue":e[0]||(e[0]=x=>o.fileName=x),maxlength:"50"},null,8,["modelValue"]),c("label",po,b(o.$t("importExport.filenamePlaceholder")),1)])])]),_:1},8,["visible","header"])}var ko=D(lo,[["render",bo]]);const mo=$({name:"import-dialog",components:{Avatar:q,Badge:Q,Column:G,DataTable:H,Dialog:X,FileUpload:io,Message:Z,TabPanel:oo,TabView:eo,Tag:Y},props:{visibility:Boolean},data(){return{importExportDescriptor:B,uploadedFiles:[],fileName:"",filters:{},loading:!1,packageItems:{gallery:Array(),catalogFunction:Array()},selectedItems:{gallery:Array(),catalogFunction:Array()},step:0,token:""}},emits:["update:visibility","import"],setup(){return{store:L()}},created(){this.filters={global:{value:null,matchMode:M.CONTAINS},name:{operator:U.OR,constraints:[{value:null,matchMode:M.STARTS_WITH}]},type:{operator:U.OR,constraints:[{value:null,matchMode:M.STARTS_WITH}]},tags:{operator:U.OR,constraints:[{value:null,matchMode:M.CONTAINS}]}}},methods:{async cleanTempDirectory(){this.token!=""&&(this.uploadedFiles=[],await this.$http.get("/knowage-api/api/1.0/import/cleanup",{params:{token:this.token}}).then(()=>{this.token="",this.packageItems={gallery:[],catalogFunction:[]}},o=>console.log(o)))},closeDialog(){this.$emit("update:visibility",!1)},emitImport(){this.$emit("import",{files:this.uploadedFiles})},getData(o){let e=this.importExportDescriptor.import[o].column;return e.sort(function(n,m){return n.position>m.position?1:n.position<m.position?-1:0}),e},getMessageWarningCondition(){return this.selectedItems.gallery.filter(o=>!o.id||o.id&&(o.id===""||o.id===null)).length>0},getPackageItems(o){this.packageItems[o.functionality]=o.items},getSelectedItems(o){this.selectedItems[o.functionality]=o.items},async goToChooseElement(o){if(this.uploadedFiles.length==1){this.loading=!0,this.step=1;var e=new FormData;e.append("file",o[0]),await this.$http.post("/knowage-api/api/1.0/import/upload",e,{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{this.packageItems=n.data.entries,this.token=n.data.token,this.step=1},()=>this.store.setError({title:this.$t("common.error.uploading"),msg:this.$t("importExport.import.completedWithErrors")})),this.loading=!1}else this.store.setWarning({title:this.$t("common.uploading"),msg:this.$t("managers.widgetGallery.noFileProvided")})},isImportDisabled(){for(var o in this.selectedItems)if(this.selectedItems[o].length>0)return!1;return!0},onDelete(o){this.uploadedFiles.splice(o)},onUpload(o){this.uploadedFiles[0]=o.files[0]},resetAndClose(){this.resetToFirstStep(),this.closeDialog()},resetSearchFilter(){this.filters.global.value=""},async resetToFirstStep(){this.step=0,this.selectedItems={gallery:[],catalogFunction:[]},this.packageItems={gallery:[],catalogFunction:[]},this.cleanTempDirectory()},startImport(){this.store.setLoading(!0),this.$http.post("/knowage-api/api/1.0/import/bulk",this.streamlineSelectedItemsArray(),{headers:{"Content-Type":"application/json"}}).then(()=>{this.store.setInfo({title:this.$t("common.import"),msg:this.$t("importExport.import.successfullyCompleted")}),this.store.setLoading(!1)},()=>this.store.setError({title:this.$t("common.error.import"),msg:this.$t("importExport.import.completedWithErrors")})),this.token="",this.resetAndClose()},streamlineSelectedItemsArray(){let o={};o.selectedItems={};for(var e in this.selectedItems)for(var n in this.selectedItems[e])o.selectedItems[e]||(o.selectedItems[e]=[]),o.selectedItems[e].push(this.selectedItems[e][n].id);return o.token=this.token,o}}}),uo={key:0},go={key:1,class:"importExportImport"},ho={class:"table-header"},fo={class:"p-input-icon-left"},vo=c("i",{class:"pi pi-search"},null,-1),xo={class:"p-float-label kn-material-input"},wo={key:0},yo={key:1},Ao={key:2},Mo={key:1};function Eo(o,e,n,m,z,T){const f=r("FileUpload"),h=r("Message"),v=r("Badge"),x=r("InputText"),y=r("Tag"),F=r("Avatar"),N=r("Column"),s=r("DataTable"),_=r("TabPanel"),P=r("TabView"),A=r("Button"),W=r("Dialog"),j=R("tooltip"),S=R("t");return t(),d(W,{class:"kn-dialog--toolbar--primary importExportDialog",visible:o.visibility,footer:"footer",header:o.$t("common.import"),closable:!1,modal:""},{footer:a(()=>[i(A,{visible:o.visibility,class:"p-button-text kn-button thirdButton",label:o.$t("common.cancel"),onClick:o.resetAndClose},null,8,["visible","label","onClick"]),o.step==0?E((t(),d(A,{key:0,visible:o.visibility,class:"kn-button kn-button--primary",disabled:o.uploadedFiles&&o.uploadedFiles.length==0,onClick:e[2]||(e[2]=u=>o.goToChooseElement(o.uploadedFiles))},null,8,["visible","disabled"])),[[S,"common.next"]]):k("",!0),o.step==1?(t(),p("span",Mo,[E(i(A,{visible:o.visibility,class:"kn-button kn-button--secondary",onClick:o.resetToFirstStep},null,8,["visible","onClick"]),[[S,"common.back"]]),E(i(A,{visible:o.visibility,class:"kn-button kn-button--primary",disabled:o.isImportDisabled(),onClick:o.startImport},null,8,["visible","disabled","onClick"]),[[S,"common.import"]])])):k("",!0)]),default:a(()=>[o.step==0?(t(),p("div",uo,[i(f,{name:"demo[]",chooseLabel:o.$t("common.choose"),customUpload:!0,onUploader:o.onUpload,onRemove:o.onDelete,auto:"true",maxFileSize:1e7,accept:"application/zip, application/x-zip-compressed",multiple:!1,fileLimit:1},{empty:a(()=>[c("p",null,b(o.$t("common.dragAndDropFileHere")),1)]),_:1},8,["chooseLabel","onUploader","onRemove"])])):k("",!0),o.step==1?(t(),p("div",go,[o.step==1&&o.getMessageWarningCondition()?(t(),d(h,{key:0,severity:"warn"},{default:a(()=>[g(b(o.$t("importExport.itemsWithEmptyIdWarning")),1)]),_:1})):k("",!0),i(P,{onChange:o.resetSearchFilter},{default:a(()=>[(t(!0),p(C,null,I(o.importExportDescriptor.functionalities,u=>(t(),d(_,{key:u.label},{header:a(()=>[g(b(o.$t(u.label).toUpperCase())+" ",1),o.selectedItems[u.type].length&&o.selectedItems[u.type].length>0?(t(),d(v,{key:0,class:"p-ml-1",value:o.selectedItems[u.type].length},null,8,["value"])):k("",!0)]),default:a(()=>[i(s,{ref_for:!0,ref:"dt",value:o.packageItems[u.type],selection:o.selectedItems[u.type],"onUpdate:selection":l=>o.selectedItems[u.type]=l,filters:o.filters,"onUpdate:filters":e[1]||(e[1]=l=>o.filters=l),class:"p-datatable-sm kn-table functionalityTable",dataKey:"id",paginator:!0,rows:10,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",responsiveLayout:"stack",breakpoint:"960px",currentPageReportTemplate:o.$t("common.table.footer.paginated",{first:"{first}",last:"{last}",totalRecords:"{totalRecords}"}),globalFilterFields:["name","type","tags"],loading:o.loading},{header:a(()=>[c("div",ho,[c("span",fo,[vo,i(x,{class:"kn-material-input",type:"text",modelValue:o.filters.global.value,"onUpdate:modelValue":e[0]||(e[0]=l=>o.filters.global.value=l),placeholder:o.$t("common.search"),badge:"0"},null,8,["modelValue","placeholder"])])])]),empty:a(()=>[g(b(o.$t("common.info.noDataFound")),1)]),loading:a(()=>[g(b(o.$t("common.info.dataLoading")),1)]),default:a(()=>[(t(!0),p(C,null,I(o.getData(u.type),l=>(t(),d(N,{field:l.field,header:o.$t(l.header),key:l.field,style:V(l.style),selectionMode:l.field=="selectionMode"?"multiple":"",exportable:l.field=="selectionMode"?!1:""},to({_:2},[l.displayType?{name:"body",fn:a(({data:w})=>[c("span",xo,[l.displayType=="widgetTags"?(t(),p("div",wo,[(t(!0),p(C,null,I(w.tags,(J,K)=>(t(),d(y,{class:"importExportTags p-mr-1",key:K,rounded:"",value:J},null,8,["value"]))),128))])):l.displayType=="widgetGalleryType"?(t(),p("div",yo,[i(y,{style:V(o.importExportDescriptor.iconTypesMap[w.type].style)},{default:a(()=>[g(b(w.type.toUpperCase()),1)]),_:2},1032,["style"])])):l.displayType=="widgetInfo"?(t(),p("div",Ao,[w.id===null||w.id===""?E((t(),d(F,{key:0,icon:"pi pi-exclamation-triangle",shape:"circle"},null,512)),[[j,o.$t("importExport.itemWithEmptyId")]]):k("",!0)])):k("",!0)])])}:void 0]),1032,["field","header","style","selectionMode","exportable"]))),128))]),_:2},1032,["value","selection","onUpdate:selection","filters","currentPageReportTemplate","loading"])]),_:2},1024))),128))]),_:1},8,["onChange"])])):k("",!0)]),_:1},8,["visible","header"])}var Co=D(mo,[["render",Eo]]);const Io=$({name:"kn-tab-card",components:{Badge:Q},props:{badge:null,element:{},selected:Boolean}}),$o={class:"heading"},Do={key:0,class:"subheading"};function zo(o,e,n,m,z,T){const f=r("Badge"),h=r("Card");return t(),d(h,{class:O(["kn-tab-card--icon","selectable",o.selected?"selected":""])},{content:a(()=>[c("span",$o,[g(b(o.$t(o.element.label))+" ",1),o.badge&&o.badge>0?(t(),d(f,{key:0,value:o.badge},null,8,["value"])):k("",!0)]),o.element.description?(t(),p("span",Do,b(o.$t(o.element.description)),1)):k("",!0),c("i",{class:O(["icon",o.element.icon])},null,2)]),_:1},8,["class"])}var To=D(Io,[["render",zo]]);const Fo=$({name:"import-export",components:{ExportDialog:ko,KnTabCard:To,ImportDialog:Co,ProgressBar:ro},data(){return{importExportDescriptor:B,displayImportDialog:!1,displayExportDialog:!1,fileName:"",loading:!1,selectedItems:{gallery:[],catalogFunction:[]},functionalities:Array()}},setup(){return{store:L()}},mounted(){this.isEnterprise&&this.setFunctionalities()},emits:["onItemSelected"],methods:{async setFunctionalities(){this.loading=!0,this.functionalities=[];let o=this.licenses.licenses,e=this.licenses.hosts[0]?this.licenses.hosts[0].hostName:void 0;this.functionalities=B.functionalities.filter(n=>n.requiredFunctionality?this.user.functionalities.includes(n.requiredFunctionality):!0).filter(n=>n.requiredLicense&&e&&o[e]?o[e].filter(m=>m.product===n.requiredLicense).length==1:!0),this.loading=!1},getSelectedItems(o){o.items&&(this.selectedItems[o.functionality]=o.items)},isExportDisabled(){for(var o in this.selectedItems)if(this.selectedItems[o].length>0)return!1;return!0},selectType(o){this.$router.push(o.route)},openImportDialog(){this.displayImportDialog=!this.displayImportDialog},openExportDialog(){this.displayExportDialog=!this.displayExportDialog},async startExport(o){await this.$http.post("/knowage-api/api/1.0/export/bulk",this.streamlineSelectedItemsArray(o),{responseType:"arraybuffer",headers:{"Content-Type":"application/json",Accept:"application/zip; charset=utf-8"}}).then(e=>{e.data.errors?this.store.setError({title:this.$t("common.error.downloading"),msg:this.$t("importExport.export.completedWithErrors")}):(no(e),this.store.setInfo({title:this.$t("common.downloading"),msg:this.$t("importExport.export.successfullyCompleted")})),this.selectedItems={gallery:[],catalogFunction:[]},this.openExportDialog()},()=>this.store.setError({title:this.$t("common.error.downloading"),msg:this.$t("importExport.export.completedWithErrors")}))},streamlineSelectedItemsArray(o){let e={};e.selectedItems={};for(var n in this.selectedItems)for(var m in this.selectedItems[n])e.selectedItems[n]||(e.selectedItems[n]=[]),e.selectedItems[n].push(this.selectedItems[n][m].id);return e.filename=o,e}},computed:{...ao(L,{user:"user",isEnterprise:"isEnterprise",licenses:"licenses"})}}),No={class:"kn-importExport kn-page"},_o={class:"kn-page-content p-grid p-m-0"},So={class:"functionalities-container p-col-3 p-sm-3 p-md-2"},Uo={class:"p-col p-pt-0"};function Bo(o,e,n,m,z,T){const f=r("ImportDialog"),h=r("ExportDialog"),v=r("Button"),x=r("Toolbar"),y=r("ProgressBar"),F=r("KnTabCard"),N=r("router-view");return t(),p("div",No,[i(f,{visibility:o.displayImportDialog,"onUpdate:visibility":e[0]||(e[0]=s=>o.displayImportDialog=s)},null,8,["visibility"]),i(h,{visibility:o.displayExportDialog,"onUpdate:visibility":e[1]||(e[1]=s=>o.displayExportDialog=s),onExport:o.startExport},null,8,["visibility","onExport"]),i(x,{class:"kn-toolbar kn-toolbar--primary"},{start:a(()=>[g(b(o.$t("importExport.title")),1)]),end:a(()=>[i(v,{class:"kn-button p-button-text",onClick:o.openImportDialog},{default:a(()=>[g(b(o.$t("common.import")),1)]),_:1},8,["onClick"]),i(v,{class:"kn-button p-button-text",onClick:o.openExportDialog,disabled:o.isExportDisabled()},{default:a(()=>[g(b(o.$t("common.export")),1)]),_:1},8,["onClick","disabled"])]),_:1}),o.loading?(t(),d(y,{key:0,mode:"indeterminate",class:"kn-progress-bar"})):k("",!0),c("div",_o,[c("div",So,[(t(!0),p(C,null,I(o.functionalities,(s,_)=>(t(),d(F,{element:s,selected:s.route===o.$route.path,key:_,onClick:P=>o.selectType(s),badge:o.selectedItems[s.type].length},null,8,["element","selected","onClick","badge"]))),128))]),c("div",Uo,[i(N,{loading:o.loading,"onUpdate:loading":e[2]||(e[2]=s=>o.loading=s),onOnItemSelected:e[3]||(e[3]=s=>o.getSelectedItems(s)),selectedItems:o.selectedItems},null,8,["loading","selectedItems"])])])])}var Vo=D(Fo,[["render",Bo]]);export{Vo as default};
//# sourceMappingURL=ImportExport-d95d06ce.js.map
