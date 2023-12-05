<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner();
    ?>

<div class="container container--narrow page-section">

    <div class="metabox metabox--position-up metabox--with-home-link">
        <p>
            <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('campus'); ?>"><i
                    class="fa fa-home" aria-hidden="true"></i>
                All Campuses
            </a> <span class="metabox__main">
                <?php the_title(); ?>
            </span>
        </p>
    </div>

    <div class="generic-content">

        <?php the_content() ?>
    </div>

    <!-- campus map type -->

    <div class="acf-map">
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35754.661314876335!2d91.79875245749197!3d22.472668465507628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd6fe9a3a4473%3A0x7836276aef538552!2sUniversity%20of%20Chittagong!5e1!3m2!1sen!2sbd!4v1701613237739!5m2!1sen!2sbd"
                width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
        </a>
    </div>


    <?php
        $relatedPrograms = new WP_Query([
            'posts_per_page' => -1,
            'post_type' => 'program',
            'orderby' => 'title',
            'order' => 'ASC',
            'meta_query' => [
                array(
                    'key' => 'related_campus',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                )
            ]
        ]);


        if ($relatedPrograms->have_posts()) {

            echo '<hr class="section-break">';
            echo '<h2 class="headline headline--medium">  Programs Available at this campus</h2>';

            echo '<ul class="min-list link-list">';
            while ($relatedPrograms->have_posts()) {
                $relatedPrograms->the_post();
                ?>
    <li>
        <a href="<?php the_permalink(); ?>">
            <?php the_title();?>
        </a>
    </li>
    <?php
            }
            echo '</ul>';
        }


        wp_reset_postdata();



        $today = date('Ymd');
        $homapageEvents = new WP_Query([
            'posts_per_page' => 2,
            'post_type' => 'event',
            'meta_key' => 'event_date',
            'orderby' => 'meta_value_num',
            'order' => 'ASC',
            'meta_query' => [
                array(
                    'key' => 'event_date',
                    'compare' => '>=',
                    'value' => $today,
                    'type' => 'numeric'
                ),
                array(
                    'key' => 'related_programs',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                )
            ]
        ]);


        if ($homapageEvents->have_posts()) {

            echo '<hr class="section-break">';
            echo '<h2 class="headline headline--medium"> Upcoming ' . get_the_title() . ' Events</h2>';

            while ($homapageEvents->have_posts()) {
                $homapageEvents->the_post();
                get_template_part('template-parts/content', 'event');
            }
        }

        ?>



</div>

<?php
}

get_footer();

?>