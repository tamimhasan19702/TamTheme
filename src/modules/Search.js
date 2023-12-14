/** @format */

class Search {
  // discribe and create/initialize our object
  constructor() {
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();
    console.log("search");
  }

  // events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
  }

  //   methods (function, action..)
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    this.body.addClass("body-no-scroll");
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    this.body.removeClass("body-no-scroll");
  }
}

export default Search;
