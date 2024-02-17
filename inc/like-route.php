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
    $professor = sanitize_text_field($data["professorId"]);
}
;

function DeleteLike()
{
    return "delete Like";
}
;
?>