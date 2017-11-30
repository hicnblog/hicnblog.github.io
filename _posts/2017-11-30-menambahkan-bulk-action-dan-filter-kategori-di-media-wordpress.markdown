---
title: Menambahkan Bulk Action dan Filter Kategori di Media WordPress
date: 2017-11-30 09:41:00 +07:00
tags:
- web
- wordpress
img: how-to-start.jpg
layout: post
description: Secara default filter category dan bulk action di media WordPress tidak
  ada. Jadi Kode ni dibuat untuk menambahkan fitur tersebut kedalam Media WordPress.
---

Tidak perlu menulis panjang lebar :smile:. Berikut kode yang saya buat:

**Kode untuk Bulk Action**

{% highlight php %}
<?php
function categories_obj(){
    $args = array(
        'type'                     => 'attachment',
        'child_of'                 => 0,
        'parent'                   => '',
        'orderby'                  => 'name',
        'order'                    => 'ASC',
        'hide_empty'               => 0,
        'hierarchical'             => 1,
        'exclude'                  => '',
        'include'                  => '',
        'number'                   => '',
        'taxonomy'                 => 'category',
        'pad_counts'               => false 
    );

    return get_categories( $args );
}
add_filter( 'bulk_actions-upload', 'custom_bulk_action' );

function custom_bulk_action($bulk_action){
    $break = 0;
    $categories = categories_obj();
    $bulk_action[-1] = __('Categories','jmc');

    foreach ($categories as $key1 => $value1) {
        $bulk_action['add_'.$value1->cat_ID] = __('&nbsp;&nbsp;&nbsp;Add: '.$value1->name,'jmc');
    }
    foreach ($categories as $key2 => $value2) {
        $bulk_action['remove_'.$value2->cat_ID] = __('&nbsp;&nbsp;&nbsp;Remove: '.$value2->name,'jmc');
    }
    $bulk_action['deleteall_404'] = __('&nbsp;&nbsp;&nbsp;Delete all','jmc');

    return $bulk_action;
}

add_filter( 'handle_bulk_actions-upload', 'custom_bulk_action_handler', 10, 3 );

function custom_bulk_action_handler($redirect_to, $action_name, $post_ids){
    $da = explode("_", $action_name);
    $categories = categories_obj();
    $arr_cat_id = wp_list_pluck($categories, 'cat_ID');

    if(isset($post_ids)){
        if($da[0] === "add"){
            for ($i=0; $i < count($post_ids); $i++) {
                $set_cat_to_media = wp_set_post_categories( (int)$post_ids[$i], array($da[1]), true );
            }
        }
        if($da[0] === "remove"){
            for ($i=0; $i < count($post_ids); $i++) {
                $remove_cat_on_media = wp_remove_object_terms( (int)$post_ids[$i], (int)$da[1], 'category' );
            }
        }
        if($da[0] === "deleteall"){
            for ($i=0; $i < count($post_ids); $i++) {
                $remove_cat_on_media_all = wp_remove_object_terms( (int)$post_ids[$i], $arr_cat_id, 'category' );
            }
        }
        return $redirect_to;
    } else {
        return $redirect_to;
    }
    return $redirect_to;
}
?>
{% endhighlight %}

**Kode untuk Filter**

{% highlight php %}
<?php
add_action('pre_get_posts', 'filter_media_by_cat');
add_action( 'restrict_manage_posts', 'add_media_cat_dropdown' );

function filter_media_by_cat( $setcol ) {
    if(function_exists('get_current_screen')):
        $screen = get_current_screen();
        $cat = filter_input(INPUT_GET, 'postcat', FILTER_SANITIZE_STRING );   
        if ( ! $setcol->is_main_query() || ! is_admin() || (int)$cat <= 0 || $screen->base !== 'upload' )
          return;

        $args = array(
            'cat' => (int)$cat,
            'post_type' => array('attachment'),
            'post_status' => array('inherit','publish')
        );

        $jmc_query = new WP_Query( $args );
        $jmc_cat_id_arr = ( ! empty( $jmc_query->posts ) ) ? wp_list_pluck($jmc_query->posts, 'ID') : false;

        if(!empty($jmc_cat_id_arr)){
            $setcol->set( 'post__in', $jmc_cat_id_arr );
        } else {
            $setcol->set( 'p', -1 );
        }
      
        wp_reset_postdata();
    endif;
}

function add_media_cat_dropdown() {
    if(function_exists('get_current_screen')):
        $screen = get_current_screen();
        if ( $screen->base !== 'upload' ) return;
        $cat = filter_input(INPUT_GET, 'postcat', FILTER_SANITIZE_STRING );  
        $selected = (int)$cat > 0 ? $cat : '-1';  
        $args = array(
            'show_option_none'   => 'View all categories',
            'name'               => 'postcat',
            'hide_empty'         => 0,
            'child_of'           => 0,
            'orderby'            => 'name',
            'taxonomy'           => 'category',
            'selected'           => $selected
        ); 
        wp_dropdown_categories( $args );
    endif;
}
?>
{% endhighlight %}