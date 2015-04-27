# base-gulp
## 基础gulp项目

包含基本的gulp组件

### 使用

使用前需要全局安装gulp
```shell
npm install -g gulp
```
进入到项目node_modules目录，在node命令环境下执行：
```shell
npm install
```
执行过程可能比较慢，因为依赖的gulp-imagemin依赖的包比较多

回到项目根目录，将要发布的源代码拷贝到src/目录下
目录结构：

* src/images/  放置图片，里面可以有子文件夹
* src/js/      放置js代码，里面可以有子文件夹
* src/css/     放置css代码，里面可也有子文件夹

执行命令：
```shell
gulp
```
因为我没有指定任务名，会执行默认的任务default
如果没有报错的话，就可以看到会出现dest目录，压缩处理后的代码就在里面了

### 安装插件的基本方式：

```shell
npm install gulp-插件名 --save-dev
```
### 在使用src确定目录的时候也许你需要：
The following characters have special magic meaning when used in a
path portion:

* `*` Matches 0 or more characters in a single path portion
* `?` Matches 1 character
* `[...]` Matches a range of characters, similar to a RegExp range.
  If the first character of the range is `!` or `^` then it matches
  any character not in the range.
* `!(pattern|pattern|pattern)` Matches anything that does not match
  any of the patterns provided.
* `?(pattern|pattern|pattern)` Matches zero or one occurrence of the
  patterns provided.
* `+(pattern|pattern|pattern)` Matches one or more occurrences of the
  patterns provided.
* `*(a|b|c)` Matches zero or more occurrences of the patterns provided
* `@(pattern|pat*|pat?erN)` Matches exactly one of the patterns
  provided
* `**` If a "globstar" is alone in a path portion, then it matches
  zero or more directories and subdirectories searching for matches.
  It does not crawl symlinked directories.

