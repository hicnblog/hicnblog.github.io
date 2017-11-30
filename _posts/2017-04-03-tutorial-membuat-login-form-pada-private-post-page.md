---
title: Tutorial membuat login form pada private page atau post wordpress
date: 2017-04-03 00:00:00 Z
tags:
- web
- wordpress
layout: post
description: Secara default page atau post private tidak akan ditampilkan jika pengguna
  tidak login.
img: how-to-start.jpg
---

Wordpress secara default akan menampilkan page 404 jika url yang diakses tidak ditemukan. Seperti halnya page atau post dengan status **private**, 
jika user/pengguna belum login maka page atau post tersebut tidak akan bisa ditampilkan, dan akan mengarah ke page 404. Tetapi jika pengguna/user sudah login maka page atau post tersebut bisa ditampilkan.

Bagi pengguna awam yang belum mengerti perilaku wordpress seperti ini maka akan sedikit bingung, karena page atau post tersebut ada tetapi jika di akses linknya tanpa login seakan-akan page atau post tersebut hilang atau dihapus.
Perlu penggunaan sedikit kode untuk memberikan informasi ke pengguna kalau page atau post tersebut hanya bisa di akses jika dalam kondisi login.

Kali ini saya akan memberikan sedikit baris kode yang bisa digunakan sebagai informasi ke pengguna jika kalau ingin mengakses page atau post dengan status **private** maka harus login terlebih dahulu.

### Kode untuk memfilter status page atau post.

{% highlight php %}
<?php
global $wp_query;
$slug = '';

if(isset($wp_query->query['pagename'])){
    $slug = $wp_query->query['pagename'];
} 

if(isset($wp_query->query['name'])) {
    $slug = $wp_query->query['name'];
}

$status = get_page_by_path($slug, OBJECT, array('post','page'));
if (is_object($status) && $status->post_status == "private" && !is_user_logged_in()) {
    // kode jika page atau post private
} else {
    // kode selain page atau post private 
}
?>
{% endhighlight %}

### Kode untuk menampilkan form login

{% highlight php %}
<?php
$args = array(
	'echo'           => true,
	'remember'       => true,
	'redirect'       => ( is_ssl() ? 'https://' : 'http://' ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],
	'form_id'        => 'loginform',
	'id_username'    => 'user_login',
	'id_password'    => 'user_pass',
	'id_remember'    => 'rememberme',
	'id_submit'      => 'wp-submit',
	'label_username' => __( 'Username' ),
	'label_password' => __( 'Password' ),
	'label_remember' => __( 'Remember Me' ),
	'label_log_in'   => __( 'Log In' ),
	'value_username' => '',
	'value_remember' => false
);
wp_login_form( $args );

// Note : untuk argumen redirect bisa diganti dengan get_permalink(post/page ID)
// https://developer.wordpress.org/reference/functions/wp_login_form/
?>
{% endhighlight %}