<div class="post-item">
    <h2 class="headline headline--medium headline--post-title"><a href="<?php the_permalink(); ?>">
            <?php
            the_title();
            ?>
        </a></h2>

    <div class="metabox">
        <p>Posted by
            <?php the_author_posts_link(); ?> on
            <?php the_time('n.j.y'); ?> in
            <?php echo get_the_category_list(', ') ?> categories
        </p>
    </div>

    <div class="generic-content">
        <?php the_excerpt(); ?>
        <p><a href="<?php the_permalink(); ?>" class="btn btn--blue">
                Continue reading &raquo;
            </a></p>
    </div>

</div>