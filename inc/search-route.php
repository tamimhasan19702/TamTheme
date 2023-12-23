<?php

add_action('rest_api_init', 'UniversityRegisterSearch');

function UniversityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'UniversitySearchResults'
    ));
}

function UniversitySearchResults()
{
    $professors = new WP_QUERY(array(
        'post_type' => 'professor'
    ));

    $professorResults = array();

    while ($professors->have_posts()) {
        $professors->the_post();
        array_push($professorResults, array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink()
        ));
    }

    return $professorResults;
}



?>