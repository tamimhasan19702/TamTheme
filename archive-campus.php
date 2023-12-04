<?php
get_header();
pageBanner(
    array(
        'title' => 'Our Campuses',
        'subtitle' => ' We have several conveniently located campuses.',
    )
);
?>


<div class="container container--narrow page-section">

    <div class="acf-map">

        <?php

        while (have_posts()) {
            the_post();
            ?>

        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35754.661314876335!2d91.79875245749197!3d22.472668465507628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd6fe9a3a4473%3A0x7836276aef538552!2sUniversity%20of%20Chittagong!5e1!3m2!1sen!2sbd!4v1701613237739!5m2!1sen!2sbd"
                width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </a>

        <?php
        }

        echo paginate_links();

        ?>
    </div>


</div>
<?php
get_footer();
?>