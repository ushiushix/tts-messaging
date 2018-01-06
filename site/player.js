function player() {
  if ($.data(document.body, 'player') === void 0) {
  var audio5js = new Audio5js({
    swf_path: '/swf/audio5js.swf'
  });
  $.data(document.body, 'player', audio5js);
  return audio5js;
  } else {
    return $.data(document.body, 'player');
  }
}
function play(url, callback) {
    player().one('ended', callback, this);
    player().one('error', callback, this);
  player().load(url);
  player().play();
}
