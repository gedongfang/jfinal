
	//子页头部导航组件
    var vmHead = '<div class="b-breadcrumbs f-breadcrumbs">';
    vmHead += '<div  :style="setLeftistance()">';
    vmHead += '<ul><li><a v-on:click="$emit(\'headfunction\')"><i class="fa fa-home"></i>Blog</a></li>'; 
    vmHead += '<li><i class="fa fa-angle-right"></i><a >{{value}}</a></li></ul>';
    vmHead += '</div></div>';
    Vue.component('vm-head', {
        props: ['value'],
        template: vmHead,
        methods:{
            setLeftistance:function(){
                if(this.value){
                    return "margin-right: auto;margin-left: auto;padding-left: 30px;padding-right: 15px;";
                }else{
                    return "margin-right: auto;margin-left: auto;padding-left: 135px;padding-right: 15px;";
                }
            }
        }
    })
    //左侧博客导航
    var vmLeft = '<li><a class="f-categories-filter_name" v-on:click="$emit(\'show_blog\')">&nbsp;&nbsp;&nbsp;&nbsp; {{title}}</a>';
    vmLeft += '<span class="b-categories-filter_count f-categories-filter_count categories-filter_count-custom" :style="showDate()">{{date}}</span></li>';
    Vue.component('vm-left',{
        props: ['title','date'],
        template: vmLeft,
        methods:{
            showDate:function(){
                if(this.title.length>10){
                    return "display:none";
                }
                return "";
            }
        }
    })
    //底部页数组件
    var vmFoot ='<li :class="page_li_class"><a v-on:click="$emit(\'set_page_no\')">{{index}}</a></li>';
    Vue.component('vm-foot',{
        props:['page_li_class','index'],
        template:vmFoot
    })
    //博客内容展示组件
    var vmBlog = '<div class="b-blog-listing__block"><div> &nbsp;</div>';
    vmBlog += '<div class="b-infoblock-with-icon b-blog-listing__infoblock">';
    vmBlog += '<div class="b-infoblock-with-icon__icon f-infoblock-with-icon__icon fade-in-animate hidden-xs"> &nbsp;</div>';
    vmBlog += '<div class="b-infoblock-with-icon__info f-infoblock-with-icon__info">';
    vmBlog += '<a v-on:click="$emit(\'show_blog\');" class="f-infoblock-with-icon__info_title b-infoblock-with-icon__info_title f-primary-l b-title-b-hr f-title-b-hr">{{title}}</a>';
    vmBlog += '<div :style="getAuthorDivStyle()" class="f-infoblock-with-icon__info_text b-infoblock-with-icon__info_text f-primary-b b-blog-listing__pretitle">作者：<a v-bind:href="author_url" class="f-more" target="_blank">{{author}}</a> &nbsp;&nbsp;&nbsp;<a v-bind:href="essay_url" :style="getEssayDiv()" class="f-more" target="_blank">查看原文</a></div>';
    vmBlog += '<div class="f-infoblock-with-icon__info_text b-infoblock-with-icon__info_text c-primary b-blog-listing__text" v-html="content"></div>';
    vmBlog += '<div class="f-infoblock-with-icon__info_text b-infoblock-with-icon__info_text"><a class="f-more f-primary-b" v-on:click="showDetail">{{foot}}</a></div>';
    vmBlog += '</div></div></div>';
    Vue.component('vm-blog', {
        props: ['title','detail','author','author_url','essay_url','blogs'],
        template: vmBlog,
        data:function () {
                if(this.blogs){
                    return {
                      content: this.detail.substring(0,300)+"...",
                      foot:"Read more"
                    }
                }else{
                    return {
                      content: this.detail,
                      foot:""
                    }
                }
        },
        watch: {
            title:function(){
                if(this.blogs){
                      this.content=this.detail.substring(0,300)+"...";
                      this.foot="Read more";
                }else{
                      this.content=this.detail,
                      this.foot="";
                }
            }
        },
        methods:{
            showDetail:function(){
                if(this.content.length <= 305){
                    this.content = this.detail;
                    this.foot = "Pack up";
                    //iframeAdapt();
                    setTimeout("iframeAdapt();",10); 
                }else{
                    this.content = this.detail.substring(0,300)+"...";
                    this.foot = "Read more";
                    //iframeAdapt();
                    setTimeout("iframeAdapt();",10); 
                }
            },
            getAuthorDivStyle:function(){
                if(this.author){
                    return "";
                }else{
                    return "display:none";
                }
            },
            getEssayDiv:function(){
                if(this.essay_url){
                    return "";
                }else{
                    return "display:none";
                }
            }
        }
        
    })