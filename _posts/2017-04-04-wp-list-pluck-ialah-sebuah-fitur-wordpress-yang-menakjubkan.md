---
layout: post
title: "wp_list_pluck() ialah sebuah fitur wordpress yang menakjubkan"
description: "wp_list_pluck(), fitur wordpress yang membuat kode semakin simple."
tags: [web, wordpress]
---

**wp_list_pluck()** ialah fitur wordpress yang digunakan untuk mengambil _field_ atau bagian tertentu dari _Object_ yang kemudian dirubah menjadi bentuk list/daftar.
Kalau belum paham juga saya akan menjalaskan dengan menggunakan kode.

Misalnya teman-teman mempunyai _array_ _object_ dengan nama `$jadwal_kuliah` yang berisi data sebagai berikut :

{% highlight php %}
[0] => stdClass Object
	[ID] => 123
	[post_content] => Review aritmatika logic
	[post_title] => Aritmatika

[1] => stdClass Object
	[ID] => 456
	[post_content] => Object Oriented Programming on php
	[post_title] => OOP PHP

[2] => stdClass Object
	[ID] => 789
	[post_content] => Membuat template wordpress
	[post_title] => Wordpress
	)
{% endhighlight %}

Secara umum jika kita ingin mengambil isi dari `post_content` maka kode yang digunakan seperti berikut :

{% highlight php %}
<?php
$post_contents = array();
foreach ( $jadwal_kuliah as $key => $content ) {
    $post_contents[$key] = $content->post_content;
}
?>
{% endhighlight %}

Kode diatas memang sedikit terlalu panjang :smile: , tapi jika kita menggunakan `wp_list_pluck()` akan seperti ini :

{% highlight php %}
<?php
$post_contents = wp_list_pluck($jadwal_kuliah, 'post_content');
?>
{% endhighlight %}

Jadi dengan `wp_list_pluck()` maka kode yang dibuat akan semakin simple dan praktis :wink:.