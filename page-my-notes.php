<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner();
    ?>



    <?php
}
get_footer();
?>