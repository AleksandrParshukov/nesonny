$('document').ready(function () {
  const $leaders_list = $('#leaders_list'),
    $participants_list = $('#participants_list');

  const $leaders_item = $(
    '<li class="leaders__item d-flex">' +
      '<p class="leaders__name">' +
      '<span class="leaders__lname"></span>' +
      '<span class="leaders__fname"></span>' +
      '</p>' +
      '<p class="leaders__scores"></p>' +
      '</li>'
  );

  const $participants_item = $(
    '<div class="participants__item d-flex">' +
      '<p class="participants__name"></p>' +
      '<p class="participants__scores"></p>' +
      '</div>'
  );

  $.ajax({
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxwoRqY6UYD1L1ak4F13ipi3vD20Nhn6FwJX5wXgfNgTPb5f356Fu1Nm_fb38CuZEBm6xVlUNFn02K/pub?gid=0&single=true&output=csv',
    dataType: 'text',
    cache: false,
    success: function (data) {
      var items = $.csv.toObjects(data);

      items.sort(function (x, y) {
        return y['Итог'] - x['Итог'];
      });

      $.each(items, function (i, val) {
        if (i < 5) {
          add_leaders_item(val);
        } else {
          add_participants_item(val);
        }
      });

      /* $participants_list.slick({
        vertical: true,
        verticalSwiping: false,
        slidesToShow: 9,
        autoplay: true,
        accessibility: false,
        arrows: false,
        autoplaySpeed: 1500,
        speed: 500,
        waitForAnimate: false,
        infinite: true,
        pauseOnFocus: false,
      }); */

      var wrapper = document.querySelector('.participants'),
        marquee = $participants_list[0],
        wrapperWidth = wrapper.offsetWidth,
        marqueeWidth = marquee.scrollWidth;

      clearInterval(interval);

      function move() {
        var currentTX = getComputedStyle(marquee).transform.split(',');
        if (currentTX[4] === undefined) {
          currentTX = -1;
        } else {
          currentTX = parseFloat(currentTX[4]) - 1;
        }

        if (-currentTX >= marqueeWidth) {
          marquee.style.transform = 'translateX(' + wrapperWidth + 'px)';
        } else {
          marquee.style.transform = 'translateX(' + currentTX + 'px)';
        }
      }

      var interval = setInterval(move, 40);
    },
  });

  function add_leaders_item(data) {
    let $new_item = $leaders_item.clone();

    $new_item.find('.leaders__lname').text(data['Фамилия']);
    $new_item.find('.leaders__fname').text(data['Имя']);
    $new_item.find('.leaders__scores').text(data['Итог']);

    $leaders_list.append($new_item);
  }

  function add_participants_item(data) {
    let $new_item = $participants_item.clone();

    $new_item
      .find('.participants__name')
      .text(data['Фамилия'] + ' ' + data['Имя']);
    $new_item.find('.participants__scores').text(data['Итог']);

    $participants_list.append($new_item);
  }
});
