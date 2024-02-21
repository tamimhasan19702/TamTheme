/** @format */
import $ from "jquery";
class Like {
  constructor() {
    this.events();
  }

  events() {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  ourClickDispatcher(e) {
    const currentLikeBox = $(e.target).closest(".like-box");
    if (currentLikeBox.data("exists") === "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(currentLikeBox) {
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      type: "POST",
      data: { " proffessorId": currentLikeBox.data("professor") },
      success: (data) => {
        currentLikeBox.attr("data-exists", "yes");
        const likeCount = parseInt(
          currentLikeBox.find(".like-count").html(),
          10
        );
        likeCount++;
        currentLikeBox.find(".like-count").html(likeCount);
        currentLikeBox.attr("data-like", likeCount);
        console.log(data);
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  deleteLike(currentLikeBox) {
    $.ajax({
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      data: { like: currentLikeBox.attr("data-like") },
      type: "DELETE",
      success: (data) => {
        console.log(data);
      },
      error: (data) => {
        console.log(data);
      },
    });
  }
}

export default Like;
