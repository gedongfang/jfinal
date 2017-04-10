package com.demo.blog;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.demo.common.model.Blog;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.kit.JsonKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

/**
 * 本 demo 仅表达最为粗浅的 jfinal 用法，更为有价值的实用的企业级用法
 * 详见 JFinal 俱乐部: http://jfinal.com/club
 * 
 * BlogController
 * 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller 中，养成好习惯，有利于大型项目的开发与维护
 */
@Before(BlogInterceptor.class)
public class BlogController extends Controller {
	public void index() {
		setAttr("blogPage", Blog.me.paginate(getParaToInt(0, 1), 10));
		render("blog.html");
	}
	public void getBlogs(){
		int pagesize = getParaToInt("pagesize");
		int pageNo = getParaToInt("pageNo")-1;
		String sql = "select id,title,detail,author,author_url,essay_url from blog order by id desc limit "+pagesize*pageNo+","+pagesize;
		List<Record> ls = Db.find(sql);
		renderJson(JsonKit.toJson(ls));
	}
	public void getBlogList(){
		String sql = "select id,title,date from blog order by id desc";
		List<Record> ls = Db.find(sql);
		renderJson(JsonKit.toJson(ls));
	}
	public void flv(){
		render("/html/flv.html");
	}
	public void addBlog(){
		Record record = new Record();
		record.set("title",getPara("title"));
		record.set("author",getPara("author"));
		record.set("detail",getPara("detail").replaceAll("\n","<br />"));
		record.set("author_url",getPara("author_url"));
		record.set("essay_url",getPara("essay_url"));
		record.set("date",getPara("date"));
		Db.save("blog", record);
		JSONObject jo = new JSONObject();
		jo.put("state","successful");
		renderJson(jo);
	}
	public void write(){
		render("/html/write.html");
	}
	public void show(){
		int id = getParaToInt(0);
		String sql =  "select title,detail,author,author_url,essay_url from blog where id = "+id;
		Record record = Db.findFirst(sql);
		JSONObject blog = new JSONObject();
		blog.put("title",record.get("title") );
		blog.put("detail",record.get("detail") );
		blog.put("author",record.get("author") );
		blog.put("author_url",record.get("author_url") );
		blog.put("essay_url",record.get("essay_url") );
		setAttr("blog",blog );
		render("/html/showBlog.html");
	}
	public void add() {
	}
	
	@Before(BlogValidator.class)
	public void save() {
		getModel(Blog.class).save();
		redirect("/blog");
	}
	
	public void edit() {
		setAttr("blog", Blog.me.findById(getParaToInt()));
	}
	
	@Before(BlogValidator.class)
	public void update() {
		getModel(Blog.class).update();
		redirect("/blog");
	}
	
	public void delete() {
		Blog.me.deleteById(getParaToInt());
		redirect("/blog");
	}
}


