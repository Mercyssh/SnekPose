var _0x4b2f=['7487tgKbgx','2cfjsxl','GAME','1030934WNgWnM','width','1564573NfNYLY','requestAnimationFrame','1IyCxMh','clearRect','744OPgBLE','439793fkSGzh','522574EQRdjP','LEADERBOARD','167hkPNQB','height','2999435YCcgQw','MENU','1267NwpIop'];var _0x18f77f=_0x58c8;(function(_0x1794c2,_0x890e07){var _0x5ea5c3=_0x58c8;while(!![]){try{var _0x21676b=parseInt(_0x5ea5c3(0x10c))*-parseInt(_0x5ea5c3(0x104))+parseInt(_0x5ea5c3(0x10e))*parseInt(_0x5ea5c3(0x106))+-parseInt(_0x5ea5c3(0x10d))*parseInt(_0x5ea5c3(0x108))+parseInt(_0x5ea5c3(0x110))+-parseInt(_0x5ea5c3(0x112))+parseInt(_0x5ea5c3(0x105))*-parseInt(_0x5ea5c3(0x114))+parseInt(_0x5ea5c3(0x10a));if(_0x21676b===_0x890e07)break;else _0x1794c2['push'](_0x1794c2['shift']());}catch(_0x431e43){_0x1794c2['push'](_0x1794c2['shift']());}}}(_0x4b2f,0xd665e));var gamestate=_0x18f77f(0x10b);function _0x58c8(_0x7c5bb0,_0x1565ac){_0x7c5bb0=_0x7c5bb0-0x104;var _0x4b2f90=_0x4b2f[_0x7c5bb0];return _0x4b2f90;}function changestate(){var _0x415fde=_0x18f77f;if(gamestate==_0x415fde(0x10b))InitGame(),gamestate=_0x415fde(0x10f),window[_0x415fde(0x113)](main);else{if(gamestate=='GAME')gamestate=_0x415fde(0x107),Leaderboard();else gamestate==_0x415fde(0x107)&&location['reload']();}}function main(_0x4ab41b){var _0x233be1=_0x18f77f;ctx[_0x233be1(0x115)](0x0,0x0,room[_0x233be1(0x111)],room[_0x233be1(0x109)]),SnakeStep(),PelletStep(),PoseStep(),PelletDraw(),PoseDraw(),SnakeDraw(),UIUpdate();if(gamestate=='GAME')window[_0x233be1(0x113)](main);}window[_0x18f77f(0x113)](main);