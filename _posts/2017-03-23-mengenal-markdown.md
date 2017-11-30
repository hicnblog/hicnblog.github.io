---
title: Mengenal Markdown
date: 2017-03-23 00:00:00 Z
tags:
- web
layout: post
description: Markdown ialah sintaks ringan dan mudah digunakan untuk styling pada
  semua bentuk tulisan.
img: markdown@2x.png
---

## Apa itu **Markdown**

**Markdown** ialah cara untuk memberikan styling pada teks di web. Styling yang dimaksud ialah merubah tampilan dokumen yaitu :
 - Memformat kata tebal atau miring.
 - Menambahkan gambar.
 - Membuat daftar list.
 - Membuat Link.
 - Dan lain-lain.

**Markdown** hanya menggunakan teks biasa, yang sebagian besar terdiri dari karakter non-abjad seperti `*` atau `#`.

Anda dapat menggunakan **Markdown** dengan mudah pada Github seperti pada Gist, Komentar Issue atau Pull Request dan file dengan ekstensi `.md` atau `.markdown`.
Tetapi tidak hanya di Github saja yang bisa menggunakan **Markdown** bisa di linkungan-lingkungan pemrograman yang lain. Langsung cek di Google saja ya guys :smile:.

## Panduan singkat dalam penggunaan **Markdown** :

### **Headers**

* * *
{% highlight markdown %}
###### This is an <h6> tag
##### This is an <h5> tag
#### This is an <h4> tag
### This is an <h3> tag
## This is an <h2> tag
# This is an <h1> tag
{% endhighlight %}

### **Bold/*italic***

* * *
{% highlight markdown %}
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_
{% endhighlight %}

### **Lists**

* * *
{% highlight markdown %}
<!-- bullet -->
* Item 1
* Item 2
  * Item 2a
  * Item 2b
<!-- numbering -->
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
{% endhighlight %}

### **Images**

* * *
{% highlight markdown %}
![Alt Text](url)
{% endhighlight %}

### **Links**

* * *
{% highlight markdown %}
[bloghicn](http://www.bloghicn.ga)
{% endhighlight %}

### **Blockquotes**

* * *
{% highlight markdown %}
> Indonesia Raya.
> Bumi pertiwi.
{% endhighlight %}

### **Syntax highlighting**

* * *
{% highlight markdown %}
```javascript <!-- bisa diganti dengan type code yang digunakan html/javascript/python/typescript dll -->
function fn(arg) {
  if(arg) {
    $.var({div:'#bar'})
  }
}
```
{% endhighlight %}

### **Tables**

* * *
{% highlight markdown %}
Header Pertama | Header Kedua
------------ | -------------
Konten dari cell 1 | Konten dari cell 2
Konten pada kolom pertama | Konten pada kolom kedua
{% endhighlight %}

### **Emoji**

* * *
{% highlight markdown %}
:bowtie:
:smile:
:simple_smile:
:laughing:
:blush:
{% endhighlight %}

> Untuk code emoji lainnya bisa langsung ke websitenya [Emoji](https://www.webpagefx.com/tools/emoji-cheat-sheet/)