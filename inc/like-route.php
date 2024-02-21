<?php

add_action("rest_api_init", "UniversityLikeRoutes");


function UniversityLikeRoutes()
{

    register_rest_route(
        "university/v1",
        "manageLike",
        array(
            "methods" => "POST",
            "callback" => "CreateLike"
        )
    );
    register_rest_route(
        "university/v1",
        "manageLike",
        array(
            "methods" => "DELETE",
            "callback" => "DeleteLike"
        )
    );
}

function CreateLike($data)
{
    if (is_user_logged_in()) {

        $professor = sanitize_text_field($data["proffessorId"]);

        $existQuery = new WP_Query(
            array(
                'author' => get_current_user_id(),
                'post_type' => 'like',
                'meta_query' => array(
                    array(
                        'key' => "liked_professor_id",
                        'compare' => "=",
                        'value' => $professor
                    )
                )
            )
        );

        if ($existQuery->found_posts == 0 and get_post_type($professor) == "professor") {
            return wp_insert_post(
                array(
                    "post_type" => "like",
                    "post_status" => "publish",
                    "post_title" => "Like",
                    "meta_input" => array(
                        "liked_user_id" => $professor
                    )
                )
            );
        } else {
            die("Invalid user Id");
        }


    } else {
        die("Only logged in user can like");
    }

}
;
;

function DeleteLike($data)
{
    $likedId = sanitize_text_field($data['like']);
    if (get_current_user_id() === get_post_field('post_author', $likedId) and get_post_type($likedId) == "like") {
        wp_delete_post($likedId, true);
        return "Congress!! you have deleted your like";
    } else {
        die("You do not have permission to delete this like");
    }
}
;
?>