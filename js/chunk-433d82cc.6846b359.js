(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-433d82cc"],{"07ac":function(t,s,a){var e=a("23e7"),r=a("6f53").values;e({target:"Object",stat:!0},{values:function(t){return r(t)}})},"6f53":function(t,s,a){var e=a("83ab"),r=a("df75"),i=a("fc6a"),c=a("d1e7").f,n=function(t){return function(s){var a,n=i(s),o=r(n),d=o.length,l=0,u=[];while(d>l)a=o[l++],e&&!c.call(n,a)||u.push(t?[a,n[a]]:n[a]);return u}};t.exports={entries:n(!0),values:n(!1)}},8694:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"my-5 container"},[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),a("ul",{staticClass:"step list-unstyled d-flex text-center"},[t._m(0),t._m(1),a("li",{staticClass:"step-item flex-grow-1 py-4 active",class:{finish:t.order.is_paid}},[a("h4",[t._v("STEP/3")]),t.order.is_paid?a("p",{staticClass:"mb-0"},[t._v("付款完成")]):a("p",{staticClass:"mb-0"},[t._v("成立訂單")])])]),a("div",{staticClass:"order-list"},[a("h4",{staticClass:"text-highlight"},[t._v("購買資訊")]),a("table",{staticClass:"table checkout-cart-table mt-3"},[a("thead",{staticClass:"checkout-cart-thead"},[a("th",{staticClass:"w-30"}),a("th",{staticClass:"w-30"},[t._v("品名")]),a("th",[t._v("數量")]),0===t.discount?a("th",[t._v("總價")]):t._e(),a("th",{attrs:{else:""}},[t._v("折扣後總價")])]),a("tbody",{staticClass:"checkout-cart-tbody"},t._l(t.products,(function(s){return a("tr",{key:s.id},[a("td",{staticClass:"align-middle"},[a("div",{staticClass:"cart-img",style:{backgroundImage:"url("+s.product.imageUrl+")"}})]),a("td",{staticClass:"align-middle text-break"},[t._v(" "+t._s(s.product.title)+" ")]),a("td",{staticClass:"align-middle"},[t._v(" "+t._s(s.qty)+"/"+t._s(s.product.unit)+" ")]),a("td",{staticClass:"align-middle text-right"},[t._v(" "+t._s(t._f("currency")(s.final_total))+" ")])])})),0)]),0===t.discount?a("div",{staticClass:"text-right h5 text-highlight"},[t._v(" 總計: "+t._s(t._f("currency")(Math.floor(t.order.total)))+" ")]):a("div",{staticClass:"text-right h5 text-highlight"},[t._v(" 折扣後總計: "+t._s(t._f("currency")(Math.floor(t.order.total)))+" ")]),a("h4",{staticClass:"text-highlight"},[t._v("訂購者資訊")]),a("table",{staticClass:"table mt-3"},[t._m(2),a("tbody",[a("tr",[a("th",[t._v("Email")]),a("td",{staticClass:"text-break"},[t._v(t._s(t.order.user.email))])]),a("tr",[a("th",[t._v("姓名")]),a("td",[t._v(t._s(t.order.user.name))])]),a("tr",[a("th",{staticClass:"text-nowrap"},[t._v("收件人電話")]),a("td",[t._v(t._s(t.order.user.tel))])]),a("tr",[a("th",{staticClass:"text-nowrap"},[t._v("收件人地址")]),a("td",[t._v(t._s(t.order.user.address))])]),a("tr",[a("th",[t._v("付款狀態")]),a("td",[t.order.is_paid?a("span",{staticClass:"text-success"},[t._v("付款完成")]):a("span",{staticClass:"text-danger"},[t._v("尚未付款")])])])])]),a("div",{staticClass:"text-right"},[t.order.is_paid?a("router-link",{staticClass:"btn btn-primary",attrs:{to:"/products"}},[t._v("繼續購物")]):a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.payOrder}},[t._v(" 確認付款去 ")])],1)])],1)},r=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",{staticClass:"step-item flex-grow-1 py-4 d-md-none"},[a("h4",[t._v("STEP/1")]),a("p",{staticClass:"mb-0"},[t._v("購物清單")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("li",{staticClass:"step-item flex-grow-1 py-4 d-md-none"},[a("h4",[t._v("STEP/2")]),a("p",{staticClass:"mb-0"},[t._v("填寫訂購資料")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("thead",{staticClass:"bg-primary"},[a("th",{staticClass:"text-white",attrs:{colspan:"2"}},[t._v("訂單資料")])])}],i=(a("99af"),a("07ac"),a("159b"),{data:function(){return{order:{user:{}},orderId:"",isLoading:!1,products:[],paidClass:"finish",unpaidClass:"active"}},methods:{getOrder:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("neil0907","/order/").concat(t.orderId);t.isLoading=!0,t.$http.get(s).then((function(s){s.data.success&&(t.order=s.data.order,t.products=Object.values(t.order.products)),t.isLoading=!1}))},payOrder:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("neil0907","/pay/").concat(t.orderId);t.isLoading=!0,t.$http.post(s).then((function(s){s.data.success&&(t.getOrder(),t.isLoading=!1,t.$bus.$emit("message:push","結帳成功","success"))}))}},computed:{discount:function(){var t=this,s=0;return t.products.forEach((function(t){s+=t.total-t.final_total})),s}},created:function(){this.orderId=this.$route.params.orderId,this.getOrder()}}),c=i,n=a("2877"),o=Object(n["a"])(c,e,r,!1,null,null,null);s["default"]=o.exports},"99af":function(t,s,a){"use strict";var e=a("23e7"),r=a("d039"),i=a("e8b5"),c=a("861d"),n=a("7b0b"),o=a("50c4"),d=a("8418"),l=a("65f0"),u=a("1dde"),h=a("b622"),v=a("2d00"),_=h("isConcatSpreadable"),p=9007199254740991,f="Maximum allowed index exceeded",g=v>=51||!r((function(){var t=[];return t[_]=!1,t.concat()[0]!==t})),m=u("concat"),C=function(t){if(!c(t))return!1;var s=t[_];return void 0!==s?!!s:i(t)},b=!g||!m;e({target:"Array",proto:!0,forced:b},{concat:function(t){var s,a,e,r,i,c=n(this),u=l(c,0),h=0;for(s=-1,e=arguments.length;s<e;s++)if(i=-1===s?c:arguments[s],C(i)){if(r=o(i.length),h+r>p)throw TypeError(f);for(a=0;a<r;a++,h++)a in i&&d(u,h,i[a])}else{if(h>=p)throw TypeError(f);d(u,h++,i)}return u.length=h,u}})}}]);
//# sourceMappingURL=chunk-433d82cc.6846b359.js.map