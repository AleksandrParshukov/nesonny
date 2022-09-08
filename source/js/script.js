$.support.cors = true;

$('document').ready(function () {
  console.log('ready');
  $.getJSON(
    'https://tools.aimylogic.com/api/googlesheet2json?sheet=%D0%9B%D0%B8%D1%81%D1%821&id=1kuBxfy3M7hPfpCtm7B7ZMnLPPCn4yK93z3E1m--X1KU',
    function (data) {
      var items = [];
      $.each(data, function (key, val) {
        items.push("<li id='" + key + "'>" + val + '</li>');
      });

      console.log(data);

      $('<ul/>', {
        class: 'my-new-list',
        html: items.join(''),
      }).appendTo('body');
    }
  );
});
