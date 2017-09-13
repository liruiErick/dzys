<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<div class="top clearfloat">
    <div class="fl index-m-t">
        <a class="logo-href" href="index.html">
            <img class="com-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnYAAABICAMAAABMZUg/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU0NTY4RkNBNzMzODExRTc5RUI2RjdDRTk2NkRERDIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU0NTY4RkNCNzMzODExRTc5RUI2RjdDRTk2NkRERDIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTQ1NjhGQzg3MzM4MTFFNzlFQjZGN0NFOTY2REREMjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTQ1NjhGQzk3MzM4MTFFNzlFQjZGN0NFOTY2REREMjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5iLsGOAAAAQlBMVEVgX160tLQiHx3TLyWCgoLBwcHY2Nj5+fnp6OigoKDplY/y8PDdXVXf39+KioqUlJPOzs5FREQzMzN0dHQAAAD////nMLzQAAAAFnRSTlP///////////////////////////8AAdLA5AAAEv5JREFUeNrsXYnanKgSFQMqMQJK+/6vetkpNrWXvzN3xsqXpF3AWg5FUYB2e4UEopgxxpHYb7rpB6grICe3HtCGa9BjHeOGML1VeNPbsOMJ5hzyeFEKxavrrcOb3oOd7BtU+DQRr3W3Em96A3a0b9M6Z+XAzfzW4k0vw67rD4nkBeOl5VbjTS/Cbu1PCGUlwaVbjTe9BrutP6XM303xCr71eNMrsFv7CzSlRcEAZLwVedPzsGMVkG1r13Wy69Y1eMK51c3+a7Io842I78FuyhGHSaH/eRIoc3fkIMPyPLFewZsZNG/VrMz00FR/0myuhfagD0hx06N+2hKPNfQH9x1dO5LgfQbdZdfTlHeaUzLYRh/FoBthzLD6y0w8RIgglgQZIoua7a3+aIFIIKEoHhEQ82v5r/V8XTY6UCSnq0hBlCL1h1KO3ocd1orCTrtglPLojTq27ZFYrgKaLrGqqMK2OfxZ9dXtFFqGi+E5CT7DoK0CAxR39adXYIcfgfp9fCTUJbhlB4hvUAP4p7BDhxm6dwk9LvG8My91tH8psVLkAo85lBg3sUH0FLM5u+lGL7Fp+YzniqWxuMhzRSbUsNi3Bzb2EOcSfIZB2zAS4Ka+NkGNSHiwbtR2F7OB72qcX1KLuYpE5tasD2KGI8NVF7i0JNPe6HonC1H3+dyveMTO24j52KpBYctoyr0LC7VFBO3rOqCU5mDahdWWOeL6AJHFN/0aRX9BQW057A7bDboGu7cZtLWuif9Cz8BudaqbaJSUAxXKBgu5Ux5gcy9EBDHQeAw70n80RjuiJssnRttzUOR9obvel1rTjdE00H4YBmEasDK3GLq0bfbAyAnslPNXJYZlmpZFl7U1mBPToGoar0nwNoO29mCfMQFhgBBPNJ3AbnOCQdix+NN2vZR7N8a4bYnukYohQWLNFt5zOOnr2nKD4ibsQPKE7d+HnZaT14xGgAevwQ6ggzojMOm7J2bVJyXyd05tJPsOQpSwYzKqkDeKX5DgbQaLQ+O5xtgjWJhKF+0PBoSbQgVarsGue+QirtDfxqeLCLsexgqPQoaDTreDfez20+NmUYlafXxRGA0Drk9g17XHuPslq0p4BCrmLkQe82ifgvD5ggRvM2hVJ7OQWV4IA2QGu7kKO+GD5xmOSSLPcRAEbAg57MrxBGuPUTo4qT/+Ddh1LaO5CwTEdup3FXYnwex2OqJJmnqsGAdNbtC5eFewXJPgEwym3i2vUvlQtoaRQgj8e8asNz33dpEDBpxfDOwihKINJ9CtipqEbak7MKf/80uYarBjLaNt9v/cDmsJO5t5mI6t2m9wAtDlYyoDCjDO7GL4RDPOYYEzCT7AoHW3W6E32ortluaQYq4NKYxfdtDrB6ePB/BDIsSS0YbQm/U1d952d93enPz6h8BOBUIuulXxLmM1byd9cgXV3cVpH2Zv3SAIFqPKrtFyExSew+5tBq33EUe+5GxIUYxkRyJCE7apFe/zNuj38qdFG66RJ1ZPOTbdXTe2Iru5RYl6/vz6Y+mXeBF2yDFfGM3pahTD6Pgfh2GvebuAmjIR0V+xqkh7NHs7ScdhsFfN0mZnErzPYBlblu7uNG+32jFC8HYoSk1VJ81QcPv29rFMp6PEhpFBOwez1DPcNXfXifow9vevNsH74tk/L8JOuC6tajRu/P/mJNz0DaW3E6mzavRhksUUp1JykajLYLdmebEkhE9RcCgB+wSD9SFJ6ktOYecoeLtZ9yOcNZL7fTYVQ/2wNtgQxYGuBTQZSEJC0Ja762h1teafXxdhF2/8/SLsFneuZTSmPUYI63jF23WXrNqO2MWjArsksiFiGKZpWgbh8r2LPSIEjS5yO5DgbQZdUk2nWFX4J+uzWVfTxTC2y4h26Ri4mg4RiVQUwO58JirCjtUWax75uhbsXvV2e8Nownn1c9g9rjkTFRni8Ac6k60KO5atEjiYpTiR4G0GQ4Is64wToz43S7FudqJ721z4OrGInZjUlqjoZQWU0j8dZCIxdNn6ZG0Gu5O10O7Xt2G3lkYjMWI6hh2PVp2kTAWX+Dx0InmzzJcC+Ck9MNDc/JRsL84leJdBW9FWrjFgcP7sDHZp3i5pOBMGsycrTWfK+o7E7neNsxS8XI3wxMInWZkena7D7vf7sHPjvdxoYHx4DLs+WhXVI/a+Mk0TE0191uXa4yHzRUdinUjwLoN6HmnTXX4xnDUpl/k52MG83W5HArHhxdlRFDtcx5iKBPW6KT/ThLDyzuPbsAPAFV+FncMRz4zWXYWdGoXR4ExwzZngVg+pm9qM9JSrh5boyxnwU9gdSzC+yWDq/7bDdVEX5mStt1vXbXMxY/D3nepCdcQaIlrZP8r2sFTn1ftmFFJdJdbhirdbvtrJsrrRNucKzmO7M4M0V1es5aoidefaPwu7Ewk+wqC/ifq1WFs21qyki9eD2M7EEdyOzsljk2iuJtoI3x548JGFDgd7m9p2fxRpkXG+tAisEqvCjteGFN+H3VAYzRvqE7A7Jw8tqYK19SXYtSX4CIPZ6oMksDocR+ootRzJElO+z0JKXF8hdLxkUgOXFeuwTtLF6K+PZN2Ar2Y09izskOo7XCM0AzU4N61f26IqpNu2bksLdktlvd0p7E4k+AiDWXq4nFE+Gmsbr8NpD2I7/XtI1/HXKQ/fluY02PAE7GK6WFx1d59NF9sAg6dGW+OyrmdgR6pJI6T3EPiZDpv3pGaZIeintvoKlGuwO5HgIwwepksu+UlHLm/HwQIVu4DabxvY0k5yvbJmklVX6R/ALs7Jyv1ivrgOu1fTxd5Kma+gXpBnYGenBnUalwhBvNDYpifcoeeBlMvMX4XdiQQfYTBfjFBYlGpfGVGKOZiBsIPUxNt5KE4HKCG10KAdKL0GuzT2m383KRnJBlregl2fG43ZyekXYMfzYcIK9JzNIcjPwa4twUcYzE3Y5dHUAz4u2RtSn6XoioC/yzNxww/CTn7xHTp12JmpvNxoizn5CuxYDpettOojj/Lfg92xBB9hkGbLKKesA6TZMYbH1bxdvv+z3IIjfhB25IvvMhEHEUlrJ8L7sAMR/mOPCcGuWGPXgN3VHVFneyneYrDPw/ts4emWR/r5wq5idbHMxOoL4/wk7PYvvqrup2HHm1btog58yJ7EXl+C3csMimIqKnV/Y8HkCh5V9XZbZYvQY/8a7GT7rU6fpqOdYyHd+WlvR9xJr4MxXyBShd1wcXLgggSfYLDS0ZebQbrG5JpfQ5Z4uyFdnjBWdic+CbvhKdiNILEs/iGwS/fPYgi7YID1bEjh1mIyN2ALOhgGOwMEQ+oD2IlaGuEZCT7A4FKpMsntVlJscRuvR0qyunhL9/lulS39Tw4pyFOwS16oKD7fr8L5kmIOhe1+C5/dE8+ZTSj5/Xxmyw6Pyzwd7FbGJJzxS/ITdme78L1GEqlLvRFVb0hV0b4ECQQIu9Vuf/EMnKbIjiVAn2DQLkri7oUB0jyuB80GV2BJw3Xni6x/W+wGCpouu8E5QtSASHS1yS1S2/6KbYpGJMs80dqeHDOt7gc3aJ9OrJxd73WcA1YXM3h5SzIYTrHZAg+ddcV7WGwZ87SztqBIHM+eroQyDHT1Bdv1ZGx9w+DbDJ6tFaguKg9v8rFtyq1mdTPIJn7svApFUYHM1p8cw25oy4+bsEveM7b9dIBX9RVgzzJcMaiczdr3w26mnbVb5vZ9IbYADqya9q/Fd9ec/8GJzBiDlYgy7VA6PWEVcpYYMrC1X4R0RQL0EQbNG0lIvmjcJ2ioR27a4t1a5NFeHfR/6pDr/5H+xzoc4UVIDI/0KcVOERJNxa1QZRL8NeXrrzCyUWj+guxOCY1l16l/NGGmeg4mi5f5jMs0mz/D/d2Um54hC7vxyss8y5cn3l+nuOkd2O3DBdQVWT18v0X2prdgdwF3RRc735+muOlN2O3zybvaS2Rt9xcCbnoXdgefftLD2zIDze7vodz0Adjty3rd1e3LQfd7003XYacivJrH26oZ5PsjPDd9Cna7ThOmSRNe70HvwO6mT8JOjy4GxJjEnJPmq8e2b76e7Kb/BOzOSd7DiZu+D7vhTg/f9H3Y3XTTDbubbtiVNGqax3ke9R6rT1c+j7b+ufHVKjGcBAzkiWeVw6/xx1Q2H8pyuOhnGoZPctBW0avifwN20pN+JWwztzyeaorL4aBy2ahZnnxkGV/Pdhe34uZTj6WsSlKTijRl0bw0qqGmKHtBmQ0OCrmdrZ4XP4XdbL4c60kNTrn5lqyq1ZwX+s0/5iuKVH9OkXKu/7GPRpyTU9gRRJCi4cjIEp/Dt7ICVVVMqGS6/q/DDklKnhzJW26qklRUlt+Xwa5eDZVcLIKeIOKMBchBoSLLxwvip7BL15+gfN0ns1+I2rPz22zPrKdwuWLkc9jtrX5lkgfIP2v2b8COPt/WnZTiosoy7ABZDC/iQGAkyUvKrHBQwo69KH4KO/0dY0aMR1I0mzfGY6639uiv32p3LAPsVv01NMZW997Z7Xx7bQk7ijF1UQFSPye9aFs3L3W4jAxrjRCGqfGnSIwUm5d7DAiWALREDcea/W1KRciWB1WB+p1Ow7GpA6l7d0ScP4XMxzoQwZKYzwBHXi33SMxmwf3il93PNJXSSVKRMVMZlaPmxAg/elmE52WpKWSSNMGGU4hijWNhRRpVlaUygVEyDuyH17wQVgryhPhHsCuvLeCstCADe2lXu7pzO18KkMNu1JGHtO8B10vmdQBhA4lx1xdsDCjdZ+CkvUXo9juDEgnsHFOg5nBbLA9/xvot7OLxaG5iyi0x87w5uhjbsfk6LMs04ZWZMy4sQvq09m6D3pegy9jzs5OkJmOmMq5V4nq0WftKcx/1TaCqEAmitqgQyxqWGlhEPTQvC42Sc2BgF4SA4fQl8duxXXwFLgybqrDzCwPwE7BzjnT0lpu9XFwu/qe1rguFuVGFuWokHaXR8hhLjDXYxZpjxUaro31EqArUj+WeHS/GqsxVS6MVLfO+Dt/LJLyyYHhieKT29JhK6SSpyJgafTYC4FDEIo56tusKGbTtRa4Qy5oILS0pm9xZcsDkngiRdLIn4g8n3m7Tr7PV7/wLfSaqwg7vOlkxLi6ouwQ76Zu5lthFYsIwyq2ihgg720hxiISkE05LMiYlCtgtvuYp3LaA8vHn6DyYrp/J5HmjLbnoO6RMfbWFXajO6r3k1QLFVmRYs4E3lSOEXV3GoDK9EUupbMlgl7DdUojgGnljqhAZ0GQ4Q2nZBRil4MC0TCAEhN0F8Q+9XbmkpA67bJ3dtU42JNaUtogaABE9/CQJV26MZ7/i5/oM00xZCHLU36oc/iQKNYNBRiwftTWA+rX9wPPCJabrW5IH4oQdp/eSV693GlgbCaXMNP+IobqMSUt1wSmAHU/YbirEIm+GqnasUXN2KcqGO1GFAxuHRCEcS5fFP/J2aJ4WTWI5gZ15K73+uw7707GdgZ3v/NVPkcOOWiUQf3cQcTSNG5aowM7XLADscISd15YA9UPYMQ07EdGqzMxBd44TdpzeE15pqXdiOhxMaQN2LKu0UBmEHU3YripkcZLr7hGo2hWd1E+DIpSWRSBYq48DgRAQdmfio6eHFOgwtnN+8fkhBXGOfAxczWhJYTf4Tc2JSUADNSUqsBvSlMqMpirsJlC/1tcSj2fLgR1IqG4P5l+qsFsgr1W9j9DhBgwtVRmbsAPuuubtokKQFKCFD17VYXyrREJ7VnaCd7bGgcAjA9idi38MO1LMACGwEzHCjsczr8Futl2FwYi9hMxQC8DOnTdMp94ulKjBbrI1kxDR6YorsBth/VhmzzOKZUbLi8TwQVXYJWWr3s450Mzb1WWswU7G0uaO2Y4fk2qiQiY/epRB1UYh1PemzAxXk7KTV11suDnsBBACwu5M/CPYLUnM5gFIAey6kLeTIIFyNV3sXqMgrAQqgBhHYphT0djkfqoRpwjRizo1j8KG9Im3gyXi/KQXLtYcb6vCDtTvepBwPEnJqU6huAhnr8NuDmMAyCvQu3WbmjUFBOVZsAMOEc7mFRnnGuy0ULOLDCVexsX8DLArFKKYF8tCzAg+KgT0njIgH5QFRqnCDgrhpKDXxD/2duVbnzJv58atPAJxs+jDp7CLs6bGyGbSEMf5Q2yHEcZPc98obR7Pm4SHbBcoXMAOXAy/Ynn4M9aPZfq8feYm+cR2l+GqwY4D2EFeOdQ796yZwIka9q2UVpKajBWj26yezdtx83aQIcnbFQqhYD43qoGHyVgS8oB1S9RjOyCEk+Kq+H9xBcps/vgufBbCa3gUYem8vh6XNAgygEUOupzr/kGJciFErNnfFsvDn7F+H1T4Yzeksi2XJvlBfSusY5yqvLr/wL+KKy1buJg/M2HMqixdJDPY0urvBNhuKmQgUalOIUFFvtBUqD8aJeMgGC0IkUhxKv7fgd3/F0nn/cTFieKbXp6TvQmOTyQi3Kd171dZ/Qj9T4ABAD3vCNCVoKBwAAAAAElFTkSuQmCC" alt="Logo">
        </a>
    </div>
    <div class="search fl clearfloat index-header">
        <input class="fl searchinput" type="text" id="searchid" value="" style="color:#000"
               onfocus="this.placeholder=''" onblur="this.placeholder='search'" placeholder="search">
        <input class="searchbtn fr" type="submit" onclick="GlobalSearch()" value="">
    </div>
    <div class="user notlogin fr" id="con_box">
        <div class="ls-btn-box">
            <a id="login" href="javascript: void(0);">...</a><a id="sign" href="javascript: void(0);">...</a>
        </div>
    </div>
