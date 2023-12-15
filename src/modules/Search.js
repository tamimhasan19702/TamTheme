/** @format */
import $ from "jquery";

class Search {
  // discribe and create/initialize our object
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
<<<<<<< HEAD
    this.typingTimer;
=======
>>>>>>> 69335e779202afbe81e9cb4590af0118adad99f8
  }

  // events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
<<<<<<< HEAD
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keydown", this.typingLogic.bind(this));
  }

  //   methods (function, action..)
  typingLogic() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      console.log("this is timeout setup");
    }, 2000);
  }
=======
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
  }

  //   methods (function, action..)
>>>>>>> 69335e779202afbe81e9cb4590af0118adad99f8
  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.isOverlayOpen = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }
}

export default Search;
