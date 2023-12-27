/** @format */
import $ from "jquery";

class Search {
  // discribe and create/initialize our object
  constructor() {
    this.searchOverlayHtml();
    this.resultsDiv = $("#search-overlay__results");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.isSpinnerVisible = false;
    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
    this.previousValue;
  }

  // events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  //   methods (function, action..)
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val();
  }

  getResults() {
    $.getJSON(
      universityData.root_url +
        "/wp-json/university/v1/search?term=" +
        this.searchField.val(),
      (results) => {
        this.resultsDiv.html(`
      <div className="row-results">
   
      <div className="one-third col-md-4">
      <h2 class="search-overlay__section-title">General Information</h2>
      ${
        results.generalInfo.length
          ? `<ul class="link-list min-list">`
          : `<p>No General Information Found for this Keyword`
      }
      ${results.generalInfo
        .map(
          (item) =>
            `<li><a href="${item.permalink}">${item.title}</a> ${
              item.postType == "post" ? ` by ${item.authorName}` : ``
            }</li>`
        )
        .join("")}
      ${results.generalInfo.length ? `</ul>` : `</p>`}
      </div>
      


      <div className="one-third col-md-4">

      <h2 class="search-overlay__section-title">Programs</h2>
      ${
        results.programs.length
          ? `<ul class="link-list min-list">`
          : `<p>No Programs Found for this Keyword. <a href="${universityData.root_url}/programs">View all the Programs here</a>`
      }
      ${results.programs
        .map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`)
        .join("")}
      ${results.programs.length ? `</ul>` : `</p>`}
     
      <h2 class="search-overlay__section-title">Professors</h2>
      ${
        results.professors.length
          ? `<ul class="link-list min-list">`
          : `<p>No Professors Found for this Keyword, <a href="${universityData.root_url}/professors">View all the Professors here</a>`
      }
      ${results.professors
        .map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`)
        .join("")}
      ${results.professors.length ? `</ul>` : `</p>`}
      </div>
     



      <div className="one-third col-md-4">
      <h2 class="search-overlay__section-title">Campuses</h2>
      ${
        results.campuses.length
          ? `<ul class="link-list min-list">`
          : `<p>No Campus Location Found for this Keyword. <a href="${universityData.root_url}/campuses">View all the Campuses here</a>`
      }
      ${results.campuses
        .map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`)
        .join("")}
      ${results.campuses.length ? `</ul>` : `</p>`}

      <h2 class="search-overlay__section-title">Events</h2>
      ${
        results.events.length
          ? `<ul class="link-list min-list">`
          : `<p>No Events Found for this Keyword. <a href="${universityData.root_url}/events">View all the Events here</a>`
      }
      ${results.events
        .map(
          (item) =>
            `<li><a href="${item.permalink}">${item.title}</a> ${
              item.postType == "post" ? ` by ${item.authorName}` : ``
            }</li>`
        )
        .join("")}
      ${results.events.length ? `</ul>` : `</p>`}
      </div>
      </div>
      `);

        this.isSpinnerVisible = false;
      }
    );
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(":focus")
    ) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => this.searchField.focus(), 301);
    this.isOverlayOpen = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  searchOverlayHtml() {
    $("body").append(`
    <div class="search-overlay ">
    <div class="search-overlay__top">
        <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
        </div>
    </div>

    <div class="container">
        <div id="search-overlay__results"></div>
    </div>
</div>
    `);
  }
}

export default Search;
