angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partial/account/account.html',
    "<div><h2>ACCOUNT</h2></div>"
  );


  $templateCache.put('partial/articles/articles.html',
    "<div><h2>ARTICLES</h2><br><table class=table><thead><tr><th>Title</th><th>Key words</th><th>Author</th><th>Published</th><th></th></tr></thead><tbody><tr ng-repeat=\"article in articles\"><td>{{article.title}}</td><td>{{article.keyWords}}</td><td>{{article.author}}</td><td>{{article.published | date:'dd.MM.yyyy'}}</td><td><div class=\"btn btn-success btn-xs\" ui-sref=\"edit-article({ id:article._id })\">Edit</div><div class=\"btn btn-warning btn-xs\" ng-click=deleteClick(article._id)>Delete</div></td></tr></tbody></table><br><br><div class=\"btn btn-success\" ui-sref=new-article>Create new</div></div>"
  );


  $templateCache.put('partial/edit-article/edit-article.html',
    "<div class=col-md-9><h2>Edit: {{ article.title }}</h2><hr><label>Title*</label><input ng-model=article.title type=text name=title class=form-control ng-minlength=\"4\"><br><label>Key words</label><input ng-model=article.keyWords type=text name=keyWords class=\"form-control\"><br><label>Content</label><textarea ui-tinymce ng-model=article.content name=content class=form-control></textarea><br><label>Author</label><input ng-model=article.author type=text name=author class=\"form-control\"><br><label>Published</label><input ng-model=article.published type=date name=published class=\"form-control\"><br><br><div class=\"btn btn-success\" ng-click=SaveClick()>Save</div></div>"
  );


  $templateCache.put('partial/edit-project/edit-project.html',
    "<div class=col-md-9><h1>Edit: {{project.title}}</h1><hr><div ng-form name=myForm><label>Title*</label><input ng-model=project.title type=text name=title class=form-control ng-minlength=\"4\"><br><label>Content</label><textarea ui-tinymce ng-model=project.content name=content class=form-control></textarea><br><label>Author</label><input ng-model=project.author name=author type=text class=\"form-control\"><br><label>Link</label><input ng-model=project.link name=link type=url class=\"form-control\"><br><div class=\"btn btn-primary pull-left\" ng-disabled=isCreating ng-click=SaveClick()>Save</div></div></div><div class=col-md-3><br><label>Cover Image</label><br><br><br><div class=drop-zone ngf-drop=uploadFiles($file) ngf-drag-over-class=\"'dragover'\"><div class=\"btn btn-primary\" ngf-select=uploadFiles($file)>Upload cover image</div></div><br><div class=progress ng-if=isUploading><div class=\"progress-bar progress-bar-striped active\" role=progressbar aria-valuenow={{uploadData.progress}} aria-valuemin=0 aria-valuemax=100 style=\"width: {{uploadData.progress}}%\">{{uploadData.progress}}</div></div><img class=cover ng-if=project.coverImage src=\"http://localhost:3010/uploads/{{ project.coverImage }}\"></div>"
  );


  $templateCache.put('partial/home/home.html',
    "<div><h2>HOME</h2></div>"
  );


  $templateCache.put('partial/new-article/new-article.html',
    "<div class=col-md-9><h2>NEW ARTICLE</h2><hr><label>Title*</label><input ng-model=article.title type=text name=title class=form-control ng-minlength=\"4\"><br><label>Key words</label><input ng-model=article.keyWords type=text name=keyWords class=\"form-control\"><br><label>Content</label><textarea ui-tinymce ng-model=article.content name=content class=form-control></textarea><br><label>Author</label><input ng-model=article.author type=text name=author class=\"form-control\"><br><label>Published</label><input ng-model=article.published type=date name=published class=\"form-control\"><br><br><div class=\"btn btn-success\" ng-click=onCreateClick()>Create</div></div>"
  );


  $templateCache.put('partial/new-project/new-project.html',
    "<div class=col-md-9><h2>NEW PROJECT</h2><hr><label>Title*</label><input ng-model=project.title type=text name=title class=form-control ng-minlength=\"4\"><br><label>Content</label><textarea ui-tinymce ng-model=project.content name=content class=form-control></textarea><br><label>Author</label><input ng-model=project.author name=author type=text class=\"form-control\"><br><label>Link</label><input ng-model=project.link name=link type=url class=\"form-control\"><br><div class=\"btn btn-primary pull-left\" ng-disabled=isCreating ng-click=onCreateClick()>Create</div></div><div class=col-md-3><br><label>Cover Image</label><br><br><br><div class=drop-zone ngf-drop=uploadFiles($file) ngf-drag-over-class=\"'dragover'\"><div class=\"btn btn-primary\" ngf-select=uploadFiles($file)>Upload cover image</div></div><br><div class=progress ng-if=isUploading><div class=\"progress-bar progress-bar-striped active\" role=progressbar aria-valuenow={{uploadData.progress}} aria-valuemin=0 aria-valuemax=100 style=\"width: {{uploadData.progress}}%\">{{uploadData.progress}}</div></div><img class=cover ng-if=project.coverImage src=\"http://localhost:3010/uploads/{{ project.coverImage }}\"></div>"
  );


  $templateCache.put('partial/projects/projects.html',
    "<div><h2>PROJECTS</h2><br><table class=table><thead><tr><th>Title</th><th>Author</th><th>Date Created</th><th></th></tr></thead><tbody><tr ng-repeat=\"project in projects\"><td>{{project.title}}</td><td>{{project.author}}</td><td>{{ project.dateCreated | date:'dd.MM.yyyy, hh:mm:ss' }}</td><td><div class=\"btn btn-primary btn-xs\" ui-sref=\"edit-project({ id:project._id })\">Edit</div><div class=\"btn btn-warning btn-xs\" ng-click=deleteClick(project._id)>Delete</div></td></tr></tbody></table><br><br><div class=\"btn btn-success\" ui-sref=new-project>Create new</div></div>"
  );


  $templateCache.put('partial/sidebar/sidebar.html',
    "<div class=sidebar-container ng-controller=SidebarCtrl><div class=sidebar><div class=sidebar-button ui-sref-active=sidebar-button-active ui-sref=home>Home</div><div class=sidebar-button ui-sref-active=sidebar-button-active ui-sref=projects>Projects</div><div class=sidebar-button ui-sref-active=sidebar-button-active ui-sref=articles>Articles</div><div class=sidebar-button ui-sref-active=sidebar-button-active ui-sref=account>Account</div></div></div>"
  );

}]);