</div>
<div class="navbox index-navbox">
    <div class="nav">
        <ul class="zcenter" id="indexmenu_id"></ul>
    </div>
    <div class="submenubox">
        <div class="submenu clearfloat zcenter" id="indexchildmenu_id"></div>
    </div>
</div>
<script>
    var locationHref = "GlobalSearch.html";
    var locationurl = location.pathname;
    locationurl = locationurl.substring(locationurl.lastIndexOf("/"));
    var tmp = '';
    var _tmp = false;
    if (locationurl !== "/index.html" && locationurl !== "/GlobalSearch.html" && locationurl !== "/SearchResult.html" && locationurl !== '/UserCenter.html' && locationurl !== '/') {
        tmp = '../';
        _tmp = true;
        $('.logo-href').attr('href', '../index.html');
        // $('.com-logo').attr('src', '../images/logo.png');
        locationHref = "../GlobalSearch.html"
    }
    function GlobalSearch() {
        var content = $("#searchid").val();
        SetLocal("SearchContent", content);
        location.href = locationHref;
    }
    var $area_id = '';
    if (getUrl()[0].slice(0, 4) === '' || locationurl === '/index.html' || locationurl === '/') {
        $area_id = 'home'
    }
    if (locationurl === '/UserCenter.html' || locationurl === '/GlobalSearch.html') {
        $area_id = ''
    }
    if (getUrl()[0].slice(0, 4) === 'menu' && (getUrl()[0].substring(5)) !== '') {
        $area_id = getUrl()[0].substring(5);
    }
    // console.log($area_id);

    var iurl = LoadUrl() + "axis2/services/MyService/getMenuName";
    $.ajax({
        type: "POST",
        url: iurl,
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            // console.log(result);
            var html = '<li class="' + (($area_id !== 'home') ? '' : 'current') + '" id="home"><a href="' + tmp + 'index.html' + '">首页</a></li>';
            var html1 = "";
            var main = 0;
            for (var i = 0; i < result.length; i++) {
                var ss = parseInt(result[i].id);
                if (!isNaN(ss)) {
                    html += '<li class="' + (($area_id !== 'home' && $area_id !== '' && main === $area_id * 1) ? 'current' : '') + '" id="' + main + '"><a href="' + ((_tmp && result[i].menu !== '子平台') ? '../' : '') + result[i].url + ((result[i].menu === '子平台') ? '' : ('?menu=' + main)) + '">' + result[i].menu + '</a></li>';
                    html1 += '<dl class="' + ((main % 2 === 0) ? 'odd' : '') + '" rel="' + main + '">';
                    for (var j = 0; j < result.length; j++) {
                        if (parseInt(result[j].parentId) === ss) {
                            html1 += '<dt><a href="' + ((_tmp && result[j].parentId !== 9) ? '../' : '') + result[j].url + ((result[j].parentId === 9) ? '' : ('?menu=' + main)) + '">' + result[j].menu + '</a></dt>';
                        }
                    }
                    html1 += '</dl>';
                    main++
                }
            }
            $("#indexmenu_id").html(html);
            $("#indexchildmenu_id").append(html1);

            $("#indexmenu_id li").css("width", 1200 / (main + 1));
            $(".submenu dl").css("width", 1200 / (main + 1));
            $(".submenu dl:first-child").css("margin-left", 1200 / (main + 1));

            // 导航栏子菜单伸缩事件
            var $navBox = $('.navbox'),
                $indexMenu = $navBox.find('#indexmenu_id'),
                $indexMenu_pro = document.getElementById('indexmenu_id'),
                $indexChildMenu = $navBox.find('#indexchildmenu_id'),
                $li_id = '',
                $dl_rel = '',
                time = 200;

            $indexMenu.on('mouseenter', 'li', function () {
                $li_id = $(this).attr('id');
                if ($li_id !== 'home') {
                    $indexChildMenu.show().stop().animate({
                        'height': '210px'
                    }, time);
                    $navBox.stop().animate({
                        'height': '266px'
                    }, time)
                } else {
                    $indexChildMenu.stop().animate({
                        'height': '1px'
                    }, time, function () {
                        $indexChildMenu.hide()
                    });
                    $navBox.stop().animate({
                        'height': '56px'
                    }, time);
                }

                $(this).attr('class', 'current');
                $(this).siblings().attr('class', '');
                if ($li_id !== 'home') {
                    if (document.getElementsByTagName('dl')[$li_id * 1].innerHTML !== '') {
                        var old_class = document.getElementsByTagName('dl')[$li_id * 1].className;
                        document.getElementsByTagName('dl')[$li_id * 1].setAttribute('class', 'active ' + old_class)
                    }
                }
            });

            $navBox.mouseleave(function () {
                $indexChildMenu.stop().animate({
                    'height': '1px'
                }, time, function () {
                    $indexChildMenu.hide()
                });
                $navBox.stop().animate({
                    'height': '56px'
                }, time);
                $indexMenu.find('li').attr('class', '');
                if ($area_id !== '') {
                    document.getElementById($area_id).setAttribute('class', 'current')
                }
            });

            $indexMenu.on('mouseleave', 'li', function () {
                if ($li_id !== 'home') {
                    if ($li_id % 2 === 0) {
                        document.getElementsByTagName('dl')[$li_id * 1].setAttribute('class', 'odd')
                    } else {
                        document.getElementsByTagName('dl')[$li_id * 1].setAttribute('class', '')
                    }
                }
            });

            $indexChildMenu.on('mouseenter', 'dl', function () {
                $dl_rel = $(this).attr('rel');
                if (document.getElementsByTagName('dl')[$dl_rel * 1].innerHTML !== '') {
                    $(this).addClass('active')
                }
                $indexMenu_pro.getElementsByTagName('li')[$dl_rel * 1 + 1].setAttribute('class', 'current')
            });

            $indexChildMenu.on('mouseleave', 'dl', function () {
                $dl_rel = $(this).attr('rel');
                if ($dl_rel % 2 === 0) {
                    document.getElementsByTagName('dl')[$dl_rel * 1].setAttribute('class', 'odd')
                } else {
                    document.getElementsByTagName('dl')[$dl_rel * 1].setAttribute('class', '')
                }
                $indexMenu_pro.getElementsByTagName('li')[$dl_rel * 1 + 1].setAttribute('class', '')
            });
        }
    });
</script>