const _0x1b72=['value','284659icJkUf','getItem','236892YyNtlO','setItem','1913NiWXcM','loop','_vol','menu-btns','parse','play','5741PKzATm','btn','ASSETS/pop.wav','9uJvaER','102947Nwqrwo','8lSPQia','stringify','66361FICvuG','getElementById','3ZozkPP','30817JHAfve','localStorage','ASSETS/eat.wav','loadeddata','mouseover','ASSETS/hurt.wav','addEventListener','volume','84TEFqqe'];const _0x368535=_0x869b;(function(_0x130e98,_0x55965b){const _0x369c3c=_0x869b;while(!![]){try{const _0x5be5d2=-parseInt(_0x369c3c(0x18e))+parseInt(_0x369c3c(0x17f))*parseInt(_0x369c3c(0x184))+parseInt(_0x369c3c(0x17d))*-parseInt(_0x369c3c(0x17a))+-parseInt(_0x369c3c(0x183))*parseInt(_0x369c3c(0x181))+parseInt(_0x369c3c(0x17e))+parseInt(_0x369c3c(0x18c))*parseInt(_0x369c3c(0x192))+parseInt(_0x369c3c(0x190));if(_0x5be5d2===_0x55965b)break;else _0x130e98['push'](_0x130e98['shift']());}catch(_0xa26199){_0x130e98['push'](_0x130e98['shift']());}}}(_0x1b72,0x33ac8));var vol=document['getElementById'](_0x368535(0x18b));let _btns=document[_0x368535(0x182)](_0x368535(0x195))['getElementsByClassName'](_0x368535(0x17b));const eatSound=new Audio(_0x368535(0x186)),hurtSound=new Audio(_0x368535(0x189)),pelletSound=new Audio(_0x368535(0x17c)),poseSound=new Audio('ASSETS/shutter.mp3'),loseSound=new Audio('ASSETS/lose.wav'),musicSound=new Audio('ASSETS/music.mp3');musicSound[_0x368535(0x193)]=!![];function _0x869b(_0x3ae100,_0x42b105){_0x3ae100=_0x3ae100-0x178;let _0x1b7208=_0x1b72[_0x3ae100];return _0x1b7208;}for(var btn of _btns){btn['addEventListener'](_0x368535(0x188),_0x4f9410=>{const _0x6b6070=_0x368535;pelletSound[_0x6b6070(0x179)]();});}SyncVolume(),updateVolume(),vol[_0x368535(0x18a)]('mousemove',function(){updateVolume();}),musicSound['addEventListener'](_0x368535(0x187),function(){const _0x7370bc=_0x368535;musicSound[_0x7370bc(0x179)]();});function updateVolume(){const _0x4629f9=_0x368535;eatSound['volume']=vol[_0x4629f9(0x18d)]/0x64,hurtSound[_0x4629f9(0x18b)]=vol[_0x4629f9(0x18d)]/0x64,pelletSound[_0x4629f9(0x18b)]=vol['value']/0x64,poseSound['volume']=vol['value']/0x64,loseSound[_0x4629f9(0x18b)]=vol[_0x4629f9(0x18d)]/0x64,musicSound[_0x4629f9(0x18b)]=vol[_0x4629f9(0x18d)]/0x64;let _0x2b714b=window[_0x4629f9(0x185)],_0x32e993=_0x2b714b['getItem'](_0x4629f9(0x194)),_0x2de01a=JSON[_0x4629f9(0x178)](_0x32e993);if(_0x32e993){_0x2de01a=vol[_0x4629f9(0x18d)];let _0x1a41bf=JSON[_0x4629f9(0x180)](_0x2de01a);_0x2b714b[_0x4629f9(0x191)](_0x4629f9(0x194),_0x1a41bf);}}function SyncVolume(){const _0x1f7106=_0x368535;let _0x2d7f44=window[_0x1f7106(0x185)],_0x261844=_0x2d7f44[_0x1f7106(0x18f)](_0x1f7106(0x194));if(!_0x261844){let _0x3ad240=JSON[_0x1f7106(0x180)](0x32);_0x2d7f44[_0x1f7106(0x191)]('_vol',_0x3ad240);}else{let _0x2453c6=JSON[_0x1f7106(0x178)](_0x261844);vol['value']=_0x2453c6;}}