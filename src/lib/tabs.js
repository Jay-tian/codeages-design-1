class Tabs {
  constructor(props) {
    this.options = {
      parent: document,
      isLoading: false,
      isInit: true,
      url: null,
    };
    Object.assign(this.options, props);

    this.init();
  }

  init() {
    if (this.options.isInit) {
      this.getData();
    }
    this.events();
  }

  events() {
    $(this.options.parent).on('click.cd.tabs', this.options.el, (event) => this.clickEvent(event));
  }

  loading() {
    if (this.options.isLoading) {
      $(this.options.target).html(cd.loading());
    }
  }

  getData(event) {
    this.loading();

    $.get({
      url: event ? $(event.currentTarget).data('url') : this.options.url
    }).done((res) => {
      if (typeof this.options.success === 'function') {
        this.options.success(res);
      } else {
        $(this.options.target).html(res);
      }
    }).fail((res) => {
      console.log('error', res);
      if (typeof this.options.error === 'function') {
        this.options.error(res);
      } 
    })
  }

  clickEvent(event) {
    event.stopPropagation();
    let $this = $(event.currentTarget);
    let $parent = $this.parent();
    
    if ($parent.hasClass('active')) {
      return;
    }

    $parent.addClass('active').siblings().removeClass('active');

    this.getData(event);
  }
}

function tabs(props) {
  return new Tabs(props);
}


// DATA-API
$(document).on('click.cd.tabs.data-api', '[data-toggle="cd-tabs"]', function(event) {
  event.stopPropagation();
  let $this = $(event.currentTarget);
  let $parent = $this.parent();

  if ($parent.hasClass('active')) {
    return;
  }

  $parent.addClass('active').siblings().removeClass('active');

  let $panel = $($this.data('target'));
  $panel.addClass('active').siblings().removeClass('active');
})

export default tabs;