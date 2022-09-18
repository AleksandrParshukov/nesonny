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

      let $wrapper = $participants_list,
        $marquees = $wrapper.find('.participants__item'),
        wrapperOffset = $wrapper.offset().top;

      clearInterval(interval);

      function move() {
        $.each($marquees, function (i) {
          let $marquee = $(this),
            currentTY = $marquee.css('transform').split(','),
            marqueeHeight = $marquee.outerHeight(true),
            offset = $marquee.offset().top + marqueeHeight;

          if (currentTY[5] === undefined) {
            currentTY = -1;
          } else {
            currentTY = parseFloat(currentTY[5]) - 1;
          }

          $marquee.css('transform', 'translateY(' + currentTY + 'px)');
          /*   if (i == 0) {
            console.log(i + ': ' + wrapperOffset);
            console.log(i + ': ' + offset);
            console.log(offset <= wrapperOffset);
          }
 */
          if (offset <= wrapperOffset) {
            $wrapper.append($marquee);
            update();
          }
        });

        function update() {
          $.each($marquees, function () {
            let $marquee = $(this),
              currentTY = $marquee.css('transform').split(','),
              marqueeHeight = $marquee.outerHeight(true);

            if (currentTY[5] === undefined) {
              currentTY = 0;
            } else {
              currentTY = parseFloat(currentTY[5]);
            }

            console.log(marqueeHeight);

            $marquee.css(
              'transform',
              'translateY(' + (currentTY + marqueeHeight) + 'px)'
            );
          });
        }
      }

      var interval = setInterval(move, 20);
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
